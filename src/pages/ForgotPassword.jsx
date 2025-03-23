import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { resetPassword } from "../services/apiService"; // Import the resetPassword API function

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState(""); // New password state
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm password state
  const [error, setError] = useState(""); // Error message state
  const [success, setSuccess] = useState(""); // Success message state
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state
    setSuccess(""); // Reset success state
    setLoading(true); // Set loading state to true

    if (newPassword !== confirmPassword) {
      setError("รหัสผ่านใหม่และยืนยันรหัสผ่านไม่ตรงกัน");
      setLoading(false);
      return;
    }

    try {
      // Call the resetPassword API
      const response = await resetPassword(email, newPassword);

      // Handle the response from the API
      if (response && response.message === "Password reset successfully") {
        setSuccess(
          "รีเซ็ตรหัสผ่านสำเร็จ! คุณสามารถเข้าสู่ระบบด้วยรหัสผ่านใหม่"
        );
      } else {
        setError("ไม่สามารถรีเซ็ตรหัสผ่านได้");
      }
    } catch (err) {
      setError("เกิดข้อผิดพลาดในการรีเซ็ตรหัสผ่าน");
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-[#FEF9E1]">
        <div className="card bg-[#E5D0AC] w-full max-w-md shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold text-[#6D2323] text-center">
            ลืมรหัสผ่าน
          </h1>
          <p className="text-sm text-center text-gray-700 mt-2">
            กรุณากรอกอีเมลของคุณและรหัสผ่านใหม่เพื่อรีเซ็ตรหัสผ่าน
          </p>

          {error && (
            <p className="text-center text-red-600 font-semibold mt-2">
              {error}
            </p>
          )}
          {success && (
            <p className="text-center text-green-600 font-semibold mt-2">
              {success}
            </p>
          )}

          <form className="mt-6" onSubmit={handleSubmit}>
            <label className="block text-[#6D2323] font-semibold">อีเมล</label>
            <input
              type="email"
              placeholder="กรอกอีเมล"
              className="input input-bordered w-full p-3 border border-[#A31D1D] rounded-md bg-[#6D2323] text-white placeholder-gray-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* New Password */}
            <label className="block text-[#6D2323] font-semibold mt-4">
              รหัสผ่านใหม่
            </label>
            <input
              type="password"
              placeholder="กรอกรหัสผ่านใหม่"
              className="input input-bordered w-full p-3 border border-[#A31D1D] rounded-md bg-[#6D2323] text-white placeholder-gray-300"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            {/* Confirm New Password */}
            <label className="block text-[#6D2323] font-semibold mt-4">
              ยืนยันรหัสผ่านใหม่
            </label>
            <input
              type="password"
              placeholder="กรอกรหัสผ่านใหม่อีกครั้ง"
              className="input input-bordered w-full p-3 border border-[#A31D1D] rounded-md bg-[#6D2323] text-white placeholder-gray-300"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full bg-[#A31D1D] text-white py-3 mt-4 rounded-lg font-semibold hover:bg-[#6D2323] transition"
              disabled={loading} // Disable the button while loading
            >
              {loading ? "กำลังส่ง..." : "ส่งลิงก์รีเซ็ตรหัสผ่าน"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
