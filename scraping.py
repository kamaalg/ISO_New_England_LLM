import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse

def scrape_pdfs_from_page(url, download_folder="pdfs", visited=None):
    if visited is None:
        visited = set()


    if url in visited:
        return
    visited.add(url)


    response = requests.get(url)


    if response.status_code != 200:
        print(f"Failed to retrieve the page: {url}")
        return
    

    soup = BeautifulSoup(response.content, "html.parser")
    

    if not os.path.exists(download_folder):
        os.makedirs(download_folder)
    

    for link in soup.find_all('a', href=True):
        href = link['href']
        
        # Make sure the link is absolute
        absolute_link = urljoin(url, href)


        if href.endswith(".pdf"):
            download_pdf(absolute_link, download_folder)
        

        elif is_valid_url(absolute_link, url):
            scrape_pdfs_from_page(absolute_link, download_folder, visited)

def download_pdf(pdf_url, folder):

    pdf_name = os.path.basename(urlparse(pdf_url).path)
    pdf_path = os.path.join(folder, pdf_name)
    

    if os.path.exists(pdf_path):
        print(f"PDF already downloaded: {pdf_name}")
        return


    response = requests.get(pdf_url)
    
    with open(pdf_path, 'wb') as f:
        f.write(response.content)
    
    print(f"Downloaded: {pdf_name}")

def is_valid_url(link, base_url):

    base_domain = urlparse(base_url).netloc
    link_domain = urlparse(link).netloc

    return link_domain == base_domain


if __name__ == "__main__":
    # Specify the webpage URL
    url = "https://example.com"  
    scrape_pdfs_from_page(url)
