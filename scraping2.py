import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
import time

def scrape_pdfs_from_page(url, download_folder="pdfs2", visited=None):
    if visited is None:
        visited = set()

    if url in visited:
        return
    visited.add(url)

    # Set up Selenium with headless Chrome
    chrome_options = Options()
    chrome_options.add_argument("--headless")  # Run in headless mode
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")

    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
    
    try:
        driver.get(url)
        
        # Wait for the page to load completely
        time.sleep(3)  # Adjust the sleep time as needed

        page_source = driver.page_source
    finally:
        driver.quit()

    soup = BeautifulSoup(page_source, "html.parser")

    if not os.path.exists(download_folder):
        os.makedirs(download_folder)

    for link in soup.find_all('a', href=True):
        href = link['href']
        
        # Make sure the link is absolute
        absolute_link = urljoin(url, href)

        if href.lower().endswith(".pdf"):
            download_pdf(absolute_link, download_folder)

        elif is_valid_url(absolute_link, url):
            scrape_pdfs_from_page(absolute_link, download_folder, visited)

def download_pdf(pdf_url, folder):
    pdf_name = os.path.basename(urlparse(pdf_url).path)
    pdf_path = os.path.join(folder, pdf_name)

    if os.path.exists(pdf_path):
        print(f"PDF already downloaded: {pdf_name}")
        return

    try:
        response = requests.get(pdf_url, stream=True)
        response.raise_for_status()

        with open(pdf_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                if chunk:
                    f.write(chunk)
        
        print(f"Downloaded: {pdf_name}")
    except requests.exceptions.RequestException as e:
        print(f"Failed to download {pdf_url}: {e}")

def is_valid_url(link, base_url):
    base_domain = urlparse(base_url).netloc
    link_domain = urlparse(link).netloc

    # Check if the link starts with the base URL path "https://www.iso-ne.com/participate"
    base_path = "https://www.iso-ne.com/participate"

    return link_domain == base_domain and link.startswith(base_path)

if __name__ == "__main__":
    # Specify the webpage URL
    url = "https://www.iso-ne.com/participate/rules-procedures"

    scrape_pdfs_from_page(url)
