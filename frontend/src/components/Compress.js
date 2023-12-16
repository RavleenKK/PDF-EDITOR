import React, { useState } from "react";
import Header from "../shared/header";
import Footer from "../shared/Footer";

const CompressPDF = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isFileUploaded, setisFileUploaded] = useState(null);
  const [showSelectFile, setshowSelectFile] = useState(null);

  const handleFileSelect = (event) => {
    setSelectedFiles([...event.target.files]);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("pdf", selectedFiles[0]);

    fetch("/api_compress", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.blob())
      .then((blob) => {
        // Create a download link and trigger the download
        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = "compressed_pdf.pdf";
        downloadLink.click();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <Header />

      <div className="singlecontainer">
        <h1 className="heading">Compress PDF Files</h1>
        <h3 className="subheading">
          Compress documents with a variety of custom options.
          <br />
          Remove, extract or organize PDF pages as you need.
        </h3>
        <div className="mergepdf">
          <form onSubmit={handleFormSubmit}>
            <input
              type="file"
              name="my_file"
              id="my-file"
              multiple
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
                htmlFor="my-file"
                className="btn"
                type="button"
                id="my-button"
                value="Select Files"
              >
                Select PDF Files
              </label>
            )}
            <div>
              {isFileUploaded ? (
                <button className="btn" type="submit">
                  Compress PDFs
                </button>
              ) : (
                <div></div>
              )}
            </div>
            <div id="pdfContainer"></div>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CompressPDF;
