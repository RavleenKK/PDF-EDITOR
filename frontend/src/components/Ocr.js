import React, { useState } from "react";
import { saveAs } from "file-saver";
import ongclogo from "../ongclogo.png";
import Header from "../shared/header";
import Footer from "../shared/Footer";

const OCRpdf = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [extractedText, setExtractedText] = useState("");
  const [isFileUploaded, setisFileUploaded] = useState(null);
  const [showSelectFile, setshowSelectFile] = useState(null);

  const handleFileSelect = (event) => {
    setSelectedFiles([...event.target.files]);
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("image", file);
    });

    fetch("/api_ocr", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.blob())
      .then((blob) => {
        // Save the blob as a file using file-saver
        saveAs(blob, "extracted_text.pdf");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <>
      <Header />

      <div className="singlecontainer">
        <h1 className="heading">OCR</h1>
        <h3 className="subheading">
          Convert non-selectable PDF files into selectable and searchable PDF
          with high accuracy.
        </h3>
        <div className="mergepdf">
          <form onSubmit={handleFormSubmit}>
            <div>
              <input
                type="file"
                name="file"
                id="file"
                onChange={handleFileSelect}
                onInput={() => {
                  setisFileUploaded(true);
                  setshowSelectFile(true);
                }}
              />
              {showSelectFile && (
                <div>
                  <h4>Selected Files:</h4>
                  <div className="box">
                    {selectedFiles.map((file, index) => (
                      <div key={index}>{file.name}</div>
                    ))}
                  </div>
                </div>
              )}
              {showSelectFile ? (
                ""
              ) : (
                <label
                  htmlFor="file"
                  className="btn"
                  type="button"
                  id="my-button"
                  value="Select Files"
                >
                  Select File
                </label>
              )}
            </div>

            {isFileUploaded ? (
              <button className="btn" type="submit">
                Extract Texts
              </button>
            ) : (
              ""
            )}
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};
export default OCRpdf;
