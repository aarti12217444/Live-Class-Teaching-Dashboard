import logo from "../assets/vedic-logo.png";
import { motion } from "framer-motion";

function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen flex bg-slate-100">

      {/* Left Section */}
      {/* <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-900 to-blue-600 text-white relative overflow-hidden"> */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#0F172A] via-[#1E40AF] to-[#2563EB] text-white relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col justify-center items-center w-full px-10"
        >
          <div className="bg-white p-3 rounded-full shadow-2xl mb-6">
            <img
              src={logo}
              alt="Vedic Classes"
              className="w-28 h-28 object-contain"
            />
          </div>

          <h1 className="text-6xl font-extrabold tracking-wider text-center">
            VEDIC CLASSES
          </h1>

          <p className="mt-4 text-2xl text-center text-blue-100">
            Strong Concepts. Bright Future.
          </p>
          <div className="mt-8 space-y-3 text-lg">
            <p>✓ Live Interactive Classes</p>
            <p>✓ Smart Attendance Tracking</p>
            <p>✓ Real-Time Communication</p>
            <p>✓ Secure Learning Platform</p>
          </div>
        </motion.div>

        <div className="absolute top-20 right-20 w-40 h-40 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-60 h-60 bg-white/10 rounded-full"></div>

      </div>

      {/* Right Section */}
      <div className="flex-1 flex justify-center items-center p-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="
            bg-white/95
            backdrop-blur-xl
            rounded-3xl
            border
            border-white/20
            shadow-[0_20px_60px_rgba(0,0,0,0.15)]
            w-full
            max-w-md
            p-8
            "
        >
          <h2 className="text-3xl font-bold text-slate-800">
            {title}
          </h2>

          <p className="text-slate-500 mt-2 mb-8">
            {subtitle}
          </p>

          {children}
        </motion.div>

      </div>

    </div>
  );
}

export default AuthLayout;