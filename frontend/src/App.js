import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MergePDF from "./components/Merge";
import CompressPDF from "./components/Compress";
import SplitPDF from "./components/Split";
import OCRpdf from "./components/Ocr";
import Home from "./components/Home";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/merge" element={<MergePDF />} />
          <Route path="/compress" element={<CompressPDF />} />
          <Route path="/ocr" element={<OCRpdf />} />
          <Route path="/split" element={<SplitPDF />} />
          <Route path="/*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
