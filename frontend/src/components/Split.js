import React, { useState } from "react";
import ongclogo from "../ongclogo.png";
import Header from "../shared/header";
import Footer from "../shared/Footer";

const SplitPDF = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [startPage, setStartPage] = useState("");
  const [endPage, setEndPage] = useState("");
  const [splitPDFUrl, setsplitPDFUrl] = useState(null);
  const [isFileUploaded, setisFileUploaded] = useState(null);
  const [showSelectFile, setshowSelectFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!selectedFile) {
      alert("Please select a PDF file.");
      return;
    }

    if (startPage === "" || endPage === "") {
      alert("Please enter start and end page numbers.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("start_page", startPage);
    formData.append("end_page", endPage);

    fetch("/api_split", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.blob())
      .then((blob) => {
        //Create a download link and trigger the download
        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = "split.pdf";
        downloadLink.click();
        setsplitPDFUrl(downloadLink.href);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <Header />

      <div className="singlecontainer">
        <h1 className="heading">Split PDF Files</h1>
        <h3 className="subheading">
          Split documents with a variety of custom options.
          <br />
          Remove, extract or organize PDF pages as you need.
        </h3>
        <div className="mergepdf">
          <form onSubmit={handleFormSubmit}>
            <div>
              <input
                type="file"
                name="file"
                id="file"
                onChange={handleFileChange}
                onInput={() => {
                  setisFileUploaded(true);
                  setshowSelectFile(true);
                }}
              />
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
                  Select PDF Files
                </label>
              )}
            </div>
            <br />

            {isFileUploaded ? (
              <div>
                <div className="mergepdf">
                  <div className="input-group flex-nowrap justify-content-center">
                    <span className="input-group-text">from page :</span>

                    <input
                      type="number"
                      value={startPage}
                      onChange={(e) => setStartPage(e.target.value)}
                    />
                  </div>
                  <br />

                  <div className="input-group flex-nowrap justify-content-center">
                    <span className="input-group-text">to page :</span>

                    <input
                      type="number"
                      value={endPage}
                      onChange={(e) => setEndPage(e.target.value)}
                    />
                  </div>
                </div>
                <br />
                {/* Use the 'mergedPDFUrl' state to conditionally render the iframe */}
                {splitPDFUrl && (
                  <iframe
                    src={splitPDFUrl}
                    title="Merged PDF"
                    style={{ width: "50%", height: "500px", border: "none" }}
                  />
                )}
                <button type="submit" className="btn">
                  Split PDF
                </button>
              </div>
            ) : (
              <div></div>
            )}
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SplitPDF;
