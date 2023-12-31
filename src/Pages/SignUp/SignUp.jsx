import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import { useState } from "react";
import axios from "axios";
import useAuth from "../../Utility/Hooks/UseAuth/useAuth";
import Container from "../../Utility/Container/Container";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const [phoneNumberError, setPhoneNumberError] = useState("");
  console.log(phoneNumberError);
  const [showp, setShowp] = useState(true);
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
    const phoenDigit = data.phone.slice(0, 2);
    if (phoenDigit !== "01") {
      setPhoneNumberError("Phone Number must start with 01");
    } else {
      setPhoneNumberError("");
    }
    // const toastid = toast.loading("Sign Up Processing");
    // const hostedPhoto = await axios.post(imageHostingAPi, formData, {
    //   headers: {
    //     "content-type": "multipart/form-data",
    //   },
    // });
    // console.log(hostedPhoto.data.data.display_url);
    // signUpUser(data.email, data.password)
    //   .then((res) => {
    //     console.log(res.user);
    //     updateUserProfile(data.name, hostedPhoto.data.data.display_url)
    //       .then(() => {
    //         const userdata = {
    //           email: data.email,
    //           name: data.name,
    //           photo: hostedPhoto.data.data.display_url,
    //           role: "user",
    //           creationDate: new Date().toDateString(),
    //         };
    //         axios.post("/users", userdata).then((res) => {
    //           if (res.data.insertedId) {
    //             toast.success("Sign Up SuccessFully", { id: toastid });
    //             reset();
    //             navigate(location.state ? location.state : "/");
    //           }
    //         });
    //       })
    //       .catch((error) => console.log(error));
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     if (error.code === "auth/email-already-in-use") {
    //       toast.error("Email Already Registered", { id: toastid });
    //     }
    //   });
  };
  return (
    <Container>
      <div className="flex h-full gap-10 container mx-auto  justify-center items-center">
        <Helmet>
          <title>Echo Estate || Sign Up</title>
        </Helmet>
        <div className="lg:w-1/2 w-[90vw]">
          <div className="card  lg:w-10/12  mx-auto shadow-[0_0_35px_#ECECEC] backdrop-blur-sm px-10 py-5">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text flex">
                    Name <span className="text-red-500 text-2xl">*</span>
                  </span>
                </label>
                <input
                  type="name"
                  placeholder="your name"
                  name="name"
                  className="input input-bordered bg- focus:outline-none hover:bg- focus:border-dashed focus:border-main"
                  required
                  {...register("name", { required: true })}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text flex">
                    Email <span className="text-red-500 text-2xl">*</span>
                  </span>
                </label>
                <input
                  type="email"
                  placeholder="your email"
                  name="email"
                  required
                  className="input input-bordered bg- focus:outline-none hover:bg- focus:border-dashed focus:border-main"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="text-red-500 mt-4">Please Type An Email</p>
                )}
              </div>
              <div className="form-control relative">
                <label className="label">
                  <span className="label-text flex">
                    Phone <span className="text-red-500 text-2xl">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="your phone number"
                  name="name"
                  className="input input-bordered bg- focus:outline-none hover:bg- focus:border-dashed focus:border-main"
                  required
                  {...register("phone", { required: true })}
                />
                {phoneNumberError && (
                  <p className="text-red-500 mt-2" role="alert">
                    Phone Number must start with 01
                  </p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text flex">
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
                    className="input w-full pt-2 z-50 opacity-0 input-bordered bg-gray-100 hover:bg-gray-100 border-dashed border-main focus:border-main"
                  />
                </div>
              </div>
              <div className="form-control relative">
                <label className="label">
                  <span className="label-text flex">
                    Password <span className="text-red-500 text-2xl">*</span>
                  </span>
                </label>
                <input
                  type={showp ? "password" : "text"}
                  name="password"
                  placeholder="password"
                  required
                  className="input input-bordered focus:outline-none focus:border-dashed focus:border-main"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /^(?=.*[A-Z])(?=.*[\W_]).{6,}$/,
                  })}
                />
                <button
                  onClick={() => setShowp(!showp)}
                  type="button"
                  className="absolute top-[65%] right-3 text-xl"
                >
                  {showp ? <IoEyeOutline></IoEyeOutline> : <FaRegEyeSlash />}
                </button>
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
