import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Container from "../../Utility/Container/Container";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import GoogleSignIn from "../../Auth/GoogleSignIn/GoogleSignIn";
import useAuth from "../../Utility/Hooks/UseAuth/useAuth";
import toast from "react-hot-toast";
import FacebookSIgnIn from "../../Auth/FacebookSignIn/FacebookSIgnIn";

const SignIn = () => {
  // Toggle show/hide password
  const [showp, setShowp] = useState(true);
  // get SignIn function from UseAuth
  const {signInUser}=useAuth()
  // Navigate to Desired page
  const navigate  = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const toastid = toast.loading("Sign In Processing");
    signInUser(data.email, data.password)
      .then((res) => {
        toast.success("Sign In SuccessFull", { id: toastid });
        navigate(location.state ? location.state : "/");
        console.log(res);
      })
      .catch((error) => {
      if(error.message){
        toast.error("Invalid Email And Password",{id:toastid})
      }
      });
    console.log(data);
  };
  return (
    <Container>
      <div className="flex container mx-auto h-full  !justify-center !items-center">
        <Helmet>
          <title>Positive Voltage | Sign In</title>
        </Helmet>
        <div className="lg:w-1/2 w-[100vw]">
          <div className="card  lg:w-3/4  mx-auto lg:shadow-[0_0_35px_#ECECEC] backdrop-blur-sm lg:p-10 pb-6 lg:my-10">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text  font-medium flex">
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
                  <span className="label-text font-medium flex">
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
              <GoogleSignIn></GoogleSignIn>
              <FacebookSIgnIn></FacebookSIgnIn>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SignIn;
