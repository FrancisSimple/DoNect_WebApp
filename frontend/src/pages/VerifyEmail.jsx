import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/ngo-logo.jpg";

function VerifyEmail() {
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);

  const handleChange = (e, idx) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    const newDigits = [...digits];
    if (val.length === 0) {
      newDigits[idx] = "";
      setDigits(newDigits);
      return;
    }
    newDigits[idx] = val[val.length - 1];
    setDigits(newDigits);
    if (idx < 5 && val) {
      inputsRef.current[idx + 1].focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace") {
      if (digits[idx]) {
        // Clear current input
        const newDigits = [...digits];
        newDigits[idx] = "";
        setDigits(newDigits);
      } else if (idx > 0) {
        // Move to previous input and clear it
        inputsRef.current[idx - 1].focus();
        const newDigits = [...digits];
        newDigits[idx - 1] = "";
        setDigits(newDigits);
        e.preventDefault();
      }
    } else if (e.key === "ArrowLeft" && idx > 0) {
      inputsRef.current[idx - 1].focus();
      e.preventDefault();
    } else if (e.key === "ArrowRight" && idx < 5) {
      inputsRef.current[idx + 1].focus();
      e.preventDefault();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").replace(/[^0-9]/g, "");
    if (paste.length === 6) {
      setDigits(paste.split(""));
      inputsRef.current[5].focus();
      e.preventDefault();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle verification logic here
  };

    useEffect(() => {
    document.title = "DoNect org | Verify Email";
  }, []);


  return (
    <div
      className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center p-4"
      data-aos="fade-up"
    >
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <div className="flex flex-col items-center mb-8">
          <span className="inline-flex items-center gap-2 mb-4">
            <img
              src={Logo}
              alt="Logo"
              className="w-16 h-16 mx-auto rounded-full border-2 border-green-500"
            />
            <div className="">
              <span className="text-green-700 font-bold text-2xl">DoNect</span>
              <span className="text-green-500 text-sm font-medium ml-1.5">
                org
              </span>
            </div>
          </span>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">
            Verify Your Email
          </h2>
          <p className="text-gray-600 text-center">
            Please enter the 6-digit code sent to your email address.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center gap-2 mb-6">
            {[0, 1, 2, 3, 4, 5].map((idx) => (
              <input
                key={idx}
                ref={(el) => (inputsRef.current[idx] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className="[@media(max-width:360px)]:w-10 [@media(max-width:360px)]:h-10 w-12 h-12 text-center text-2xl font-bold border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none bg-green-50 text-green-700 transition-all duration-200"
                value={digits[idx]}
                onChange={(e) => handleChange(e, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                onPaste={handlePaste}
                autoFocus={idx === 0}
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 font-semibold text-lg flex items-center justify-center cursor-pointer"
          >
            <i className="fas fa-check-circle mr-2"></i>
            Verify Email
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Didn't receive the code?{" "}
            <button
              type="button"
              className="text-green-600 hover:text-green-700 font-medium underline transition cursor-pointer"
              // onClick={handleResend} // implement resend logic if needed
            >
              Resend Code
            </button>
          </p>
          <p className="mt-2 text-gray-500 text-xs">
            <Link to="/login" className="hover:underline text-green-600">
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;
