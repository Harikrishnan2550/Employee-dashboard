// import React, { useState } from "react";

// function Login() {
//   const [state, setState] = useState("Login"); // "Login" or "Sign Up"
//   const [formData, setFormData] = useState({ name: "", email: "", password: "", terms: false });
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   // Input validation function
//   const validateInputs = () => {
//     if (state === "Sign Up" && !formData.name.trim()) {
//       setErrorMessage("Name is required for signup.");
//       return false;
//     }
//     if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       setErrorMessage("Invalid email format.");
//       return false;
//     }
//     if (formData.password.length < 6) {
//       setErrorMessage("Password must be at least 6 characters.");
//       return false;
//     }
//     if (state === "Sign Up" && !formData.terms) {
//       setErrorMessage("You must agree to the Terms of Use.");
//       return false;
//     }
//     return true;
//   };

//   // Update form data when input changes
//   const changeHandler = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };
// // Handle form submission
// const handleSubmit = async () => {
//   if (!validateInputs()) return;

//   setLoading(true);
//   setErrorMessage("");

//   const url =
//     state === "Login"
//       ? "http://localhost:4000/api/user/login"
//       : "http://localhost:4000/api/user/signup";

//   try {
//     const response = await fetch(url, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData),
//     });

//     const data = await response.json();

//     if (response.ok && data.success) {
//       localStorage.setItem("auth-token", data.token);
//       // Use React Router's useNavigate if applicable
//       window.location.replace("/");
//     } else {
//       setErrorMessage(data.error || "An unknown error occurred.");
//     }
//   } catch (error) {
//     setErrorMessage("An error occurred. Please try again.");
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <section className="container flex justify-center flex-col pt-24 mb-20">
//       <div className="max-w-[555px] h-auto bg-white m-auto px-14 py-10 rounded-xl shadow-2xl">
//         <h3 className="text-[28px] font-semibold">{state}</h3>
//         <div className="flex flex-col gap-4 mt-7">
//           {state === "Sign Up" && (
//             <input
//               type="text"
//               placeholder="Your Name"
//               name="name"
//               value={formData.name}
//               onChange={changeHandler}
//               className={`h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl ${
//                 errorMessage.includes("Name") ? "border-red-500 border" : ""
//               }`}
//             />
//           )}
//           <input
//             type="email"
//             placeholder="Email Address"
//             name="email"
//             value={formData.email}
//             onChange={changeHandler}
//             className={`h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl ${
//               errorMessage.includes("email") ? "border-red-500 border" : ""
//             }`}
//           />
//           <input
//             type="password"
//             placeholder="Enter Password"
//             name="password"
//             value={formData.password}
//             onChange={changeHandler}
//             className={`h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl ${
//               errorMessage.includes("Password") ? "border-red-500 border" : ""
//             }`}
//           />
//         </div>
//         {errorMessage && <p className="text-red-500 mt-3">{errorMessage}</p>}
//         <button
//           onClick={handleSubmit}
//           className={`my-5 w-full rounded-md h-11 font-bold ${
//             loading ? "bg-gray-400 cursor-not-allowed" : "bg-emerald-300"
//           }`}
//           disabled={loading}
//         >
//           {loading ? "Processing..." : "Continue"}
//         </button>
//         {state === "Sign Up" ? (
//           <p className="text-black font-bold">
//             Already have an account?{" "}
//             <span className="text-amber-500 underline cursor-pointer" onClick={() => setState("Login")}>
//               Login
//             </span>
//           </p>
//         ) : (
//           <p className="text-black font-bold">
//             Create an account?{" "}
//             <span className="text-amber-500 underline cursor-pointer" onClick={() => setState("Sign Up")}>
//               Click here
//             </span>
//           </p>
//         )}
//         {state === "Sign Up" && (
//           <div className="flex justify-center mt-6 gap-3">
//             <input
//               type="checkbox"
//               name="terms"
//               id="terms"
//               checked={formData.terms}
//               onChange={changeHandler}
//             />
//             <p className="text-gray-500">By continuing, I agree to the Terms of Use & Privacy Policy.</p>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }

// export default Login;
