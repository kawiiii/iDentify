import React, { useRef } from "react";
import upload from "../assets/upload.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";

const Dashboard = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [responseImg, setResponseImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLarge3, setIsLarge3] = useState(false); 
 

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // Do something with the selected file
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
    setSelectedFile(file);
  };

  const sendRequest = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      
      const response = await fetch(import.meta.env.VITE_REACT_APP_API_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      // Assuming the response contains the annotated image
      const blob = await response.blob();
      const imgUrl = URL.createObjectURL(blob);
      console.log(imgUrl);
      setResponseImg(imgUrl);

      // Do something with the imgUrl, like displaying it in an image element
      // document.getElementById("annotated-image").src = imgUrl;
    } catch (error) {
      console.error("Error uploading file:", error);
    }
    setLoading(false);
  };

  // image zoom

  const toggleSize3 = () => {
    setIsLarge3(!isLarge3);
  };

  const imageRef = useRef(null);
  const exportToPDF = () => {
    if (responseImg) {
      const img = new Image();
      img.crossOrigin = "anonymous"; // To avoid "tainted canvas" security errors

      img.onload = () => {
        const pdf = new jsPDF("landscape");

        // Calculate width and height for full-page image
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (img.height * pdfWidth) / img.width;

        // Add image to PDF document
        pdf.addImage(img, "JPEG", 0, 0, pdfWidth, pdfHeight);
        
        // Save PDF file
        pdf.save("download.pdf");
      };
      img.src = responseImg;
    }
  };

  return (
    <div style={{ width: "100%" }} className="flex pt-6">
     
      <div
        style={{ width: "80%" }}
        className="bg-black px-4 pt-2 m-auto h-screen"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-white font-inter text-2xl ">
            Welcome
          </h2>
          <Link to={"/"}>
          
            <button className="text-white px-4 mt-2 bg-teal-700 py-1 rounded-lg font-inter cursor-pointer">
              Home
            </button>
          </Link>
        </div>

        <div className="w-full h-56 border border-teal-600 rounded-md mt-4 flex flex-col justify-center items-center">
          {selectedFile && imagePreview ? (
            <>
              <img
                src={imagePreview}
                alt="image"
                className="w-80 object-contain"
              />
              <div className="flex gap-2">
                <button
                  className="text-white px-4 py-2 mt-2 border border-teal-700 bg-teal-700 rounded-lg font-inter text-sm"
                  onClick={() => {
                    setSelectedFile(null);
                    setResponseImg(null);
                    setImagePreview(null);
                  }}
                >
                  Clear
                </button>
                <button
                  onClick={sendRequest}
                  className="text-white px-4 py-2 mt-2 border border-teal-700 rounded-lg font-inter text-sm"
                >
                  Submit
                </button>
              </div>
            </>
          ) : (
            <>
              <img src={upload} alt="" className="w-16" />

              <input
                type="file"
                style={{ display: "none" }}
                id="file-input"
                onChange={handleFileChange}
                accept="image/*"
              />
              {/* Label for the input element */}
              <label
                className="text-white px-4 mt-2 bg-teal-700 py-1 rounded-lg font-inter cursor-pointer"
                htmlFor="file-input"
              >
                Upload Image
              </label>
         
            </>
          )}
        </div>
        <div ref={imageRef}>
          <h1
            className="text-white  mt-4 mb-1 font-inter"
            style={{ width: "100%" }}
          >
            DMFT Analysis
          </h1>
          <div className="w-full h-72 border border-teal-600 rounded-md flex justify-center gap-4 items-center">
            {responseImg ? (
              <div className="flex flex-col justify-center items-center">
                <img
                 
                  style={{
                    // width: "80%",
                    // height: "70%",
                    objectFit: "cover",
                    width: isLarge3 ? "90vw" : "70%",
                    position: isLarge3 ? "absolute" : "static",
                    top: isLarge3 ? "10%" : "auto",
                    height: isLarge3 ? "90vh" : "200px",
                    transition: "width 0.5s",
                  }}
                  onClick={toggleSize3}
                  className="cursor-pointer"
                  src={responseImg}
                  alt=""
                />
                <h5 className="pt-2 text-gray-600 font-normal">
                Click the Image for Closeup
                </h5>
                <button
                  onClick={exportToPDF}
                  className="text-white px-4 mt-2 border border-teal-700 py-1 rounded-lg font-inter text-sm"
                >
                  Export to PDF
                </button>
              </div>
            ) : loading ? (
              <h5 className="text-white font-bold">Analysing...</h5>
            ) : (
              <h5 className="text-white font-bold">
                Upload an Image for Analysis
              </h5>
            )}
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default Dashboard;
