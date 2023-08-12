import { useEffect } from "react";
import google from "../assets/images/google.png";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import auth from "../firebase.init";
import useToken from "../hooks/useToken";
import Loading from "../utils/Loading";

const SignUp = () => {
  const navigate = useNavigate();
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

  const [updateProfile, updating, updateError] = useUpdateProfile(auth);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    await createUserWithEmailAndPassword(data.email, data.password);
    await updateProfile({ displayName: data.name });
    reset();
  };

  const [token] = useToken(user || googleUser, "signup");

  useEffect(() => {
    if (token) {
      navigate("/challenges");
    }
  }, [token, navigate]);

  // if (user || googleUser) {
  //   navigate("/challenges");
  // }

  let signInError;
  if (error || googleError || updateError) {
    signInError = (
      <span className="text-red-500">
        {error?.message || googleError?.message}
      </span>
    );
  }
  if (loading || googleLoading || updating) {
    return <Loading></Loading>;
  }
  return (
    <div className="flex justify-center items-center py-10 bg-green-100">
      <div className="card lg:w-[35%] md:w-[60%] w-[90%] shadow-xl bg-green-200">
        <div className="card-body items-center ">
          <h2 className="card-title text-2xl">Sign Up</h2>

          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Your Name"
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-emerald-400 "
                {...register("name", {
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                })}
              />
              <label className="label">
                {errors.name?.type === "required" && (
                  <span className="label-text-alt text-red-500 text-sm">
                    {errors.name.message}
                  </span>
                )}
              </label>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email Address"
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-emerald-400 "
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                  pattern: {
                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                    message: "Provide a valid email",
                  },
                })}
              />
              <label className="label">
                {errors.email?.type === "required" && (
                  <span className="label-text-alt text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
                {errors.email?.type === "pattern" && (
                  <span className="label-text-alt text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </label>
            </div>
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-emerald-400 "
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  minLength: {
                    value: 6,
                    message: "Password should be contains 6 characters",
                  },
                })}
              />
              <label className="label">
                {errors.password?.type === "required" && (
                  <span className="label-text-alt text-red-500 text-sm">
                    {errors.password.message}
                  </span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="label-text-alt text-red-500 text-sm">
                    {errors.password.message}
                  </span>
                )}
              </label>
            </div>
            {signInError}
            <input
              type="submit"
              className="btn w-full mt-4 bg-gradient-to-r from-emerald-300 to-green-300 hover:from-emerald-400 hover:to-green-400 border-none"
              value="Sign Up"
            />
          </form>
          <p className="text-sm pt-2">
            Already have an Account?
            <Link
              className="text-sky-500 font-semibold underline ml-2"
              to="/login"
            >
              Please Login
            </Link>
          </p>

          <div className="divider">OR</div>
          <button
            className="btn btn-outline w-full hover:bg-gradient-to-r hover:from-emerald-400 hover:to-green-400 hover:border-none"
            onClick={() => signInWithGoogle()}
          >
            <div className="flex justify-center items-center gap-3">
              <img className="w-[8%]" src={google} alt="" />
              <h1 className="capitalize text-xl text-gray-600">Google</h1>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
