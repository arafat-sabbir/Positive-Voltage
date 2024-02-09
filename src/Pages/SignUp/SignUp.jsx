import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import { useState } from "react";
import useAuth from "../../Utility/Hooks/UseAuth/useAuth";
import Container from "../../Utility/Container/Container";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import useAxios from "../../Utility/Hooks/UseAxios/useAxios";

const SignUp = () => {
  // Handle The Phone Number Validation
  const [phoneNumberError, setPhoneNumberError] = useState("");
  // Get the Instance Of Axios
  const axios = useAxios();
  const navigate = useNavigate();
  // Toggle Password Show And Hide
  const [showPassword, setShowPassword] = useState(true);
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
    const phoneDigit = data.phone.slice(0, 2);
    if (data.phone.length !== 11) {
      return setPhoneNumberError("Phone number must be 11 digits Long");
    }
    if (phoneDigit !== "01") {
      return setPhoneNumberError("Phone Number must start with 01");
    } else {
      setPhoneNumberError("");
    }
    const toastId = toast.loading("Sign Up Processing");
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
            const userData = {
              userEmail: data.email,
              name: data.name,
              phoneNumber: data.phone,
              photo: hostedPhoto.data.data.display_url,
              method:'email',
              creationDate: new Date().toDateString(),
            };
            axios.post(`/users`, userData).then((res) => {
              if (res.data.insertedId) {
                toast.success("Sign Up SuccessFully", { id: toastId });
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
          toast.error("Email Already Registered", { id: toastId });
        }
      });
  };
  return (
    <Container>
      <div className="flex h-full gap-10 container mx-auto  justify-center items-center">
        <Helmet>
          <title>Positive Voltage | Sign Up</title>
        </Helmet>
        <div className="lg:w-1/2 w-[100vw]">
          <div className="card  lg:w-9/12  mx-auto lg:shadow-[0_0_35px_#ECECEC] dark:lg:shadow-gray-600/20 backdrop-blur-sm lg:px-10 py-5 my-6 lg:my-0">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium flex">
                    Name <span className="text-red-500 text-2xl">*</span>
                  </span>
                </label>
                <input
                  type="name"
                  placeholder="your name"
                  name="name"
                  className="input input-bordered bg- focus:outline-none hover:bg- focus:border-dashed focus:border-main"
                  {...register("name", { required: true })}
                />
                {errors.name?.type === "required" && (
                  <p className="text-red-500 text-sm" role="alert">
                    Name Is required
                  </p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium flex">
                    Email <span className="text-red-500 text-2xl">*</span>
                  </span>
                </label>
                <input
                  type="email"
                  placeholder="your email"
                  name="email"
                  className="input input-bordered bg- focus:outline-none hover:bg- focus:border-dashed focus:border-main"
                  {...register("email", { required: true })}
                />
                {errors.email?.type === "required" && (
                  <p className="text-red-500 text-sm" role="alert">
                    Email Is required
                  </p>
                )}
              </div>
              <div className="form-control relative">
                <label className="label">
                  <span className="label-text font-medium flex">
                    Phone <span className="text-red-500 text-2xl">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="your phone number"
                  name="name"
                  className="input input-bordered bg- focus:outline-none hover:bg- focus:border-dashed focus:border-main"
                  {...register("phone", { required: true })}
                />
                {phoneNumberError && (
                  <p className="text-red-500 mt-2 text-sm" role="alert">
                    {phoneNumberError}
                  </p>
                )}
                {errors.phone?.type === "required" && (
                  <p className="text-red-500 text-sm" role="alert">
                    Phone Is required
                  </p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium flex">
                    Photo <span className="text-red-500 text-2xl">*</span>
                  </span>
                </label>

                <div className="relative w-full">
                  <label className="label absolute -z-1 input pt-2 opacity-100 input-bordered focus:outline-none w-full focus:border-dashed focus:border-main">
                    <span className="label-text ">
                      {photoName || "Upload Profile Picture"}
                    </span>
                  </label>
                  <input
                    onChange={handlePhotoUpload}
                    accept="images/*"
                    type="file"
                    placeholder="upload your Photo"
                    name="email"
                    required
                    className="input w-full pt-2 z-50 opacity-0 input-bordered bg-gray-100 hover:bg-gray-100 border-dashed border-main focus:border-main"
                  />
                </div>
              </div>
              <div className="form-control relative">
                <label className="label">
                  <span className="label-text font-medium flex">
                    Password <span className="text-red-500 text-2xl">*</span>
                  </span>
                </label>
                <input
                  type={showPassword ? "password" : "text"}
                  name="password"
                  placeholder="password"
                  className="input input-bordered focus:outline-none focus:border-dashed focus:border-main"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /^(?=.*[a-z])(?=.*[\W_]).{6,}$/,
                  })}
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                  className="absolute top-[65%] right-3 text-xl"
                >
                  {showPassword ? <IoEyeOutline></IoEyeOutline> : <FaRegEyeSlash />}
                </button>
                <div>
                  {errors.password?.type === "minLength" && (
                    <p className="text-red-500 text-sm" role="alert">
                      Password Should Atleast 6 Character
                    </p>
                  )}
                  {errors.password?.type === "required" && (
                    <p className="text-red-500 text-sm" role="alert">
                      Password Is required
                    </p>
                  )}
                  {errors.password?.type === "pattern" && (
                    <p className="text-red-500 text-sm" role="alert">
                      Password Should Contain atleast one Letter And One Special
                      Character
                    </p>
                  )}
                </div>
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn bg-transparent hover:bg-transparent focus:border-dashed focus:border-main border border-gray-200"
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
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SignUp;
