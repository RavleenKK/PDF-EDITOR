
from flask import Flask, request, send_file, make_response, jsonify
from PyPDF2 import PdfReader, PdfWriter, PdfMerger, PdfFileWriter # Correct import name
from flask_cors import CORS
import io
import pytesseract
from PIL import Image
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files (x86)\Tesseract-OCR\tesseract.exe"

app = Flask(__name__)
CORS(app)  # Enable CORS for the entire app

# merge
@app.route('/api_merge', methods=['POST'])
def api_merge():
    pdf_files = request.files.getlist('files')  # Assuming the file input field has the name 'files'

    # Code to merge the PDF files using PyPDF2
    merger = PdfMerger()
    for pdf_file in pdf_files:
        merger.append(pdf_file)

    # Save the merged PDF as 'merged.pdf'
    merged_pdf_path = 'merged.pdf'
    merger.write(merged_pdf_path)

    # Create a response object
    response = make_response(send_file(merged_pdf_path, as_attachment=True))

    # Set the Content-Type header to indicate the PDF content type
    response.headers['Content-Type'] = 'application/pdf'

    return response

# api_compress
@app.route('/api_compress', methods=['POST'])
def api_compress():
    def api_compress():
    # Check if the 'pdf' file is present in the request
        if 'pdf' not in request.files:
            return "No PDF file provided in the request", 400

    file = request.files['pdf']
    file_content = file.read()

    # Create a PdfReader instance using the file content.
    pdf_reader = PdfReader(io.BytesIO(file_content))

    # Create a new PDF writer for compressed content.
    pdf_writer = PdfWriter()

    # Reduce file size by compressing the content streams of each page.
    for page in pdf_reader.pages:
        page.compress_content_streams()

    # Add the compressed pages to the PDF writer.
    for page in pdf_reader.pages:
        pdf_writer.add_page(page)

    # Save the compressed PDF to a BytesIO object.
    temp_file = io.BytesIO()
    pdf_writer.write(temp_file)
    temp_file.seek(0)

    # Create a response with the compressed PDF as a downloadable attachment
    response = make_response(temp_file.read())
    response.headers['Content-Type'] = 'application/pdf'
    response.headers['Content-Disposition'] = 'attachment; filename=compressed.pdf'

    return response

# api_ocr

@app.route('/api_ocr', methods=['POST'])
def api_ocr():
    try:
        # Get the uploaded image files
        files = request.files.getlist('image')  # Adjust the name based on your HTML file

        # Perform OCR on each image and extract text
        extracted_text = []
        for file in files:
            # Convert the file to an image
            image = Image.open(file)
            text = pytesseract.image_to_string(image)
            extracted_text.append(text)

        # Combine extracted text into a single string
        combined_text = '\n\n'.join(extracted_text)

        # Create a PDF containing the extracted text
        pdf_buffer = io.BytesIO()
        c = canvas.Canvas(pdf_buffer, pagesize=letter)
        c.setFont('Helvetica', 20)  # Adjust font size as needed

        text_lines = combined_text.split('\n')
        y_offset = 750  # Adjust the starting y-axis position
        line_height = 14  # Adjust line height

        for line in text_lines:
            c.drawString(72, y_offset, line)  # Adjust the positioning as needed
            y_offset -= line_height

        c.save()

        # Prepare response with the PDF file for download
        pdf_buffer.seek(0)
        response = make_response(pdf_buffer.read())
        response.headers['Content-Disposition'] = 'attachment; filename=extracted_text.pdf'
        response.mimetype = 'application/octet-stream'  # Use 'application/octet-stream' for binary file download

        return response

    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)})

if __name__ == '__main__':
    app.run(debug=True)

# api_split
@app.route('/api_split', methods=['POST'])
def api_split():
    # Your splitting code
    pdf_file = request.files.get('file')

    if pdf_file is None or pdf_file.filename == '':
        return "No PDF file uploaded.", 400

    start_page = int(request.form.get('start_page'))
    end_page = int(request.form.get('end_page'))

    if start_page <= 0 or end_page <= 0 or start_page > end_page:
        return "Invalid page range.", 400

    # Read the PDF file
    pdf_reader = PdfReader(pdf_file)

    if end_page > len(pdf_reader.pages):
        return "End page exceeds the number of pages in the PDF.", 400

    # Create a new PDF writer
    pdf_writer = PdfWriter()

    # Split the PDF pages based on the specified range
    for page_number in range(start_page - 1, end_page):
        pdf_writer.add_page(pdf_reader.pages[page_number])

    # Save the split PDF as 'split.pdf'
    split_pdf_path = 'split.pdf'
    with open(split_pdf_path, 'wb') as output_pdf:
        pdf_writer.write(output_pdf)

    # Create a response object
    response = make_response(send_file(split_pdf_path, as_attachment=True))

    # Set the Content-Type header to indicate the PDF content type
    response.headers['Content-Type'] = 'application/pdf'

    return response

if __name__ == '__main__':
    app.run(debug=True)


