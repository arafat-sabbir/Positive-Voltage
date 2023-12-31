import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Container from "../../Utility/Container/Container";
import { useContext, useState } from "react";
import { Context } from "../../Auth/AuthProvider/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";

const SignIn = () => {
  const { signWithGoogle } = useContext(Context);
  const navigate = useNavigate();
  const [showp, setShowp] = useState(true);
  console.log(showp);
  const handleGoogleLogin = () => {
    signWithGoogle()
      .then((res) => {
        const userInfo = {
          email: res.user.email,
          name: res.user.displayName,
          photo: res.user.photoURL,
          type: "others",
          creationDate: new Date().toDateString(),
        };
        navigate("/");
        axios.post(`/createUser`, userInfo).then((res) => {
          console.log(res);
        });
      })
      // handle Error and show to the user
      .catch((error) => {
        toast.error(error);
      });
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    // const toastid = toast.loading("Sign In Processing");
    // signInUser(data.email, data.password)
    //   .then((res) => {
    //     toast.success("Sign In SuccessFull", { id: toastid });
    //     navigate(location.state ? location.state : "/");
    //     console.log(res);
    //   })
    //   .catch((error) => {
    //   if(error.message){
    //     toast.error("Invalid Email And Password",{id:toastid})
    //   }
    //   });
    console.log(data);
  };
  return (
    <Container>
      <div className="flex container mx-auto h-full  !justify-center !items-center">
        <Helmet>
          <title>Positive Voltage || Sign In</title>
        </Helmet>
        <div className="lg:w-1/2 w-[90vw]">
          <div className="card  lg:w-3/4  mx-auto shadow-[0_0_35px_#ECECEC] backdrop-blur-sm p-10 my-10">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex">
                    Email <span className="text-red-500 text-2xl">*</span>
                  </span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  className="input input-bordered bg- focus:outline-none hover:bg- focus:border-dashed focus:border-main"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="text-red-500 mt-4">Please Type An Email</p>
                )}
              </div>
              <div className="form-control relative">
                <label className="label">
                  <span className="label-text font-semibold flex">
                    Password <span className="text-red-500 text-2xl">*</span>
                  </span>
                </label>

                <input
                  type={showp ? "password" : "text"}
                  name="password"
                  placeholder="password"
                  className="input input-bordered focus:outline-none relative focus:border-dashed focus:border-main"
                  {...register("password", {
                    required: true,
                  })}
                />
                <button
                  onClick={() => setShowp(!showp)}
                  type="button"
                  className="absolute top-[45%] right-2 text-xl"
                >
                  {showp ? <IoEyeOutline></IoEyeOutline> : <FaRegEyeSlash />}
                </button>
                <label className="label">
                  <a
                    href="#"
                    className="label-text-alt mt-2 hover:link underline-main"
                  >
                    Forgot password?
                  </a>
                </label>
                <div>
                  {errors.password?.type === "required" && (
                    <p className="text-red-500 mt-3" role="alert">
                      Please Type Your Password
                    </p>
                  )}
                </div>
              </div>
              <div className="form-control mt-4">
                <input
                  className="btn bg-transparent hover:bg-transparent focus:border-dashed focus:border-main border border-gray-200"
                  type="submit"
                  value="Sign In"
                />
              </div>
              <p className="font-medium my-4 text-center">
                Do not have a account.?
                <Link className=" font-bold text-main ml-1" to={"/signUp"}>
                  SignUp
                </Link>
              </p>
            </form>
            <div className="w-3/4 mx-auto">
              <div className="divider -mt-4"></div>
              <button
                onClick={handleGoogleLogin}
                className="btn z-50 rounded-full focus:border-dashed border-2 border-gray-200 focus:border-main hover:bg-transparent w-full bg-transparent font-semibold mb-3"
              >
                <FcGoogle></FcGoogle>
                Sign IN With Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SignIn;