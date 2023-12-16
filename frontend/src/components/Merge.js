import React, { useState } from "react";
import Header from "../shared/header";
import Footer from "../shared/Footer";

const MergePDF = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [mergedPDFUrl, setMergedPDFUrl] = useState(null);
  const [isFileUploaded, setisFileUploaded] = useState(null);
  const [showSelectFile, setshowSelectFile] = useState(null);

  const [File, setFile] = useState([]);

  const handleFileSelect = (event) => {
    setSelectedFiles([...event.target.files]);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    fetch("/api_merge", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.blob())
      .then((blob) => {
        // Create a download link and trigger the download
        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = "merged.pdf";
        downloadLink.click();
        setMergedPDFUrl(downloadLink.href);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <Header />
      <section className="singlecontainer">
        <h1 className="heading">Merge PDF Files</h1>
        <h3 className="subheading">
          Merge documents with a variety of custom options.
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
                  <br />
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
              <div id="pdfContainer">
                {/* Use the 'mergedPDFUrl' state to conditionally render the iframe */}
                {mergedPDFUrl && (
                  <iframe
                    src={mergedPDFUrl}
                    title="Merged PDF"
                    style={{ width: "50%", height: "500px", border: "none" }}
                  />
                )}
              </div>
              {isFileUploaded ? (
                <button className="btn" type="submit">
                  Merge PDFs
                </button>
              ) : (
                <div></div>
              )}
            </div>
            <div id="pdfContainer"></div>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default MergePDF;
