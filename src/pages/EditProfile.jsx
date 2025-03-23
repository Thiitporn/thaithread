import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { findUserById, updateProfile } from "../services/apiService"; // Assuming API functions are in apiService
import Navbar from "../components/Navbar";

const EditProfile = () => {
  const navigate = useNavigate();

  // State variables for user data (without phone)
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch user information based on userId in localStorage
  useEffect(() => {
    const userId = localStorage.getItem("userId"); // Retrieve userId from localStorage
    if (userId) {
      const fetchUserData = async () => {
        try {
          // Call the API to fetch user details
          const response = await findUserById(userId);
          // Set user data in state
          setUser({
            name: response.name,
            email: response.email,
          });
        } catch (err) {
          setError("ไม่สามารถดึงข้อมูลผู้ใช้ได้");
        }
      };
      fetchUserData();
    } else {
      setError("ไม่พบ userId ใน localStorage");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const userId = localStorage.getItem("userId");

      console.log(user.name, user.email);

      // Call the API to update the profile (without phone)
      await updateProfile(userId, user.name, user.email);
      localStorage.setItem("user", JSON.stringify(user.name));
      setSuccess("บันทึกข้อมูลสำเร็จ!");

      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError("เกิดข้อผิดพลาดในการอัปเดตข้อมูล");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-[#FEF9E1]">
        <div className="card bg-[#E5D0AC] w-full max-w-md shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold text-[#6D2323] text-center">
            แก้ไขข้อมูลส่วนตัว
          </h1>

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
            {/* Name */}
            <label className="block text-[#6D2323] font-semibold">
              ชื่อ - นามสกุล
            </label>
            <input
              type="text"
              className="input input-bordered w-full p-3 border border-[#A31D1D] rounded-md bg-[#6D2323] text-white placeholder-gray-300"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              required
            />

            {/* Email */}
            <label className="block text-[#6D2323] font-semibold mt-4">
              อีเมล
            </label>
            <input
              type="email"
              className="input input-bordered w-full p-3 border border-[#A31D1D] rounded-md bg-[#6D2323] text-white placeholder-gray-300"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
            />

            {/* Save Button */}
            <button
              type="submit"
              className="w-full bg-[#A31D1D] text-white py-3 mt-4 rounded-lg font-semibold hover:bg-[#6D2323] transition"
            >
              บันทึกข้อมูล
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
