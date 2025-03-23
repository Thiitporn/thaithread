import React, { useState, useEffect } from "react";
import {
  SearchOutlined,
  CaretRightOutlined,
  BarsOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../services/apiService";
import Navbar from "../components/Navbar";
import ProductDetail from "./ProductDetail";

const Products = () => {
  const navigate = useNavigate(); // ใช้ navigate สำหรับการเปลี่ยนหน้า
  const [selectedCategory, setSelectedCategory] = useState("สินค้าทั้งหมด"); // เลือกหมวดหมู่สินค้า
  const [searchQuery, setSearchQuery] = useState(""); // ค่าของคำค้นหา
  const [products, setProducts] = useState([]); // สำหรับเก็บข้อมูลสินค้า
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // หมวดหมู่สินค้าต่างๆ
  const categories = ["สินค้าทั้งหมด"];

  // Fetch products on page load
  useEffect(() => {
    fetchProducts();
  }, []);

  // ฟังก์ชันสำหรับดึงข้อมูลสินค้า
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getAllProducts(); // Call to getAllProducts function from apiService
      console.log(data);

      setProducts(data);
    } catch (err) {
      setError("❌ ไม่สามารถโหลดสินค้าได้");
    }
    setLoading(false);
  };

  // กรองสินค้าตามหมวดหมู่ที่เลือก
  const filteredProducts =
    selectedCategory === "สินค้าทั้งหมด"
      ? products // ถ้าเลือก "สินค้าทั้งหมด" ให้แสดงสินค้าทุกชิ้น
      : products.filter((product) => product.category === selectedCategory); // ถ้าเลือกหมวดหมู่อื่นๆ กรองตามหมวดหมู่นั้น

  // ฟังก์ชันการค้นหาสินค้า
  const searchedProducts = filteredProducts.filter(
    (product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()) // กรองสินค้าโดยการเปรียบเทียบชื่อ
  );

  // Pagination: จำนวนสินค้าที่จะแสดงในแต่ละหน้า
  const itemsPerPage = 5 * 6; // 5 คอลัมน์ x 6 แถว
  const [currentPage, setCurrentPage] = useState(1); // หน้าที่กำลังแสดง
  const totalPages = Math.ceil(searchedProducts.length / itemsPerPage); // จำนวนทั้งหมดของหน้า
  const displayedProducts = searchedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  ); // แสดงสินค้าตามหน้าปัจจุบัน

  // ฟังก์ชันสำหรับการเลือกแบบสินค้า (การไปที่หน้ารายละเอียดสินค้า)
  const goToProductDetail = (product) => {
    // Using product.id in the URL to navigate to the product details page
    navigate(`/product-detail/${product._id}`);
  };

  return (
    <>
      <Navbar />
      <div className="p-6">
        {/* ช่องค้นหาสินค้า */}
        <div className="w-full flex justify-end mb-4">
          <div className="relative flex items-center w-full max-w-xs">
            <SearchOutlined className="absolute left-4 text-md text-[#A31D1D]" />
            <input
              type="text"
              placeholder="ค้นหาสินค้า"
              className="w-full h-[2.5rem] bg-gray-100 text-gray-700 placeholder-gray-700 pl-12 pr-4 py-2 rounded-full 
                        border border-[#A31D1D] focus:outline-none focus:ring-2 focus:ring-[#A31D1D] focus:border-[#A31D1D] 
                        shadow-md transition"
              value={searchQuery} // ค่าในช่องค้นหาจะถูกเก็บใน state นี้
              onChange={(e) => setSearchQuery(e.target.value)} // เมื่อพิมพ์ในช่องค้นหาให้เก็บค่าลงใน state
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          {/* เมนูหมวดหมู่สินค้า */}
          <div className="w-full md:w-1/6">
            <ul className="menu bg-gradient-to-b from-[#6D2323] to-[#A31D1D] rounded-box w-full text-[#FEF9E1]">
              <div className="menu-title text-[#FEF9E1] flex items-center gap-2">
                <BarsOutlined /> หมวดหมู่
              </div>
              {categories.map((category) => (
                <span
                  key={category}
                  onClick={() => setSelectedCategory(category)} // เปลี่ยนหมวดหมู่เมื่อคลิก
                  className={`cursor-pointer flex items-center gap-2 px-6 py-2 transition ${
                    selectedCategory === category
                      ? "bg-[#E5D0AC] text-[#6D2323]"
                      : "hover:bg-[#E5D0AC]"
                  }`}
                >
                  {selectedCategory === category && (
                    <CaretRightOutlined className="text-[#6D2323]" />
                  )}
                  {category}
                </span>
              ))}
            </ul>
          </div>

          {/* แสดงรายการสินค้าใน Grid */}
          <div className="w-full md:w-5/6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {loading ? (
                <p>⏳ กำลังโหลดสินค้า...</p>
              ) : (
                displayedProducts.map((product, index) => (
                  <div
                    key={index}
                    className="card border border-[#A31D1D] bg-white rounded-lg shadow-md p-3 transition hover:shadow-lg"
                  >
                    <figure className="w-full h-[180px] flex justify-center items-center bg-gray-200 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </figure>

                    <div className="text-center mt-2">
                      <h2 className="text-sm font-bold text-[#6D2323]">
                        {product.name}
                      </h2>
                      <p className="text-xs text-gray-500">
                        {product.description}
                      </p>
                      <p className="text-md font-bold text-[#A31D1D]">
                        {product.price}
                      </p>

                      {/* ปุ่มเลือกแบบสินค้า (ไปที่หน้ารายละเอียดสินค้า) */}
                      <div className="mt-2">
                        <button
                          className="btn btn-sm w-full border-2 border-[#A31D1D] text-[#A31D1D] bg-[#FEF9E1] 
      hover:bg-[#A31D1D] hover:text-white transition"
                          onClick={() => goToProductDetail(product)} // Passing the entire product object
                        >
                          ดูรายละเอียด
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6">
              <div className="join">
                <button
                  className={`join-item btn ${
                    currentPage === 1 ? "btn-disabled" : ""
                  }`}
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                >
                  ❮
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    className={`join-item btn ${
                      currentPage === i + 1 ? "bg-[#A31D1D] text-white" : ""
                    }`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  className={`join-item btn ${
                    currentPage === totalPages ? "btn-disabled" : ""
                  }`}
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                >
                  ❯
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
