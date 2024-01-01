import { useNavigate } from "react-router-dom";
import useAuth from "../../Utility/Hooks/UseAuth/useAuth";
import useAxios from "../../Utility/Hooks/UseAxios/useAxios";
import toast from "react-hot-toast";
import { FaFacebook } from "react-icons/fa";

const FacebookSIgnIn = () => {
    const { signWithFacebook } = useAuth();
    const navigate = useNavigate();
    const axios = useAxios()
  const handleGoogleLogin = () => {
    signWithFacebook()
      .then((res) => {
        const userInfo = {
          email: res.user.email,
          name: res.user.displayName,
          photo: res.user.photoURL,
          method:'facebook',
          creationDate: new Date().toDateString(),
        };
        console.log(userInfo);
        axios
          .post(`/users`, userInfo)
          .then((res) => console.log(res.data));
        navigate(location.state ? location.state : "/");
        toast.success("Sign In SuccessFully");
        navigate(location.state ? location.state : "/");
        console.log(res.user);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <button
        onClick={handleGoogleLogin}
        className="btn z-50 rounded-full border-dashed bg-gray-100 hover:border-main border-main hover:bg-transparent w-full bg-transparent font-semibold mb-3"
      >
        <FaFacebook className="text-blue-500"></FaFacebook>
        Sign IN With Facebook
      </button>
    </div>
  );
};

export default FacebookSIgnIn;
