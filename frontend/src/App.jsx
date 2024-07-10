// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Welcome from "./pages/Welcome";
// import Home from "./pages/Home";
// import Dashboard from "./pages/Dashboard";
// import Feedback from "./pages/Feedback";

// const App = () => {

//   return (
//     <BrowserRouter>
//       <div className="bg-black">
//         <Routes>
//           <Route path="/" element={<Welcome />} />
//           <Route path="/home" element={<Home />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/feedback" element={<Feedback />} />
          
//         </Routes>
//       </div>
//     </BrowserRouter>
//   );
// };

// export default App;
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { selectUser } from "./features/userSlice";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { login, logout } from "./features/userSlice";
import Feedback from "./pages/Feedback";
const App = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // logged in
        dispatch(
          login({
            email: user.email,
            uid: user.uid,
            displayName: user.displayName,
          })
        );
      } else {
        // user logged out
        dispatch(logout());
      }
    });
  
    return () => {
      // Cleanup function
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="bg-black">
        <Routes>
          <Route path="/" element={user ? <Home />  : <Welcome />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <SignIn />} />
          <Route path="/feedback" element={user ? <Feedback /> : <SignIn />} />
          
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
