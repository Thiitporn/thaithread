import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ShoppingCartOutlined,
  PlusOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import { CartContext, UserContext } from "../App";
import Navbar from "../components/Navbar";
import { getProductById, addItemToCart } from "../services/apiService"; // Adjust API call
import PropTypes from "prop-types";

const ProductDetail = () => {
  const { id } = useParams(); // Get id from URL using useParams
  const { cart, setCart } = useContext(CartContext);

  const navigate = useNavigate(); // For navigation after adding to cart

  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null); // Removed selectedOption
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch product details based on the id from the URL
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await getProductById(id); // Fetch product details by ID
        setProduct(data);
      } catch (err) {
        setError("❌ ไม่สามารถโหลดข้อมูลสินค้าได้");
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const showModalPopup = (message) => {
    setModalMessage(message);
    setShowModal(true);
    setTimeout(() => setShowModal(false), 3000);
  };

  const userid = localStorage.getItem("userId");

  const addToCart = async () => {
    if (!userid) {
      showModalPopup("กรุณาเข้าสู่ระบบก่อนเพิ่มสินค้าในตะกร้า !");
      return;
    }

    if (quantity > product.stock) {
      showModalPopup("สินค้าไม่เพียงพอ !");
      return;
    }

    // Update local cart
    const existingItem = cart.find((item) => item.id === product._id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity,
          stock: product.stock - quantity,
        },
      ]);
    }

    // Add item to cart in the backend
    try {
      await addItemToCart(userid, id, quantity); // Ensure the API endpoint is correct
      showModalPopup(
        `เพิ่มสินค้า ${product.name} x${quantity} ลงในตะกร้าแล้ว !`
      );

      // Navigate to CartPage
      navigate("/cart");
    } catch (error) {
      showModalPopup("เกิดข้อผิดพลาดในการเพิ่มสินค้าในตะกร้า");
    }
  };

  if (loading) return <p>⏳ กำลังโหลดข้อมูลสินค้า...</p>;

  if (error) return <p>{error}</p>;

  if (!product) return null;

  return (
    <>
      <Navbar />
      <div className="p-8 flex flex-col md:flex-row gap-12 items-center justify-center">
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-80 md:w-96 object-cover rounded-lg shadow-lg border border-gray-300"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col">
          <h1 className="text-2xl font-bold text-[#6D2323]">{product.name}</h1>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="text-3xl font-bold text-[#A31D1D] mt-4">
            ฿{product.price}
          </p>

          <div className="mt-6 flex items-center gap-4">
            <h3 className="font-semibold text-gray-700">จำนวน :</h3>
            <div className="flex items-center border-2 border-gray-300 rounded-lg">
              <button
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 transition rounded-l-lg"
                onClick={decreaseQuantity}
              >
                <MinusOutlined />
              </button>
              <span className="px-6 text-lg font-bold text-black">
                {quantity}
              </span>
              <button
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 transition rounded-r-lg"
                onClick={increaseQuantity}
              >
                <PlusOutlined />
              </button>
            </div>
            <span className="text-gray-700 text-sm ml-2">
              มีสินค้าทั้งหมด {product.stock} ชิ้น
            </span>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <button
              onClick={addToCart}
              disabled={!userid}
              className={`w-full py-3 text-white text-lg font-semibold rounded-lg flex items-center justify-center gap-2 transition shadow-md
                            ${
                              userid
                                ? "bg-[#28A745] hover:bg-[#218838]"
                                : "bg-gray-400 cursor-not-allowed"
                            }`}
            >
              <ShoppingCartOutlined />
              เพิ่มลงตะกร้า
            </button>

            {!userid && (
              <p className="text-center text-red-600 mt-2 text-sm">
                กรุณาเข้าสู่ระบบเพื่อเพิ่มสินค้าในตะกร้า
              </p>
            )}
          </div>
        </div>

        {showModal && (
          <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 shadow-lg rounded-lg p-4 flex items-center gap-3">
            <ShoppingCartOutlined className="text-green-600 text-xl" />
            <span className="text-black font-semibold">{modalMessage}</span>
          </div>
        )}
      </div>
    </>
  );
};

ProductDetail.propTypes = {
  id: PropTypes.string, // Removed the prop validation as the id is now retrieved from URL
};

export default ProductDetail;
