import Header from "../components/Header";
import banner from "../assets/banner.png";
import doc_teeth from "../assets/doc_teeth.png";
import idlogo_vert from "../assets/idlogo_vert.png";
import nust from "../assets/nust.png";
import Tech from "../components/Tech";
import react from "../assets/react.png";
import pytorch from "../assets/pytorch.png";
import aws from "../assets/aws.png"
import aston from "../assets/aston.png";
import mission from "../assets/mission.png";
import vision from "../assets/vision.png";
import dentist from "../assets/dentist.png";
import secure from "../assets/secure.png";
import patient from "../assets/patient.png";
import twofour from "../assets/twofour.png";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { redirect } from "react-router-dom";
import Footer from "../components/Footer";

const Home = () => {
  const user = useSelector(selectUser);
  console.log(user);
  if (!user) {
    return redirect("/signin");
  }
  return (
    <div>
      <div className="bg-black w-full h-full px-10">
        <Header />
        <div className="w-full flex flex-col items-center mt-4">
          <img src={banner} alt="" className="mb-5" />
          <p className="font-inter text-teal-600 text-4xl w-full text-center font-extrabold my-4">
            Monitoring Dental Health with Deep Learning
          </p>
          <p className="text-white px-10 bg-teal-700 py-2 rounded-lg font-inter">
  Click on Dashboard for Demo
</p>
        </div>
        <div className="flex items-center rounded-lg bg-slate-800 mt-10">
          <div
            style={{ width: "15%" }}
            className="bg-slate-700 flex justify-center items-center py-2"
          >
            <img src={idlogo_vert} alt="" className="w-14" />
          </div>
          <div style={{ width: "60%" }} className="text-white px-4 py-4">
            <p className="font-inter text-lg">
              Welcome to <span className="text-teal-600">iDentify</span>
            </p>
            <p className="text-sm font-inter mt-2 text-justify">
            iDentify aims to revolutionize dental healthcare through deep learning technologies. The primary objective is to significantly improve diagnostic accuracy and efficiency in dental care by developing an end-to-end system for diagnosing the four most common dental conditions derived from panoramic X-ray images: Caries, Deep Caries teeth, Periapical lesions, and Impacted Teeth (DMFT). By focusing on the detailed analysis of panoramic X-rays, the project addresses critical challenges in dental healthcare, including misdiagnosis, variability in diagnostic standards, and the lack of efficient data-driven approaches. This initiative seeks to set new standards in dental diagnostics, ensuring more reliable assessments and enhancing patient outcomes through innovative technology.
            </p>
          </div>
          
          <div style={{ width: "20%" }} className="pr-4">
            <img src={doc_teeth} alt="" />
          </div>
        </div>
      </div>
      <div className="w-full px-10 gap-3 flex mt-8 py-6 bg-slate-900 justify-center">
        <Tech img={nust} />
        <Tech img={react} />
        <Tech img={pytorch} />
        <Tech img={aston} />
      </div>

      <div className="text-white flex px-10 my-10 gap-4 items-center justify-center">
        <div style={{ width: "50%" }}>
          <h2 className="mb-4 font-inter text-2xl font-bold border-b-2 border-b-teal-600 w-fit">
            Problem Statement
          </h2>
          <p className="text-slate-300 font-inter text-justify">
          Panoramic X-rays, which play a critical role in diagnosing oral conditions and treatment planning, otten present a time-consuming and distracting task for dentists. Misdiagnosis is a pervasive issue due to lack of specialized radiology training among dental protessionals. Moreover, the limited availability of annotated data further complicates the development of automated algorithms for analyzing panoramic X-rays. Research and development in effective Al algorithms for dental radiology hold the promise of enhancing treatment outcomes and patient satistaction.
          </p>
        </div>
        <div>
          <img src={mission} alt="" className="w-72 object-contain" />
        </div>
      </div>
      <div className="text-white flex px-10 my-10 gap-4 items-center justify-center">
        <div>
          <img src={vision} alt="" className="w-72 object-contain" />
        </div>

        <div style={{ width: "50%" }}>
  <h2 className="mb-4 font-inter text-2xl font-bold border-b-2 border-b-teal-600 w-fit">
    Objectives
  </h2>
  <ul className="text-slate-300 font-inter list-disc pl-4">
    <li>
      Implement an object detection model to accurately detect various types of dental anomalies, including caries, deep caries, impacted teeth, and periapical lesions.
    </li>
    <li>
      Design and develop a user-friendly web interface to interact with the system.
    </li>
    <li>
      Collaborate with healthcare professionals to ensure alignment with real-world dental practices.
    </li>
  </ul>
</div>


      </div>

<div className="flex justify-center items-center mt-8 mb-4">
  <h2 className="mb-4 font-inter text-white text-2xl font-bold border-b-2 border-b-teal-600 w-fit">
    Project Scope
  </h2>
</div>
<div className="flex justify-center space-x-12">
  <div className="w-52 h-52 border border-teal-600 rounded-md flex flex-col justify-center items-center">
    <img src={dentist} alt="Dentist" className="w-24" />
    <p className="text-white text-center font-inter mt-4">Dental Practitioners</p>
  </div>

  <div className="w-52 h-52 border border-teal-600 rounded-md flex flex-col justify-center items-center">
    <img src={secure} alt="Secure" className="w-20" />
    <p className="text-white text-center font-inter mt-4">Insurance Companies</p>
  </div>

  <div className="w-52 h-52 border border-teal-600 rounded-md flex flex-col justify-center items-center">
    <img src={patient} alt="Patient" className="w-24" />
    <p className="text-white text-center font-inter mt-4">Dental Patients</p>
  </div>
</div>

      <Footer />
    </div>
  );
};

export default Home;
