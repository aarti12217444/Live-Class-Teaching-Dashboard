import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { Document, Page, pdfjs } from "react-pdf";


import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc =
  `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;



function TeachingArea() {
  const canvasRef = useRef(null);

  const canvasInstance = useRef(null);

  const screenVideoRef = useRef(null);

  const [pdfFile, setPdfFile] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const [isSharing, setIsSharing] = useState(false);
  const [activeView, setActiveView] = useState("whiteboard");

  

  const [laserMode, setLaserMode] = useState(false);
  const [laserPosition, setLaserPosition] = useState(null);

useEffect(() => {
  if (canvasInstance.current) return;

  const canvas = new fabric.Canvas(canvasRef.current, {
    width: 1100,
    height: 650,
    backgroundColor: "#ffffff",
  });

  canvas.isDrawingMode = true;
  canvasInstance.current = canvas;

  return () => {
    if (canvas) {
      canvas.dispose();
    }
  };
}, []);

useEffect(() => {
  if (!laserPosition) return;

  const timer = setTimeout(() => {
    setLaserPosition(null);
  }, 300);

  return () => clearTimeout(timer);
}, [laserPosition]);

const clearBoard = () => {
  if (!canvasInstance.current) return;

  canvasInstance.current.clear();
  canvasInstance.current.backgroundColor = "#ffffff";
  canvasInstance.current.renderAll();
};

const addRectangle = () => {
  if (!canvasInstance.current) return;

  const rect = new fabric.Rect({
    left: 100,
    top: 100,
    fill: "lightblue",
    width: 300,
    height: 400,
    stroke: "black",
    strokeWidth: 2,
  });

  canvasInstance.current.add(rect);
};

const addCircle = () => {
  if (!canvasInstance.current) return;

  const circle = new fabric.Circle({
    radius: 50,
    fill: "lightgreen",
    stroke: "black",
    strokeWidth: 2,
    left: 200,
    top: 150,
  });

  canvasInstance.current.add(circle);
};

const addText = () => {
  if (!canvasInstance.current) return;

  const text = new fabric.IText("Type here", {
    left: 250,
    top: 200,
    fontSize: 24,
    fill: "black",
    editable: true,
  });

  canvasInstance.current.add(text);

  canvasInstance.current.setActiveObject(text);

  text.enterEditing();

  text.selectAll();

  canvasInstance.current.renderAll();
};

const enableEraser = () => {
  if (!canvasInstance.current) return;

  canvasInstance.current.isDrawingMode = true;
  canvasInstance.current.freeDrawingBrush.color = "#ffffff";
  canvasInstance.current.freeDrawingBrush.width = 20;

  setLaserMode(false);
};

const enablePen = () => {
  if (!canvasInstance.current) return;

  canvasInstance.current.isDrawingMode = true;
  canvasInstance.current.freeDrawingBrush.color = "black";
  canvasInstance.current.freeDrawingBrush.width = 3;

  setLaserMode(false);
};

const startScreenShare = async () => {
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
    });

    screenVideoRef.current.srcObject = stream;

    setIsSharing(true);

    stream.getVideoTracks()[0].onended = () => {
      setIsSharing(false);
    };
  } catch (error) {
    console.log(error);
  }
};

const handlePdfUpload = (event) => {
  const file = event.target.files[0];

  if (file && file.type === "application/pdf") {
    setPdfFile(file);
    setPageNumber(1);
  }
};

const onDocumentLoadSuccess = ({ numPages }) => {
  setNumPages(numPages);
};

const nextPage = () => {
  if (pageNumber < numPages) {
    setPageNumber(pageNumber + 1);
  }
};

const prevPage = () => {
  if (pageNumber > 1) {
    setPageNumber(pageNumber - 1);
  }
};




  return (
  <div className="bg-white rounded-2xl shadow-md p-5">

    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold text-slate-800">
        Teaching Area
      </h2>

      <span className="text-sm text-slate-500">
        Interactive Whiteboard
      </span>
    </div>

    {/* Toolbar */}
    <div className="flex flex-wrap gap-2 mb-4">

      <button
        onClick={clearBoard}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
      >
        Clear
      </button>

      <button
        onClick={addRectangle}
        className="bg-slate-700 hover:bg-slate-800 text-white px-4 py-2 rounded-lg"
      >
        Rectangle
      </button>

      <button
        onClick={addCircle}
        className="bg-slate-700 hover:bg-slate-800 text-white px-4 py-2 rounded-lg"
      >
        Circle
      </button>

      <button
        onClick={addText}
        className="bg-slate-700 hover:bg-slate-800 text-white px-4 py-2 rounded-lg"
      >
        Text
      </button>

      <button
        onClick={enablePen}
        className="bg-slate-700 hover:bg-slate-800 text-white px-4 py-2 rounded-lg"
      >
        Pen
      </button>

      <button
        onClick={enableEraser}
        className="bg-slate-700 hover:bg-slate-800 text-white px-4 py-2 rounded-lg"
      >
        Eraser
      </button>

      {/* <button
        onClick={startScreenShare}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
      >
        Share Screen
      </button> */}

      <button
        onClick={() => {
          setLaserMode(!laserMode);

          if (canvasInstance.current) {
            canvasInstance.current.isDrawingMode = false;
          }
        }}
        className={`px-4 py-2 rounded-lg text-white ${
          laserMode
            ? "bg-red-600"
            : "bg-slate-700 hover:bg-slate-800"
        }`}
      >
        {laserMode ? "Laser ON" : "Laser OFF"}
      </button>

    </div>

    {/* Tabs */}
    <div className="flex gap-2 mb-5 border-b pb-3">

      <button
        onClick={() => setActiveView("whiteboard")}
        className={`px-4 py-2 rounded-lg ${
          activeView === "whiteboard"
            ? "bg-blue-600 text-white"
            : "bg-slate-200"
        }`}
      >
        Whiteboard
      </button>

      <button
        onClick={() => setActiveView("screen")}
        className={`px-4 py-2 rounded-lg ${
          activeView === "screen"
            ? "bg-blue-600 text-white"
            : "bg-slate-200"
        }`}
      >
        Screen Share
      </button>

      <button
        onClick={() => setActiveView("pdf")}
        className={`px-4 py-2 rounded-lg ${
          activeView === "pdf"
            ? "bg-blue-600 text-white"
            : "bg-slate-200"
        }`}
      >
        PDF
      </button>

    </div>

    {/* WHITEBOARD */}
    {activeView === "whiteboard" && (
  <div
    className="relative w-full border rounded-xl overflow-hidden"
    onMouseMove={(e) => {
      if (!laserMode) return;

      const rect =
        e.currentTarget.getBoundingClientRect();

      setLaserPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }}
  >
    <canvas
      ref={canvasRef}
      className="w-full"
    />

    {laserMode && laserPosition && (
      <div
        className="absolute w-4 h-4 bg-red-500 rounded-full pointer-events-none shadow-[0_0_20px_red]"
        style={{
          left: laserPosition.x,
          top: laserPosition.y,
          transform: "translate(-50%, -50%)",
        }}
      />
    )}
  </div>
)}

    {/* SCREEN SHARE */}
    {activeView === "screen" && (
  <div>

    <button
      onClick={startScreenShare}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg mb-4"
    >
      Start Screen Share
    </button>

    {isSharing && (
      <video
        ref={screenVideoRef}
        autoPlay
        playsInline
        className="w-full h-[650px] object-contain rounded-xl border bg-black"
      />
    )}

  </div>
)}

    {/* PDF */}
    {activeView === "pdf" && (
      <div>

        <h3 className="font-semibold text-slate-800 mb-3">
          PDF Presentation
        </h3>

        <input
          type="file"
          accept=".pdf"
          onChange={handlePdfUpload}
          className="mb-4"
        />

        {pdfFile && (
          <>
            <div className="border rounded-xl p-3 overflow-auto">
              <Document
                file={pdfFile}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={(error) =>
                  console.log("PDF Error:", error)
                }
              >
                <Page
                  pageNumber={pageNumber}
                  width={900}
                />
              </Document>
            </div>

            <div className="flex items-center gap-4 mt-4">

              <button
                onClick={prevPage}
                className="bg-slate-700 text-white px-4 py-2 rounded-lg"
              >
                Previous
              </button>

              <span className="font-medium">
                {pageNumber} / {numPages}
              </span>

              <button
                onClick={nextPage}
                className="bg-slate-700 text-white px-4 py-2 rounded-lg"
              >
                Next
              </button>

            </div>
          </>
        )}

      </div>
    )}

  </div>
);
}

export default TeachingArea;