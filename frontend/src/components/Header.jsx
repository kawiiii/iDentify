// import idlogo from "../assets/idlogo.png";
// import avatar from "../assets/avatar.png";
// import { Link } from "react-router-dom";

// const Header = () => {
 
//   return (
//     <div className="flex justify-between items-center py-4">
//       <div>
//         <img src={idlogo} alt="" className="w-44 object-contain" />
//       </div>
//       <div className="flex text-white justify-center items-center gap-4">
    
//         <Link to={"/dashboard"}>
//           <p className="cursor-pointer font-inter hover:text-teal-400">
//             Dashboard
//           </p>
//         </Link>
//         <Link to={'/feedback'}>
//         <p className="cursor-pointer font-inter hover:text-teal-400">Feedback</p>
//         </Link>

//       </div>
//     </div>
//   );
// };

// export default Header;
import idlogo from "../assets/idlogo.png";
import avatar from "../assets/avatar.png";
import { Link } from "react-router-dom";
import { logout, selectUser } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const Header = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    signOut(auth)
    .then(() => {
      dispatch(logout())
    })
  };
  return (
    <div className="flex justify-between items-center py-4">
      <div>
        <img src={idlogo} alt="" className="w-44 object-contain" />
      </div>
      <div className="flex text-white justify-center items-center gap-4">
        <p
          onClick={handleLogout}
          className="cursor-pointer font-inter hover:text-teal-400"
        >
          Logout
        </p>
        <Link to={"/dashboard"}>
          <p className="cursor-pointer font-inter hover:text-teal-400">
            Dashboard
          </p>
        </Link>
        <Link to={'/feedback'}>
        <p className="cursor-pointer font-inter hover:text-teal-400">Feedback</p>
        </Link>
        <div className="flex justify-center items-center p-1 border border-gray-100 rounded-md">
          <img src={avatar} alt="" className="m-1 max-w-10 object-contain" />
          <p className="hidden md:block font-bold text-slate-300 font-inter">
            {user.displayName}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
