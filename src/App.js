import "./App.css";
import { useReactToPrint } from "react-to-print";
import html2canvas from "html2canvas";
import jsPdf from "jspdf";
import React, { useRef } from "react";

function App() {
  const printPDF = () => {
    const domElement = document.getElementById("raj");
    html2canvas(domElement, {
      onclone: (document) => {
        document.getElementById("print").style.visibility = "hidden";
      },
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPdf();
      pdf.addImage(imgData, "JPEG", 10, 10);
      pdf.save(`${new Date().toISOString()}.pdf`);
    });
  };

  // window.onclick = (e) => {
  //   console.log(e.target); // to get the element
  //   console.log(e.target.id); // to get the element tag name alone
  // };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div id="raj">
      <h1>Generate PDF</h1>
      <p>Create a screenshot from the page, and put it in a PDF file.</p>
      <p style={{ color: "red" }}>
        *Open this page in new window and press the button.
      </p>
      <button id="print" onClick={printPDF}>
        PRINT
      </button>
      <div id="raj">
        <h2>Ambalika</h2>
      </div>
      <button onClick={handlePrint}>Print this out!</button>

      <div ref={componentRef}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus
        praesentium sequi est dicta, voluptas laborum temporibus ea
        reprehenderit quae, amet sapiente at, minima quis. Architecto minus
        laboriosam ex quasi saepe!
      </div>
    </div>
  );
}

export default App;
