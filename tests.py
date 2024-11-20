import openai
import pandas as pd
import giskard
from azure.storage.blob import BlobServiceClient
from io import BytesIO

# Azure and GPT-3.5 Configuration
openai.api_type = "azure"
openai.api_base = "https://<your-resource-name>.openai.azure.com/"
openai.api_version = "2023-03-15-preview"
openai.api_key = "<your-api-key>"

def gpt_response(prompt):
    """Function to get response from GPT-3.5 via Azure OpenAI API."""
    response = openai.Completion.create(
        engine="gpt-35-turbo",
        prompt = prompt,
        max_tokens=150
    )
    return response.choices[0].text.strip()

# Load Test Data from Azure Blob Storage
blob_service_client = BlobServiceClient.from_connection_string("<your-connection-string>")
container_client = blob_service_client.get_container_client("<your-container-name>")

blob_client = container_client.get_blob_client("test_data.pdf")
pdf_data = blob_client.download_blob().readall() # OR already text data

# IF NECESSARY: Convert PDF to DataFrame (may need to use PyMuPDF, pdfplumber, or similar library)
test_data = []
# Example
# import fitz  

# def extract_text_from_pdf(data):
#     """Extract text data from PDF for testing prompts."""
#     pdf_stream = BytesIO(data)
#     doc = fitz.open("pdf", pdf_stream)
#     text_data = []
#     for page_num in range(doc.page_count):
#         page = doc.load_page(page_num)
#         text_data.append(page.get_text())
#     return text_data

# # Create prompts by assuming each page of PDF data is a separate prompt
# text_data = extract_text_from_pdf(pdf_data)
# test_data = pd.DataFrame({'prompt': text_data, 'expected_response': ["Expected response"] * len(text_data)})

# Initialize Giskard with the Model and Data
model = giskard.Model(gpt_response, model_type="text-generation", name="GPT-3.5 Azure Model")
data = giskard.Dataset(test_data, name="Azure GPT-3.5 Test Data")

# Run Tests
suite = giskard.test_suite(model, data)
suite.run()

print("Tests executed.")
