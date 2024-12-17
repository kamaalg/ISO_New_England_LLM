import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse, urlunparse
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from collections import deque
import time
from PyPDF2 import PdfReader, PdfWriter

def scrape_pdfs_from_page_bfs(start_url, download_folder="scraped_pdfs", max_depth=3, visited=None):
    """
    Scrapes PDF files from a web page using a breadth-first search (BFS) approach.

    Args:
        start_url (str): The starting URL to begin scraping from.
        download_folder (str, optional): The folder where downloaded PDFs will be saved. Defaults to "scraped_pdfs".
        max_depth (int, optional): The maximum depth to traverse while scraping. Defaults to 3.
        visited (set, optional): A set of visited URLs to avoid reprocessing. Defaults to None.

    Returns:
        None
    """
    # Initialize the set of visited URLs if not provided
    if visited is None:
        visited = set()

    # Use a deque for BFS queue, starting with the initial URL and depth 0
    queue = deque([(start_url, 0)])

    # Ensure the download folder exists
    if not os.path.exists(download_folder):
        os.makedirs(download_folder)

    # Set up ChromeDriver in headless mode (no browser window)
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")

    # Initialize the ChromeDriver
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)

    # Perform BFS to scrape PDFs
    while queue:
        url, depth = queue.popleft()

        # Normalize the URL to avoid duplicates
        normalized_url = normalize_url(url)

        # Skip already visited URLs or those exceeding the max depth
        if normalized_url in visited or depth > max_depth:
            continue

        # Mark the URL as visited
        visited.add(normalized_url)

        try:
            # Load the page using Selenium
            driver.get(url)
            time.sleep(3)  # Wait for the page to load fully
            soup = BeautifulSoup(driver.page_source, "html.parser")  # Parse the page source
        except Exception as e:
            print(f"Error accessing {url}: {e}")
            continue

        # Find all anchor tags with href attributes
        for link in soup.find_all('a', href=True):
            href = link['href']
            absolute_link = urljoin(url, href)  # Convert relative links to absolute
            normalized_link = normalize_url(absolute_link)

            if href.lower().endswith(".pdf"):  # Check if the link is a PDF
                download_pdf(absolute_link, download_folder)
            elif is_valid_url(absolute_link, start_url) and normalized_link not in visited:
                # If the link is valid and not visited, add it to the queue with increased depth
                queue.append((absolute_link, depth + 1))

    # Quit the Selenium driver after processing
    driver.quit()

def download_pdf(pdf_url, folder):
    """
    Downloads a PDF from the given URL and saves it to the specified folder.

    Args:
        pdf_url (str): The URL of the PDF to download.
        folder (str): The folder where the PDF should be saved.

    Returns:
        None

    Notes:
        If the PDF already exists in the specified folder, it will not be downloaded again.
        After downloading, metadata containing the original URL is added to the PDF.
    """
    # Extract the PDF name from the URL
    pdf_name = os.path.basename(urlparse(pdf_url).path)
    pdf_path = os.path.join(folder, pdf_name)

    # Skip downloading if the PDF already exists
    if os.path.exists(pdf_path):
        return

    try:
        # Send a GET request to fetch the PDF
        response = requests.get(pdf_url, stream=True)
        response.raise_for_status()  # Raise an exception for HTTP errors

        # Save the PDF file in chunks to handle large files
        with open(pdf_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)

        print(f"Downloaded: {pdf_name}")

        # Add metadata to the downloaded PDF
        add_metadata_to_pdf(pdf_path, pdf_url)

    except requests.exceptions.RequestException as e:
        print(f"Failed to download {pdf_url}: {e}")

def add_metadata_to_pdf(pdf_path, pdf_url):
    """
    Adds custom metadata to a PDF file.

    Args:
        pdf_path (str): The file path to the PDF file to which metadata will be added.
        pdf_url (str): The URL to be added as metadata to the PDF file.

    Returns:
        None
    """
    reader = PdfReader(pdf_path)  # Read the existing PDF

    # Create a PdfWriter object to modify the PDF
    writer = PdfWriter()

    # Copy all pages from the original PDF to the writer
    for page in reader.pages:
        writer.add_page(page)

    # Add custom metadata (URL in this case)
    custom_metadata = {
        '/URL': pdf_url
    }
    writer.add_metadata(custom_metadata)

    # Overwrite the original file with updated metadata
    with open(pdf_path, 'wb') as file:
        writer.write(file)

def normalize_url(url):
    """
    Normalize a given URL by removing query parameters and fragments.

    Args:
        url (str): The URL to be normalized.

    Returns:
        str: The normalized URL with only the scheme, netloc, and path components.
    """
    parsed_url = urlparse(url)
    return urlunparse((parsed_url.scheme, parsed_url.netloc, parsed_url.path, '', '', ''))

def is_valid_url(link, base_url):
    """
    Checks if a given URL is valid based on the base URL and a specific path.

    Args:
        link (str): The URL to be validated.
        base_url (str): The base URL to compare against.

    Returns:
        bool: True if the link is valid, False otherwise.
    """
    base_domain = urlparse(base_url).netloc  # Extract the base domain
    base_path = "https://www.iso-ne.com/participate"  # Define the valid base path
    return urlparse(link).netloc == base_domain and link.startswith(base_path)

if __name__ == "__main__":
    # Starting point for the scraper
    url = "https://www.iso-ne.com/participate/rules-procedures"
    visited_urls = set()  # Initialize the set of visited URLs
    scrape_pdfs_from_page_bfs(url, visited=visited_urls)  # Start scraping