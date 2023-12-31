import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Container from "../../Utility/Container/Container";
import { useContext } from "react";
import { Context } from "../../Auth/AuthProvider/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const SignIn = () => {
  const { signWithGoogle } = useContext(Context);
  const navigate = useNavigate();
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
                  className="input input-bordered bg- focus:outline-none hover:bg- border-dashed border-main focus:border-main"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="text-red-500 mt-4">Please Type An Email</p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex">
                    Password <span className="text-red-500 text-2xl">*</span>
                  </span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered bg- focus:outline-none focus:placeholder:'' hover:bg- border-dashed border-main focus:border-main"
                  {...register("password", {
                    required: true,
                  })}
                />
                <div>
                  {errors.password?.type === "required" && (
                    <p className="text-red-500 mt-3" role="alert">
                      Please Type Your Password
                    </p>
                  )}
                </div>
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn bg-transparent hover:bg-transparent border-dashed border-main hover:border-main"
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
                className="btn z-50 rounded-full border-dashed bg- hover:border-main border-main hover:bg-transparent w-full bg-transparent font-semibold mb-3"
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
