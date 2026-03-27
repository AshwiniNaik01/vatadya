import React, { useState } from "react";
import { X, Mail, ShieldCheck, ArrowRight, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { sendOtp, verifyOtp } from "../../api/authApi";
import { closeLoginModal, setUser } from "../../store/slices/authSlice";

const LoginModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [reference, setReference] = useState("");
  const [step, setStep] = useState(1); // 1 = enter email, 2 = enter OTP
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSendOtp = async (e) => {
    e?.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail) return;
    
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      console.log("Sending OTP to:", trimmedEmail);
      const res = await sendOtp(trimmedEmail);
      console.log("OTP Response:", res);

      // Robust handling of different response structures
      const ref = res.data?.reference || res.reference || (typeof res.data === 'string' ? res.data : null);
      
      if (ref) {
        setReference(ref);
        setStep(2);
        setSuccess("OTP sent successfully to your email.");
      } else {
        throw new Error(res.message || "Failed to send OTP. Please check your email.");
      }
    } catch (err) {
      console.error("LoginModal Error:", err);
      // Catch specific backend error strings if possible
      const errorMessage = typeof err === 'string' ? err : (err.message || err.error || "Failed to initiate login. Please try again.");
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e?.preventDefault();
    if (!otp || !reference) return;

    setLoading(true);
    setError("");
    try {
      const res = await verifyOtp(reference, otp);
      // Assuming res structure is { success: true, data: { token: "...", user: { ... } } }
      const authData = res.data || res;
      
      if (authData.token && authData.user) {
        // Save to cookies
        Cookies.set("token", authData.token, { expires: 7 });
        Cookies.set("userId", authData.user._id || authData.user.id, { expires: 7 });
        Cookies.set("email", authData.user.email, { expires: 7 });
        Cookies.set("user", JSON.stringify(authData.user), { expires: 7 });

        // Update Redux state
        dispatch(setUser(authData.user));
        
        setSuccess("Login successful! Redirecting...");
        
        setTimeout(() => {
          onClose();
          // Reset internal state
          setStep(1);
          setEmail("");
          setOtp("");
          setReference("");
          setSuccess("");
        }, 1500);
      } else {
        throw new Error(res.message || "Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError(err.message || err.error || "Verification failed. Please check the OTP.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-obsidian/40 backdrop-blur-md animate-in fade-in duration-300" 
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-white/95 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-sky-100 overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Decor elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-sky-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-rose-50/50 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
        
        {/* Close Button */}
        {/* <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-sky-400 hover:text-sky-600 hover:bg-sky-50 rounded-xl transition-all z-10"
        >
          <X size={20} />
        </button> */}

         <button
    onClick={() => onClose && onClose()}
    className="absolute top-6 right-6 p-2 text-sky-400 hover:text-sky-600 hover:bg-sky-50 rounded-xl transition-all z-20"
  >
    <X size={20} />
  </button>

        <div className="p-10 sm:p-12 relative z-10">
          {/* Header */}
          <div className="mb-10 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-sky-400 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-sky-200 rotate-3">
              <ShieldCheck className="text-white w-10 h-10 -rotate-3" />
            </div>
            <h2 className="text-3xl font-black text-sky-950 tracking-tight">
              {step === 1 ? "Welcome Back" : "Verify Account"}
            </h2>
            <p className="text-sky-600/70 mt-2 font-medium">
              {step === 1 
                ? "Enter your email to receive a login OTP" 
                : `We've sent a 6-digit code to ${email}`}
            </p>
          </div>

          {/* Feedback Messages */}
          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-600 text-sm font-semibold animate-in slide-in-from-top-2">
              <AlertCircle size={18} className="shrink-0" />
              {error}
            </div>
          )}
          {success && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3 text-emerald-600 text-sm font-semibold animate-in slide-in-from-top-2">
              <CheckCircle2 size={18} className="shrink-0" />
              {success}
            </div>
          )}

          {/* Form */}
          <form onSubmit={step === 1 ? handleSendOtp : handleVerifyOtp} className="space-y-6">
            {step === 1 ? (
              <div className="group relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-400 group-focus-within:text-sky-600 transition-colors">
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-sky-50/50 border-2 border-transparent focus:border-sky-400 focus:bg-white rounded-2xl py-4 pl-12 pr-4 outline-none text-sky-950 font-bold placeholder:text-sky-300 transition-all"
                  required
                />
              </div>
            ) : (
              <div className="group relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-400 group-focus-within:text-sky-600 transition-colors">
                  <ShieldCheck size={20} />
                </div>
                <input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  className="w-full bg-sky-50/50 border-2 border-transparent focus:border-sky-400 focus:bg-white rounded-2xl py-4 pl-12 pr-4 outline-none text-sky-950 font-black tracking-[0.5em] placeholder:tracking-normal placeholder:font-bold placeholder:text-sky-300 transition-all text-center"
                  required
                />
              </div>
            )}

            <button
              disabled={loading || (step === 1 ? !email : !otp)}
              className="group relative w-full bg-gradient-to-r from-sky-500 to-blue-600 disabled:from-sky-300 disabled:to-blue-300 py-4 rounded-2xl shadow-lg shadow-sky-200 flex items-center justify-center gap-3 text-white font-black uppercase tracking-widest hover:shadow-xl hover:-translate-y-0.5 transition-all outline-none focus:ring-4 ring-sky-100"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  {step === 1 ? "Initialize Access" : "Verify & Connect"}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-10 pt-8 border-t border-sky-100 text-center">
            <p className="text-sky-500/60 text-xs font-bold uppercase tracking-widest">
              {step === 1 ? "Secure biometric encryption" : "Didn't receive code?"}
            </p>
            {step === 2 && (
              <button 
                onClick={handleSendOtp}
                className="mt-2 text-sky-600 hover:text-sky-800 font-black text-sm uppercase tracking-wider transition-colors"
                disabled={loading}
              >
                Resend Code
              </button>
            )}
            {step === 2 && (
               <button 
               onClick={() => setStep(1)}
               className="block w-full mt-4 text-sky-400 hover:text-sky-600 font-bold text-xs uppercase tracking-widest transition-colors"
             >
               Change Email
             </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;