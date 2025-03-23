import React, { useState, useEffect } from "react";
import {
  DeleteOutlined,
  BarChartOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  getAllUsers,
  getOrder,
  getAllProducts, // Import the getAllProducts API function
  deleteUser,
  deleteProduct,
} from "../../services/apiService"; // Import necessary API functions
import Navbar from "../../components/Navbar";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]); // Store orders fetched from the API
  const [products, setProducts] = useState([]); // Store products fetched from the API

  //iF IN ROLE IN LOCALSTORAGE ADMIN TO GO TO ADMIN PANEL BUT NO ADMIN TO GO TO /

  // Fetch users, products, and orders on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getAllUsers(); // Fetch all users
        setUsers(usersData);

        const ordersData = await getOrder(); // Fetch all orders
        setOrders(ordersData);

        const productsData = await getAllProducts(); // Fetch all products
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // ✅ ลบผู้ใช้
  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id); // Call the deleteUser API function
      setUsers(users.filter((user) => user.id !== id)); // Update local state
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // ✅ ลบสินค้า
  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id); // Call the deleteProduct API function
      setProducts(products.filter((product) => product.id !== id)); // Update local state
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="p-8">
        <h1 className="text-3xl font-bold text-[#6D2323]">
          ⚙️ ระบบจัดการเว็บไซต์ (Admin)
        </h1>

        {/* ✅ ดูรายชื่อสมาชิก */}
        <div className="bg-[#E5D0AC] p-6 mt-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-[#6D2323]">
            <UserOutlined /> รายชื่อสมาชิก
          </h2>
          {users.length === 0 ? (
            <p className="text-gray-500">ไม่มีสมาชิก</p>
          ) : (
            <ul className="mt-4">
              {users.map((user) => (
                <li
                  key={user.id}
                  className="flex justify-between bg-white p-3 rounded-md shadow-sm mt-2"
                >
                  <span>
                    {user.name} - {user.email} ({user.role})
                  </span>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    <DeleteOutlined />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ✅ ดูคำสั่งซื้อ (Without Delete Functionality) */}
        <div className="bg-[#E5D0AC] p-6 mt-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-[#6D2323]">
            <ShoppingCartOutlined /> คำสั่งซื้อ
          </h2>
          {orders.length === 0 ? (
            <p className="text-gray-500">ไม่มีคำสั่งซื้อ</p>
          ) : (
            <ul className="mt-4">
              {orders.map((order) => (
                <li
                  key={order.id}
                  className="flex justify-between bg-white p-3 rounded-md shadow-sm mt-2"
                >
                  <span>
                    คำสั่งซื้อ #{order._id} - {order.customer} (฿
                    {order.totalPrice}) [{order.status}]
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ✅ จัดการสินค้า */}
        <div className="bg-[#E5D0AC] p-6 mt-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-[#6D2323]">
            <BarChartOutlined /> จัดการสินค้า
          </h2>
          {products.length === 0 ? (
            <p className="text-gray-500">ไม่มีสินค้า</p>
          ) : (
            <div className="grid grid-cols-2 gap-4 mt-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="border p-4 rounded-lg shadow-md bg-white"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <h3 className="text-lg font-bold mt-2">{product.name}</h3>
                  <p className="text-[#A31D1D] font-semibold">
                    ฿{product.price}
                  </p>
                  <p className="text-gray-600">สต็อก: {product.stock} ชิ้น</p>
                  <button
                    className="w-full mt-2 bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    <DeleteOutlined /> ลบสินค้า
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
