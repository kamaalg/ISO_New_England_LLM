from PyPDF2 import PdfReader

# Define file path
input_path = './scraped_pdfs/EXAMPLE.pdf'

# Open the PDF and read it
reader = PdfReader(input_path)
info = reader.metadata

# Print the original metadata
print("Original Metadata:")
for key, value in info.items():
    print(f"{key}: {value}")