// import React, { useState } from "react";
// import {
//   X,
//   Mail,
//   ShieldCheck,
//   ArrowRight,
//   Loader2,
//   AlertCircle,
//   CheckCircle2,
// } from "lucide-react";
// import Cookies from "js-cookie";
// import { useDispatch } from "react-redux";
// import { sendOtp, verifyOtp } from "../../api/authApi";
// import { closeLoginModal, setUser } from "../../store/slices/authSlice";

// const LoginModal = ({ isOpen, onClose }) => {
//   const dispatch = useDispatch();
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [reference, setReference] = useState("");
//   const [step, setStep] = useState(1); // 1 = enter email, 2 = enter OTP
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleSendOtp = async (e) => {
//     e?.preventDefault();
//     const trimmedEmail = email.trim();
//     if (!trimmedEmail) return;

//     setLoading(true);
//     setError("");
//     setSuccess("");
//     try {
//       console.log("Sending OTP to:", trimmedEmail);
//       const res = await sendOtp(trimmedEmail);
//       console.log("OTP Response:", res);

//       // Robust handling of different response structures
//       const ref =
//         res.data?.reference ||
//         res.reference ||
//         (typeof res.data === "string" ? res.data : null);

//       if (ref) {
//         setReference(ref);
//         setStep(2);
//         setSuccess("OTP sent successfully to your email.");
//       } else {
//         throw new Error(
//           res.message || "Failed to send OTP. Please check your email.",
//         );
//       }
//     } catch (err) {
//       console.error("LoginModal Error:", err);
//       // Catch specific backend error strings if possible
//       const errorMessage =
//         typeof err === "string"
//           ? err
//           : err.message ||
//             err.error ||
//             "Failed to initiate login. Please try again.";
//       setError(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerifyOtp = async (e) => {
//     e?.preventDefault();
//     if (!otp || !reference) return;

//     setLoading(true);
//     setError("");
//     try {
//       const res = await verifyOtp(reference, otp);
//       // Assuming res structure is { success: true, data: { token: "...", user: { ... } } }
//       const authData = res.data || res;

//       if (authData.token && authData.user) {
//         // Save to cookies
//         Cookies.set("token", authData.token, { expires: 7 });
//         Cookies.set("userId", authData.user._id || authData.user.id, {
//           expires: 7,
//         });
//         Cookies.set("email", authData.user.email, { expires: 7 });
//         Cookies.set("user", JSON.stringify(authData.user), { expires: 7 });

//         // Update Redux state
//         dispatch(setUser(authData.user));

//         setSuccess("Login successful! Redirecting...");

//         setTimeout(() => {
//           onClose();
//           // Reset internal state
//           setStep(1);
//           setEmail("");
//           setOtp("");
//           setReference("");
//           setSuccess("");
//         }, 1500);
//       } else {
//         throw new Error(res.message || "Invalid OTP. Please try again.");
//       }
//     } catch (err) {
//       setError(
//         err.message ||
//           err.error ||
//           "Verification failed. Please check the OTP.",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
//       {/* Backdrop */}
//       <div
//         className="absolute inset-0 bg-obsidian/40 backdrop-blur-md animate-in fade-in duration-300"
//         onClick={onClose}
//       />

//       {/* Modal Container */}
//       <div className="relative w-full max-w-md bg-white/95 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-sky-100 overflow-hidden animate-in zoom-in-95 duration-300">
//         {/* Decor elements */}
//         <div className="absolute top-0 right-0 w-32 h-32 bg-sky-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
//         <div className="absolute bottom-0 left-0 w-24 h-24 bg-rose-50/50 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

//         <button
//           onClick={() => onClose && onClose()}
//           className="absolute top-6 right-6 p-2 text-sky-400 hover:text-sky-600 hover:bg-sky-50 rounded-xl transition-all z-20"
//         >
//           <X size={20} />
//         </button>

//         <div className="p-10 sm:p-12 relative z-10">
//           {/* Header */}
//           <div className="mb-10 text-center">
//             <div className="w-20 h-20 bg-gradient-to-br from-sky-400 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-sky-200 rotate-3">
//               <ShieldCheck className="text-white w-10 h-10 -rotate-3" />
//             </div>
//             <h2 className="text-3xl font-black text-sky-950 tracking-tight">
//               {step === 1 ? "Welcome Back" : "Verify Account"}
//             </h2>
//             <p className="text-sky-600/70 mt-2 font-medium">
//               {step === 1
//                 ? "Enter your email to receive a login OTP"
//                 : `We've sent a 6-digit code to ${email}`}
//             </p>
//           </div>

//           {/* Feedback Messages */}
//           {error && (
//             <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-600 text-sm font-semibold animate-in slide-in-from-top-2">
//               <AlertCircle size={18} className="shrink-0" />
//               {error}
//             </div>
//           )}
//           {success && (
//             <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3 text-emerald-600 text-sm font-semibold animate-in slide-in-from-top-2">
//               <CheckCircle2 size={18} className="shrink-0" />
//               {success}
//             </div>
//           )}

//           {/* Form */}
//           <form
//             onSubmit={step === 1 ? handleSendOtp : handleVerifyOtp}
//             className="space-y-6"
//           >
//             {step === 1 ? (
//               <div className="group relative">
//                 <div className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-400 group-focus-within:text-sky-600 transition-colors">
//                   <Mail size={20} />
//                 </div>
//                 <input
//                   type="email"
//                   placeholder="name@example.com"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full bg-sky-50/50 border-2 border-transparent focus:border-sky-400 focus:bg-white rounded-2xl py-4 pl-12 pr-4 outline-none text-sky-950 font-bold placeholder:text-sky-300 transition-all"
//                   required
//                 />
//               </div>
//             ) : (
//               <div className="group relative">
//                 <div className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-400 group-focus-within:text-sky-600 transition-colors">
//                   <ShieldCheck size={20} />
//                 </div>
//                 <input
//                   type="text"
//                   placeholder="Enter 6-digit OTP"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                   maxLength={6}
//                   className="w-full bg-sky-50/50 border-2 border-transparent focus:border-sky-400 focus:bg-white rounded-2xl py-4 pl-12 pr-4 outline-none text-sky-950 font-black tracking-[0.5em] placeholder:tracking-normal placeholder:font-bold placeholder:text-sky-300 transition-all text-center"
//                   required
//                 />
//               </div>
//             )}

//             <button
//               disabled={loading || (step === 1 ? !email : !otp)}
//               className="group relative w-full bg-gradient-to-r from-sky-500 to-blue-600 disabled:from-sky-300 disabled:to-blue-300 py-4 rounded-2xl shadow-lg shadow-sky-200 flex items-center justify-center gap-3 text-white font-black uppercase tracking-widest hover:shadow-xl hover:-translate-y-0.5 transition-all outline-none focus:ring-4 ring-sky-100"
//             >
//               {loading ? (
//                 <Loader2 className="animate-spin" size={20} />
//               ) : (
//                 <>
//                   {step === 1 ? "Initialize Access" : "Verify & Connect"}
//                   <ArrowRight
//                     size={18}
//                     className="group-hover:translate-x-1 transition-transform"
//                   />
//                 </>
//               )}
//             </button>
//           </form>

//           {/* Footer */}
//           <div className="mt-10 pt-8 border-t border-sky-100 text-center">
//             <p className="text-sky-500/60 text-xs font-bold uppercase tracking-widest">
//               {step === 1
//                 ? "Secure biometric encryption"
//                 : "Didn't receive code?"}
//             </p>
//             {step === 2 && (
//               <button
//                 onClick={handleSendOtp}
//                 className="mt-2 text-sky-600 hover:text-sky-800 font-black text-sm uppercase tracking-wider transition-colors"
//                 disabled={loading}
//               >
//                 Resend Code
//               </button>
//             )}
//             {step === 2 && (
//               <button
//                 onClick={() => setStep(1)}
//                 className="block w-full mt-4 text-sky-400 hover:text-sky-600 font-bold text-xs uppercase tracking-widest transition-colors"
//               >
//                 Change Email
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginModal;

import React, { useState } from "react";
import {
  X,
  Mail,
  ShieldCheck,
  Lock,
  ArrowRight,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { sendOtp, verifyOtp, loginUser, registerUser } from "../../api/authApi";
import { setUser } from "../../store/slices/authSlice";
import Lottie from "lottie-react";
import hiking from "../../lotties/hiking.json";
// import hiking from "../../lotties/hiking.json";
// import { Player } from "@lottiefiles/react-lottie-player";

const LoginModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [step, setStep] = useState("login"); // login | register | otpStep1 | otpStep2
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [reference, setReference] = useState("");

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setOtp("");
    setReference("");
    setError("");
    setSuccess("");
  };

  // Register
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(""); // Always clear previous success messages

    try {
      // We only send the OTP here
      const res = await sendOtp(email);

      // Check various response structures
      const ref =
        res.data?.reference ||
        res.reference ||
        (typeof res.data === "string" ? res.data : null);

      if (ref) {
        setReference(ref);
        setIsRegistering(true); // Crucial: This tells the UI we are verifying a NEW user
        setStep("otpStep2"); // This triggers the UI switch
        setSuccess("Verification code sent to your email!");
      } else {
        throw new Error("Failed to get a verification reference from server.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Registration failed",
      );
    } finally {
      setLoading(false);
    }
  };

  // 2. Update handleVerifyOtp (The Final Step)
  // const handleVerifyOtp = async (e) => {
  //   e?.preventDefault();
  //   setLoading(true);
  //   setError("");

  //   try {
  //     // Step A: Verify the OTP code first
  //     const res = await verifyOtp(reference, otp);

  //     // Step B: If we are in "Registering" mode, NOW call the register API
  //     if (isRegistering) {
  //       const regRes = await registerUser({ name, email, password });
  //       if (regRes.data) {
  //         setSuccess("Account verified and created!");
  //         const authData = regRes.data;
  //         Cookies.set("token", authData.token, { expires: 7 });
  //         dispatch(setUser(authData.user));
  //       }
  //     } else {
  //       // Logic for standard OTP Login
  //       const authData = res.data || res;
  //       Cookies.set("token", authData.token, { expires: 7 });
  //       dispatch(setUser(authData.user));
  //       setSuccess("Login successful!");
  //     }

  //     setTimeout(() => {
  //       onClose();
  //       resetForm();
  //     }, 1500);
  //   } catch (err) {
  //     setError(err.message || "Invalid OTP.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const loginAnimation = {
    lottie: hiking,
    bg: "white",
  };
  const LottieComponent = Lottie?.default || Lottie;

  // console.log(typeof Lottie); // should be "function"
  // console.log(loginAnimation.HIKING.lottie); // should be object (JSON)

  // Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await loginUser({ email, password });
      if (res.data?.token) {
        Cookies.set("token", res.data.token, { expires: 7 });
        Cookies.set("user", JSON.stringify(res.data.user), { expires: 7 });
        dispatch(setUser(res.data.user));
        setSuccess("Login successful!");
        setTimeout(() => {
          onClose();
          resetForm();
        }, 1500);
      } else throw new Error(res.message || "Login failed");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // OTP Step 1 - Send OTP
  const handleSendOtp = async (e) => {
    e?.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await sendOtp(email);
      const ref = res.data?.reference || res.reference || null;
      if (ref) {
        setReference(ref);
        setStep("otpStep2");
        setSuccess("OTP sent successfully");
      } else throw new Error(res.message || "Failed to send OTP");
    } catch (err) {
      setError(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // OTP Step 2 - Verify OTP
  const handleVerifyOtp = async (e) => {
    e?.preventDefault();
    if (!otp || !reference) return;
    setLoading(true);
    setError("");

    try {
      // Step A: Verify the OTP itself
      const verifyRes = await verifyOtp(reference, otp);

      // Step B: If verification passed, check our intent
      if (isRegistering) {
        // Proceed to finalize registration in the backend
        const regRes = await registerUser({ name, email, password });

        if (regRes.data) {
          setSuccess("Registration successful! Logging you in...");
          // Handle post-registration (e.g., set cookies or redirect)
          const authData = regRes.data;
          Cookies.set("token", authData.token, { expires: 7 });
          Cookies.set("user", JSON.stringify(authData.user), { expires: 7 });
          dispatch(setUser(authData.user));
        }
      } else {
        // Normal Login flow (OTP-only login)
        const authData = verifyRes.data || verifyRes;
        Cookies.set("token", authData.token, { expires: 7 });
        Cookies.set("user", JSON.stringify(authData.user), { expires: 7 });
        dispatch(setUser(authData.user));
        setSuccess("Login successful!");
      }

      setTimeout(() => {
        onClose();
        resetForm();
        setIsRegistering(false); // Reset intent
      }, 1500);
    } catch (err) {
      setError(err.message || "Verification failed. Please check the code.");
    } finally {
      setLoading(false);
    }
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-1 sm:p-6">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-obsidian/40 backdrop-blur-md animate-in fade-in duration-300"
        onClick={() => {
          setStep("login");
          resetForm();
          onClose();
        }}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white/95 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-sky-100 overflow-hidden animate-in zoom-in-95 duration-300">
        {/* 🔥 FULL WIDTH LOTTIE (TOUCH TOP BORDER) */}
        <div className="w-full  overflow-hidden rounded-t-[2.5rem]">
          <LottieComponent
            animationData={hiking?.default || hiking}
            loop
            className="w-full h-56 sm:h-37 object-fit mb-4 rounded-t-[2.5rem]"
          />
        </div>

        <button
          onClick={() => {
            setStep("login");
            resetForm();
            onClose();
          }}
          className="absolute top-3 right-3 z-50 p-2 bg-white/80 backdrop-blur-sm text-sky-950 hover:bg-rose-500 hover:text-white rounded-full transition-colors shadow-sm"
        >
          <X size={24} />
        </button>

        {/* 🔽 FORM SECTION */}
        <div className="pb-6 px-4 sm:px-5 relative mt-3">
          {/* 🔥 TITLE */}
          <div className="text-center mb-2">
            {/* <h2 className="text-2xl sm:text-3xl font-black text-sky-950 tracking-tight mb-2">
              {step === "login"
                ? "Login"
                : step === "register"
                  ? "Register"
                  : step === "otpStep1" || step === "otpStep2"
                    ? "Login with OTP"
                    : ""}
            </h2> */}

            <h2 className="text-2xl sm:text-3xl font-black text-sky-950 tracking-tight mb-2">
              {step === "login" && "Login"}
              {step === "register" && "Register"}
              {step === "otpStep2" &&
                (isRegistering ? "Verify Email" : "Login with OTP")}
            </h2>

            {/* <p className="text-sky-600/70 font-medium text-sm leading-tight mb-6 ">
              {step === "login"
                ? "Use email and password"
                : step === "register"
                  ? "Create a new account"
                  : step === "otpStep1"
                    ? "Enter email to receive OTP"
                    : step === "otpStep2"
                      ? `Enter the OTP sent to ${email}`
                      : ""}
            </p> */}

            <p className="text-sky-600/70 font-medium text-sm leading-tight mb-6">
              {step === "otpStep2"
                ? `Enter the code sent to ${email} to ${isRegistering ? "create your account" : "login"}`
                : "Please fill in your details"}
            </p>
          </div>

          {/* ERROR */}
          {error && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 flex items-center gap-3 text-sm font-semibold">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          {/* SUCCESS */}
          {success && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-600 flex items-center gap-3 text-sm font-semibold">
              <CheckCircle2 size={18} />
              {success}
            </div>
          )}

          {/* FORM */}
          <form
            onSubmit={
              step === "login"
                ? handleLogin
                : step === "register"
                  ? handleRegister
                  : handleVerifyOtp
            }
            className="space-y-3 mt-2 "
          >
            {step === "register" && (
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border border-blue-200 text-black rounded-2xl py-3 px-4 outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
              />
            )}

            {(step === "login" || step === "register") && (
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-blue-200 text-black rounded-2xl py-3 px-4 outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
              />
            )}

            {(step === "login" || step === "register") && (
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-blue-200 text-black rounded-2xl py-3 px-4 outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
              />
            )}

            {step === "otpStep1" && (
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-blue-200 text-black rounded-2xl py-3 px-4"
              />
            )}

            {step === "otpStep2" && (
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                required
                className="w-full border border-blue-200 text-black rounded-2xl py-3 px-4 text-center tracking-[0.5em]"
              />
            )}

            <button
              disabled={loading}
              className="w-full bg-sky-500 hover:bg-sky-600 transition-all text-white py-3 rounded-2xl flex items-center justify-center gap-3 font-bold"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : step === "login" ? (
                "Login"
              ) : step === "register" ? (
                "Register"
              ) : step === "otpStep1" ? (
                "Send OTP"
              ) : step === "otpStep2" ? (
                "Verify OTP"
              ) : (
                ""
              )}
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </form>

          {/* FOOTER */}
          <div className="mt-4 text-center text-sm text-sky-600/70">
            {step === "login" && (
              <>
                <span>Don't have an account? </span>
                <button
                  onClick={() => {
                    setStep("register");
                    resetForm();
                  }}
                  className="font-bold underline"
                >
                  Register
                </button>
                <br />
                <button
                  onClick={() => {
                    setStep("otpStep1");
                    resetForm();
                  }}
                  className="mt-1 font-bold underline text-xs"
                >
                  Login with OTP
                </button>
              </>
            )}

            {step === "register" && (
              <button
                onClick={() => {
                  setStep("login");
                  resetForm();
                }}
                className="font-bold underline"
              >
                Back to Login
              </button>
            )}

            {step === "otpStep1" && (
              <button
                onClick={() => {
                  setStep("login");
                  resetForm();
                }}
                className="font-bold underline"
              >
                Back to Login
              </button>
            )}

            {step === "otpStep2" && (
              <button
                onClick={() => {
                  setStep("otpStep1");
                  setOtp("");
                  setError("");
                  setSuccess("");
                }}
                className="font-bold underline"
              >
                Resend OTP
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
