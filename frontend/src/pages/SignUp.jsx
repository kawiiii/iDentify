import idlogo from "../assets/idlogo.png";
import authimg from "../assets/authimg.png";
import { Link } from "react-router-dom";
import { useState } from "react";
// import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { provider } from "../../firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { login } from "../features/userSlice";
import { signInWithPopup } from "firebase/auth";
const Signup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const register = (e) => {
    e.preventDefault();
    if (!name) {
      return alert("Please Enter a Full Name!");
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
          updateProfile(user.user, {
            displayName: name,
          }).then(() => {
            dispatch(
              login({
                email: user.user.email,
                uid: user.user.uid,
                displayName: name,
              })
            );
            navigate("/");
          });
        })
        .catch((err) => alert(err));
    }
  };
  const signupwithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((user) => {
        console.log(user);
        dispatch(
          login({
            email: user.user.email,
            uid: user.user.uid,
            displayName: user.user.displayName,
          })
        );
        navigate("/");
      })
      .catch((err) => alert(err.message));
  };
  return (
    <div className="flex h-screen w-full bg-black">
      <div
        style={{ width: "40%" }}
        className="m-1 flex flex-col items-center bg-slate-900 rounded-sm"
      >
        <div className="mt-16"></div> {/* Add more space upwards */}
        <img src={idlogo} alt="" className="w-44 object-contain mt-8" />
        <p className="text-white mt-8 ml-6 text-xl">
          {" "}
          {/* Increased text size */}
          Monitoring Dental Health with Deep Learning.
        </p>
        <img src={authimg} alt="" className="mt-10 w-96" />
      </div>

      <div
        style={{ width: "60%" }}
        className="h-screen flex flex-col justify-center mx-10"
      >
        <p className="text-white font-inter mb-6 font-bold">Create Account</p>
        <div className="flex gap-8">
          <button
            onClick={signupwithGoogle}
            className="text-slate-300 font-inter border border-red-500 px-4 py-1 rounded-md"
          >
            Sign Up With Google
          </button>
        </div>
        <p className="my-8 text-white font-inter font-extrabold text-lg">
          -OR-
        </p>
        <form onSubmit={register} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="pl-2 focus:outline-none text-white bg-black border-b-2 border-b-slate-400 font-inter"
          />
          <input
            type="email"
            value={email}
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
            className="pl-2 text-white bg-black focus:outline-none border-b-2 border-b-slate-400 font-inter"
          />
          <input
            type="password"
            value={password}
            placeholder="Your Password"
            onChange={(e) => setPassword(e.target.value)}
            className="pl-2 text-white bg-black border-b-2 focus:outline-none border-b-slate-400 font-inter"
          />

          <button
            type="submit"
            className="w-full text-white font-inter bg-teal-600 py-2 font-bold rounded-md"
          >
            Create Account
          </button>
        </form>
        <p className="text-white font-inter mt-2">
          Already have an Account?
          <Link to={"/signin"}>
            <span className="text-teal-600 font-inter cursor-pointer">
              {" "}
              Login
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
