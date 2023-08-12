import { useEffect } from "react";
import google from "../assets/images/google.png";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../firebase.init";
import useToken from "../hooks/useToken";
import Loading from "../utils/Loading";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm();
  const onSubmit = (data) => {
    signInWithEmailAndPassword(data.email, data.password);
  };
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [sendPasswordResetEmail, sending, resetError] =
    useSendPasswordResetEmail(auth);

  const handleResetPassword = async () => {
    const email = getValues("email");

    if (email) {
      await sendPasswordResetEmail(email);
      toast.success("Password Reset Email Send!");
    } else {
      toast.error("Please enter your email");
    }
  };

  const [token] = useToken(user || googleUser, "login");

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token, from, navigate]);

  // if (user || googleUser) {
  //   console.log(user, googleUser);
  //   navigate("/challenges");
  // }

  let signInError;
  if (error || googleError || resetError) {
    signInError = (
      <span className="text-red-500">
        {error?.message || googleError?.message || resetError?.message}
      </span>
    );
  }
  if (loading || googleLoading || sending) {
    return <Loading></Loading>;
  }

  return (
    <div className="flex justify-center items-center py-10 bg-green-100">
      <div className="card lg:w-[35%] md:w-[60%] w-[90%] shadow-xl bg-green-200">
        <div className="card-body items-center ">
          <h2 className="card-title text-2xl">Login</h2>

          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email Address"
                className="input input-bordered focus:outline-none focus:ring-2 focus:ring-emerald-400 w-full"
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
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered focus:outline-none focus:ring-2 focus:ring-emerald-400 w-full"
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
              <button
                type="button"
                onClick={handleResetPassword}
                className="btn text-sky-500 btn-link normal-case text-left"
              >
                <p>Forget Password?</p>
              </button>
            </div>

            {signInError}
            <input
              type="submit"
              className="btn w-full mt-4 bg-gradient-to-r from-emerald-300 to-green-300 hover:from-emerald-400 hover:to-green-400 border-none"
              value="Login"
            />
          </form>
          <p className="text-sm pt-2 font-semibold ">
            New to React Challenge?
            <Link className="text-sky-500 underline ml-2" to="/signup">
              Create new account
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

export default Login;
