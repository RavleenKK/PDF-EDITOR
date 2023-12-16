import compress from "../images/compress.png";
import merge from "../images/merge.png";
import split from "../images/split.png";
import ocr from "../images/ocr.png";
import ongclogo from "../ongclogo.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Header from "../shared/header";
import Footer from "../shared/Footer";
// import MergePDF from "./components/Merge";
// import CompressPDF from "./components/Compress";
// import SplitPDF from "./components/Split";
// import OCRpdf from "./components/Ocr";

const Home = () => {
  const navigate = useNavigate();

  const handleMergePdfClick = () => {
    navigate("/merge");
  };

  const handleOCRPdfClick = () => {
    navigate("/ocr");
  };

  const handlesplitPdfClick = () => {
    navigate("/split");
  };

  const handlecompressPdfClick = () => {
    navigate("/compress");
  };
  return (
    <>
      <Header />
      <section className="container">
        <h1 className="heading">Pdf Editor</h1>
        <h3 className="subheading">
          important tools you need to work with PDF in one place
        </h3>
        <div className="box-container">
          <div className="box">
            <div className="MERGEPDF">
              <div className="overlap">
                <div className="group">
                  <div className="overlap-group">
                    <img
                      className="element-removebg-preview"
                      alt="Element removebg preview"
                      src={merge}
                    />

                    <h1 className="MERGE-PDF" onClick={handleMergePdfClick}>
                      MERGE PDF
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="box">
            <div className="OCR">
              <div className="group-wrapper">
                <div className="overlap-group-wrapper">
                  <div className="overlap-group-2">
                    <img
                      className="img"
                      alt="Element removebg preview"
                      src={ocr}
                    />
                    <h1 className="COMPRESS-PDF" onClick={handleOCRPdfClick}>
                      OCR PDF
                    </h1>
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="box">
            <div className="COMPRESS">
              <div className="div-wrapper">
                <div className="group-2">
                  <div className="overlap-group-3">
                    <img
                      className="element-removebg-preview-2"
                      alt="Element removebg preview"
                      src={compress}
                    />
                    <h1
                      className="COMPRESS-PDF"
                      onClick={handlecompressPdfClick}
                    >
                      COMPRESS PDF
                      <br />
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="box">
            <div className="SPLIT">
              <div className="overlap-2">
                <div className="group-3">
                  <div className="overlap-group-4">
                    <img
                      className="element-removebg-preview-3"
                      alt="Element removebg preview"
                      src={split}
                    />
                    <h1 className="COMPRESS-PDF" onClick={handlesplitPdfClick}>
                      SPLIT PDF
                    </h1>
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
