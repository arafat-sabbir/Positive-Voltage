import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import useAuth from "../../../Auth/UseAuth/useAuth";
import GoogleSignIn from "../../../Auth/SocialLogin/GoogleSignIn/googleSignIn";
import useAxiosSecure from "../../../Hooks/AxiosSecure/useAxiosSecure";
import { Helmet } from "react-helmet";
import { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const [photoName, setPhotoName] = useState("");
  const [photo, setPhoto] = useState("");
  const imageHostingKey = import.meta.env.VITE_IMAGE_HOST_KEY;
  const imageHostingAPi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;
  const formData = new FormData();
  formData.append("image", photo);
  const handlePhotoUpload = (e) => {
    e.preventDefault();
    setPhotoName(e.target.files[0].name);
    setPhoto(e.target.files[0]);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { signUpUser, updateUserProfile } = useAuth();
  const onSubmit = async (data) => {
    const toastid = toast.loading("Sign Up Processing");
    const hostedPhoto = await axios.post(imageHostingAPi, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    console.log(hostedPhoto.data.data.display_url);
    signUpUser(data.email, data.password)
      .then((res) => {
        console.log(res.user);
        updateUserProfile(data.name, hostedPhoto.data.data.display_url)
          .then(() => {
            const userdata = {
              email: data.email,
              name: data.name,
              photo: hostedPhoto.data.data.display_url,
              role: "user",
              creationDate: new Date().toDateString(),
            };
            axiosSecure.post("/users", userdata).then((res) => {
              if (res.data.insertedId) {
                toast.success("Sign Up SuccessFully", { id: toastid });
                reset();
                navigate(location.state ? location.state : "/");
              }
            });
          })
          .catch((error) => console.log(error));
        console.log(data);
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          toast.error("Email Already Registered", { id: toastid });
        }
      });
  };
  return (
    <div
      style={{
        backgroundImage:
          'url("https://i.ibb.co/M6G8CX1/7c9a76326c730978ec22e7193f67109f.png")',
      }}
    >
      <div className="flex h-screen gap-10 container mx-auto  justify-center items-center">
        <Helmet>
          <title>Echo Estate || Sign Up</title>
        </Helmet>
        <div className="lg:w-1/2 w-[90vw]">
          <div className="card  lg:w-3/4  mx-auto ">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="name"
                  placeholder="name"
                  name="name"
                  className="input input-bordered bg-gray-100 hover:bg-gray-100 border-dashed border-main focus:border-main"
                  required
                  {...register("name")}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  className="input input-bordered bg-gray-100 hover:bg-gray-100 border-dashed border-main focus:border-main"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="text-red-500 mt-4">Please Type An Email</p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo</span>
                </label>

                <div className="relative w-full">
                  <label className="label absolute -z-1 input pt-2 opacity-100  input-bordered bg-gray-100 hover:bg-gray-100 border-dashed border-main focus:border-main w-full ">
                    <span className="label-text ">
                      {photoName || "Choose Profile Picture"}
                    </span>
                  </label>
                  <input
                    onChange={handlePhotoUpload}
                    accept="images/*"
                    type="file"
                    placeholder="upload your Photo"
                    name="email"
                    className="input w-full pt-2 z-50 opacity-0 input-bordered bg-gray-100 hover:bg-gray-100 border-dashed border-main focus:border-main"
                  />
                </div>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered bg-gray-100 hover:bg-gray-100 border-dashed border-main focus:border-main"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /^(?=.*[A-Z])(?=.*[\W_]).{6,}$/,
                  })}
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
                <div>
                  {errors.password?.type === "minLength" && (
                    <p className="text-red-500" role="alert">
                      Password Should Atleast 6 Character
                    </p>
                  )}
                  {errors.password?.type === "required" && (
                    <p className="text-red-500" role="alert">
                      Password Is required
                    </p>
                  )}
                  {errors.password?.type === "pattern" && (
                    <p className="text-red-500" role="alert">
                      Password Should Contain atleast one Uppercase And One
                      Special Character
                    </p>
                  )}
                </div>
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn bg-gray-100 hover:bg-gray-100 border-dashed border-main hover:border-main"
                  type="submit"
                  value="Sign UP"
                />
              </div>
              <p className="font-medium my-4 text-center">
                Already Have an Account.?
                <Link className=" font-bold text-main ml-1" to={"/signIn"}>
                  SignIn
                </Link>
              </p>
            </form>
            <div className="w-3/4 mx-auto">
              <GoogleSignIn></GoogleSignIn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
