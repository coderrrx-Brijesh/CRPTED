import React, { useState, useContext } from "react";
import axios from "axios";
import LoginContext from "../../Context/LogedinContext";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const LoginPopup = ({ setuser }) => {
  const { setIsLoggedIn } = useContext(LoginContext);
  const [alert, setAlert] = useState(null);
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setAlert(null);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/signin",
        formData
      );
      console.log("Login successful:", response.data.user);
      setuser(response.data.user);
      setIsLoggedIn(true);
    } catch (err) {
      console.error("Login failed:", err);
      setError(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };
  const handleExternalLogin = (service) => {
    setAlert({
      title: "Hola Tester !!!",
      description: ` ${service} login isn't Ready yet.`,
    });
  };

  return (
    <div className="py-20 w-96">
      <div className="flex h-full items-center justify-center">
        <div className="rounded-lg border border-gray-200 bg-white w-full shadow-md dark:border-gray-700 dark:bg-gray-900 flex-col flex h-full items-center justify-center sm:px-4">
          <div className="flex h-full flex-col justify-center gap-4 p-6 w-full">
            <form className="flex flex-col gap-4 pb-4" onSubmit={handleLogin}>
              <h1 className="mb-4 text-2xl font-bold dark:text-white">Login</h1>

              {error && <div className="text-sm text-red-500">{error}</div>}
              {alert && (
                <Alert>
                  <AlertTitle>{alert.title}</AlertTitle>
                  <AlertDescription>{alert.description}</AlertDescription>
                </Alert>
              )}

              {["userName", "password"].map((field) => (
                <div key={field}>
                  <div className="mb-2">
                    <label
                      className="text-sm font-medium text-gray-900 dark:text-gray-300"
                      htmlFor={field}
                    >
                      {field === "userName" ? "Username" : "Password"}:
                    </label>
                  </div>
                  <div className="flex w-full rounded-lg pt-1">
                    <div className="relative w-full">
                      <input
                        className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                        id={field}
                        type={field === "password" ? "password" : "text"}
                        name={field}
                        placeholder={
                          field === "userName" ? "Enter username" : "Password"
                        }
                        required
                        minLength={field === "userName" ? 3 : 8}
                        value={formData[field]}
                        onChange={handleChange}
                      />
                      {error && (
                        <p className="text-sm text-red-600 mt-1">{error}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex flex-col gap-2">
                <button
                  type="submit"
                  className="border transition-colors focus:ring-2 p-0.5 disabled:cursor-not-allowed border-transparent bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white disabled:bg-gray-300 disabled:text-gray-700 rounded-lg"
                >
                  <span className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base false">
                    Login
                  </span>
                </button>
                <button
                onClick={()=>handleExternalLogin("Google")}
                  type="button"
                  className="transition-colors focus:ring-2 p-0.5 disabled:cursor-not-allowed bg-white hover:bg-gray-100 text-gray-900 border border-gray-200 disabled:bg-gray-300 disabled:text-gray-700 rounded-lg"
                >
                  <span className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base false">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      version="1.1"
                      x="0px"
                      y="0px"
                      viewBox="0 0 48 48"
                      enableBackground="new 0 0 48 48"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="#FFC107"
                        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                      ></path>
                      <path
                        fill="#FF3D00"
                        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                      ></path>
                      <path
                        fill="#4CAF50"
                        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                      ></path>
                      <path
                        fill="#1976D2"
                        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                      ></path>
                    </svg>
                    Sign up with Google
                  </span>
                </button>
                <button
                  onClick={()=>handleExternalLogin("Facebook")}
                  type="button"
                  className="transition-colors focus:ring-2 p-0.5 disabled:cursor-not-allowed bg-white hover:bg-gray-100 text-gray-900 border border-gray-200 disabled:bg-gray-300 disabled:text-gray-700 rounded-lg"
                >
                  <span className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base false">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      version="1.1"
                      x="0px"
                      y="0px"
                      viewBox="0 0 48 48"
                      enableBackground="new 0 0 48 48"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="#1877F2"
                        d="M43.5,24c0-10.5-8.5-19-19-19s-19,8.5-19,19c0,9.7,7.1,17.8,16.5,18.9v-13.3h-4.9v-5h4.9v-3.7c0-5,2.9-7.7,7.3-7.7c2.1,0,4.2,0.2,4.7,0.3v5h-3.3c-2.6,0-3.3,1.3-3.3,3.2v4.2h6.6l-1,5h-5.6v13.3c9.4-1.1,16.5-9.2,16.5-18.9z"
                      ></path>
                    </svg>
                    Sign up with Facebook
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
