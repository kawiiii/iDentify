import React, { useRef } from "react";
import upload from "../assets/upload.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import Modal from 'react-modal';

const Dashboard = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [labels, setLabels] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [responseImg, setResponseImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLarge3, setIsLarge3] = useState(false); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [description, setDescription] = useState([]);
  
  const description_obj = {"Caries": "Commonly known as cavities or tooth decay, caries are caused by the demineralization of tooth enamel due to bacterial acids. This results in holes or cavities in the teeth, which can lead to pain and infection if left untreated.",
  
"Deep Caries": "This is an advanced stage of tooth decay where the carious lesion has progressed beyond the enamel and dentin, reaching closer to the tooth's pulp. Deep caries can cause significant discomfort, and if not treated, it may lead to more severe complications such as pulpitis.",

"Impacted": "An impacted tooth is one that does not fully emerge into its proper position in the mouth. This typically occurs with wisdom teeth or other teeth and can cause pain, swelling, and alignment issues if not managed properly.",

"Periapical Lesion": "This term refers to an abnormal area of tissue around the apex (tip) of a tooth root, often resulting from an infection or inflammation. Periapical lesions are typically associated with conditions such as periapical abscesses or granulomas and can cause pain and swelling."}
  
  const toggleModal = () => setIsModalOpen(!isModalOpen);


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
      
      // Parse the JSON response
			const responseData = await response.json();

			// Extract the base64 image and labels from the response
			const { image, labels } = responseData;

			// Create an image URL from the base64-encoded image
			const imgUrl = `data:image/jpeg;base64,${image}`;
      setResponseImg(imgUrl);
      setLabels(labels);
      console.log("labels;", labels)
      const uniqueLabels = [...new Set(labels)];
      
      const result = [];
      uniqueLabels.forEach(str => {
				if (description_obj[str]) {
					result.push({
						label: str,
						description: description_obj[str]
					});
				}
			});
			
			setDescription(result)      
      
      document.getElementById("annotated-image").src = imgUrl;
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

        // Add image to the first page
				pdf.addImage(img, "JPEG", 0, 0, pdfWidth, pdfHeight);

				// Start a new page for the text content
				pdf.addPage();

				// Define text settings
				const textSize = 14; // Font size
				const textMargin = 10; // Margin from the top
				const lineHeight = textSize * 1.1; // Line height (spacing between lines)
				let currentYPosition = textMargin;

				// Set font size and text color
				pdf.setFontSize(textSize);
				pdf.setTextColor(0, 0, 0);

				// Iterate over data to add each label and description
				description.forEach(item => {
					// Check if the text fits on the current page
					const margin = 10; // Margin for text from the edge
					const textWidth = pdfWidth - 2 * margin; // Text width considering margins
					const descriptionLines = pdf.splitTextToSize(item.description, textWidth); // Split text to fit within the width

					// Add label
					if (currentYPosition + lineHeight > pdf.internal.pageSize.height) {
						pdf.addPage();
						currentYPosition = textMargin; // Reset position to top margin on new page
					}
					pdf.text(item.label, margin, currentYPosition);
					currentYPosition += lineHeight;

					// Add description with wrapping
					descriptionLines.forEach(line => {
						if (currentYPosition + lineHeight > pdf.internal.pageSize.height) {
						  pdf.addPage();
						  currentYPosition = textMargin; // Reset position to top margin on new page
						}
						pdf.text(line, margin, currentYPosition);
						currentYPosition += lineHeight;
					});

					// Add a space between items
					if (currentYPosition + lineHeight > pdf.internal.pageSize.height) {
						pdf.addPage();
						currentYPosition = textMargin; // Reset position to top margin on new page
					}
					currentYPosition += textMargin; // Space between different items
				});


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
        className="bg-black px-4 pt-2 pb-10 m-auto min-h-screen"
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

        <div className="w-full h-56 border border-teal-600 rounded-md mt-4 flex flex-col justify-center items-center overflow-hidden">
				{selectedFile && imagePreview ? (
					<>
						<img
						  src={imagePreview}
						  alt="image"
						  className="w-80 h-full max-h-40 object-contain"
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
                <div className="flex-row space-x-3">
                <button
                  onClick={exportToPDF}
                  className="text-white px-4 mt-2 border border-teal-700 py-1 rounded-lg font-inter text-sm"
                >
                  Export to PDF
                </button>
                <button
								onClick={toggleModal}
								className="text-white px-4 mt-2 border border-teal-700 py-1 rounded-lg font-inter text-sm"
							>
								Description
							</button>
							
							</div>
							<Modal
  isOpen={isModalOpen}
  onRequestClose={toggleModal}
  ariaHideApp={false}
  contentLabel="Description Modal"
  className="fixed inset-0 flex items-center justify-center p-4"
  overlayClassName="fixed inset-0 bg-black bg-opacity-40" // Dimming effect
>
  <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg max-h-[80vh] overflow-y-auto">
    {description.map((item, index) => (
      <div key={index} className="mb-4">
        <h2 className="text-xl font-bold mb-2">{item.label}</h2>
        <p className="text-gray-700">{item.description}</p>
      </div>
    ))}
    <button
      onClick={toggleModal}
      className="text-white px-4 py-2 mt-4 border border-teal-700 bg-teal-700 rounded-lg font-inter text-sm"
    >
      Close
    </button>
  </div>
</Modal>
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
