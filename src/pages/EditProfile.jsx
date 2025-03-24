import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  findUserById,
  updateProfile,
  getUserOrders,
} from "../services/apiService"; // Assuming API functions are in apiService
import Navbar from "../components/Navbar";

const EditProfile = () => {
  const navigate = useNavigate();

  // State variables for user data (without phone)
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  // State variables for orders
  const [orders, setOrders] = useState([]);

  // Error and success state
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch user information based on userId in localStorage
  useEffect(() => {
    const userId = localStorage.getItem("userId"); // Retrieve userId from localStorage
    if (userId) {
      const fetchUserData = async () => {
        try {
          // Fetch user details
          const response = await findUserById(userId);
          setUser({
            name: response.name,
            email: response.email,
          });

          // Fetch user orders
          const ordersResponse = await getUserOrders(userId);
          setOrders(ordersResponse); // Set user orders
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

      // Call the API to update the profile (without phone)
      await updateProfile(userId, user.name, user.email);
      localStorage.setItem("user", user.name);
      setSuccess("บันทึกข้อมูลสำเร็จ!");

      setTimeout(() => navigate("/edit-profile"), 2000);
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

          {/* Display User's Orders */}
          <div className="mt-6">
            <h2 className="text-xl font-bold text-[#6D2323]">
              คำสั่งซื้อของคุณ
            </h2>
            {orders.length === 0 ? (
              <p className="text-center text-gray-600">ยังไม่มีคำสั่งซื้อ</p>
            ) : (
              <ul className="mt-4">
                {orders.map((order) => (
                  <li
                    key={order.id}
                    className="p-3 mb-2 bg-[#FFF1E0] rounded-md shadow-md"
                  >
                    <p className="text-[#6D2323] font-semibold">
                      หมายเลขคำสั่งซื้อ: {order.orderNumber}
                    </p>
                    <p className="text-gray-700">
                      วันที่สั่งซื้อ: {order.date}
                    </p>
                    <p className="text-gray-700">สถานะ: {order.status}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
