import { Link } from "react-router-dom";
import welcome from "../assets/welcome.png";
const Welcome = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-[black]">
      <div className="flex flex-col justify-center items-center mx-20">
        <img
          src={welcome}
          alt=""
          style={{ width: "80%", objectFit: "contain" }}
        />
        <div>
          <Link to={"/signup"}>
            <button className="text-white px-10 bg-teal-700 py-2 rounded-lg font-inter">
             Click Here to Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
