

import React from "react";
import idlogo from "../assets/idlogo.png";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useState } from "react";
import { db } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const Feedback = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(1);
  const [comments, setComments] = useState("");

  const sendFeedback = async (e) => {
    e.preventDefault();

    if (!name || !email || !rating) {
      alert("Please fill in all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const collRef = collection(db, "userFeedback");
    await addDoc(collRef, {
      name: name,
      email : email,
      rating: rating,
      comments: comments,
      timeStamp: serverTimestamp(),
    });
    alert("Your Feedback has been Submitted.");
    setName("");
    setEmail("");
    setRating(1);
    setComments("");
  };

  return (
    <div className="h-screen pb-10 bg-black w-full h-full px-10">
      <Header />

      <div className="w-max-2xl flex flex-col items-center border border-t-gray-100 border-b-gray-100 p-2 m-10">
        <div>
          <img src={idlogo} alt="" className="w-44 object-contain" />
        </div>
        <h1 className="font-bold text-lg font-inter mt-2 text-white">
          Your Feedback is Valuable to Us!
        </h1>
      </div>

      <form className="mt-10 flex flex-col w-full items-center font-inter">
        <div className="flex gap-10">
          <div className="flex flex-col w-80">
            <label className="font-inter font-bold text-lg text-white">
              Name<span className="text-red-600"> *</span>:
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name..."
              className="border h-14 rounded-sm p-4"
              required
            />
          </div>

          <div className="flex flex-col w-80">
          <label className="font-inter font-bold text-lg text-white">
              Email<span className="text-red-600"> *</span>:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email..."
              className="border h-14 rounded-sm p-4"
              pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
              required
            />
          </div>

        </div>
        <div className="flex flex-col w-80 mt-8">
        <label className="font-inter font-bold text-lg text-white">
            Rate your Experience out of 10<span className="text-red-600"> *</span>:
          </label>
          <input
            type="number"
            max={10}
            min={1}
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            placeholder="0"
            className="border h-14 rounded-sm p-4"
            required
          />
        </div>
        <div className="flex flex-col w-96 mt-8 scale-x-2">
          <label className="font-inter font-bold text-lg text-white">
            Comments/Suggestion:
          </label>
          <textarea
            type="text"
            rows={6}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Tell us how we can improve our service..."
            className="border h-14 rounded-sm p-4"
          />
        </div>

        <div className="flex gap-4 mt-5">
          {" "}
          {/* Common container with gap between buttons */}
          <button
            className="text-white px-6 border border-teal-700 py-2 rounded-lg font-inter text-md"
            type="submit"
            onClick={sendFeedback}
          >
            Submit Feedback
          </button>
          <Link to={"/"}>
            <button className="text-white px-6 py-2 bg-teal-700 rounded-lg font-inter text-md">
              Return to Home
            </button>
          </Link>
          
        </div>
      </form>
    </div>
  );
};

export default Feedback;
