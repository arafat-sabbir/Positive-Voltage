import {  useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import axios from "axios";
import useAuth from "../../Utility/Hooks/UseAuth/useAuth";

const GoogleSignIn = () => {
  const { signWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const handleGoogleLogin = () => {
    signWithGoogle()
      .then((res) => {
        const userInfo = {
            email:res.user.email,
            name:res.user.displayName,
            photo:res.user.photoURL,
            role:'user',
            creationDate:new Date().toDateString()
        }
        console.log(res.user.email,res.user.displayName);
        axios.post(`/users?email=${res.user.email}`,userInfo)
        .then(res=> console.log(res.data))
        navigate(location.state?location.state:'/')
        toast.success("Sign In SuccessFully")
        navigate(location.state ? location.state : "/");
        console.log(res.user);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
        <div className="divider -mt-4"></div>
      <button
        onClick={handleGoogleLogin}
        className="btn z-50 rounded-full border-dashed bg-gray-100 hover:border-main border-main hover:bg-transparent w-full bg-transparent font-semibold mb-3"
      >
        <FcGoogle></FcGoogle>
        Sign IN With Google
      </button>
    </div>
  );
};

export default GoogleSignIn;
