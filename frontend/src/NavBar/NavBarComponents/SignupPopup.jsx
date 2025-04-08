import axios from "axios";
import { useState, useContext } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Navigate } from "react-router-dom";
import LoginContext from "@/Context/LogedinContext";
//  if we want ot automatic sigin with signup
// import LoginContext from "../../Context/LogedinContext";
const SignInPopup = () => {
  const { setShowPopup,showPopup } = useContext(LoginContext);
  //   const { setIsLoggedIn } = useContext(LoginContext);
  const [alertMessage, setAlertMessage] = useState(null);
  const [formData, setFormData] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlertMessage(null);
    setErrors({});
    try {
      const response = await axios.post(
        process.env.REACT_APP_SIGNUP_API_URL,
        formData
      );
      // setIsLoggedIn(true); // Assuming login is successful and user is logged in
      console.log("Response:", response.data);
      setAlertMessage({ title: "Success", description: "Sign up successful!" });
      setShowPopup("login")

    } catch (error) {
      const newErrors = {};
      
      if (error.response) {
        if (error.response.status === 409) {
          newErrors.userName = "Username already taken.";
        } else if (error.response.status === 400) {
          newErrors.form = error.response.data.message;
        } else if (error.response.data && error.response.data.errors) {
          Object.assign(newErrors, error.response.data.errors);
        } else {
          newErrors.form = "Sign up failed. Please try again later.";
        }
      } else if (error.request) {
        newErrors.form =
          "No response from server. Please check your network connection.";
      } else {
        newErrors.form = "An unexpected error occurred: " + error.message;
      }

      setErrors(newErrors);
    }
  };
  const handleExternalLogin = (service) => {
    setAlertMessage({
      title: "Hola Tester !!!",
      description: ` ${service} login isn't Ready yet.`,
    });
  };

  return (
    <div className="py-20 w-96">
      <div className="flex h-4/5 items-center justify-center">
        <div className="rounded-lg border border-gray-200 bg-white w-full shadow-md dark:border-gray-700 dark:bg-gray-900 flex-col flex h-full items-center justify-center sm:px-4">
          <div className="flex h-full flex-col justify-center gap-4 p-6 w-full">
            <form className="flex flex-col gap-4 pb-4" onSubmit={handleSubmit}>
              <h1 className="mb-4 text-2xl font-bold dark:text-white">
                Sign Up
              </h1>
              {alertMessage && (
                <Alert>
                  <AlertTitle>{alertMessage.title}</AlertTitle>
                  <AlertDescription>
                    {alertMessage.description}
                  </AlertDescription>
                </Alert>
              )}
              {errors.form && (
                <p className="text-sm text-red-600 mt-2">{errors.form}</p>
              )}
              {["userName", "firstName", "lastName", "password"].map(
                (field) => (
                  <div key={field}>
                    <div className="mb-2">
                      <label
                        className="text-sm font-medium text-gray-900 dark:text-gray-300"
                        htmlFor={field}
                      >
                        {field === "userName"
                          ? "Username"
                          : field === "firstName"
                          ? "First Name"
                          : field === "lastName"
                          ? "Last Name"
                          : "Password"}
                        :
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
                            field === "userName"
                              ? "Enter username"
                              : field === "firstName"
                              ? "First Name"
                              : field === "lastName"
                              ? "Last Name"
                              : "Password"
                          }
                          required
                          minLength={
                            field === "userName"
                              ? 3
                              : field === "password"
                              ? 8
                              : undefined
                          }
                          maxLength={
                            field === "userName"
                              ? 30
                              : field === "firstName" || field === "lastName"
                              ? 50
                              : undefined
                          }
                          value={formData[field]}
                          onChange={handleChange}
                        />
                        {errors[field] && (
                          <p className="text-sm text-red-600 mt-1">
                            {errors[field]}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )
              )}

              <div className="flex flex-col gap-2">
                <button
                  type="submit"
                  className="border transition-colors focus:ring-2 p-0.5 disabled:cursor-not-allowed border-transparent bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white disabled:bg-gray-300 disabled:text-gray-700 rounded-lg"
                >
                  <span className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base false">
                    Sign Up
                  </span>
                </button>
                <button
                  onClick={() => handleExternalLogin("Google")}
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
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPopup;
