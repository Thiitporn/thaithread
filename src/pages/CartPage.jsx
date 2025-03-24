import React, { useContext, useState } from "react";
import { CartContext, UserContext } from "../App";
import {
  DeleteOutlined,
  PlusOutlined,
  MinusOutlined,
  UploadOutlined,
  CreditCardOutlined,
  CopyOutlined,
  ShoppingCartOutlined,
  StopOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  CloseCircleOutlined,
  InboxOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { removeItemFromCart, placeOrder, validateSlip } from "../services/apiService"; // Add API function
import { message } from "antd"; // To show notifications

const CartPage = () => {
  const { cart, setCart } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const [slipFile, setSlipFile] = useState(null);
  const [error, setError] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [fileError, setFileError] = useState("");
  const [isValidatingSlip, setIsValidatingSlip] = useState(false);
  const navigate = useNavigate();

  // ข้อมูลบัญชีธนาคาร
  const ownerBankDetails = {
    bankName: "ธนาคารกสิกรไทย (KBank)",
    accountNumber: "067-395003-5",
    accountName: "ฐิติพร กัณหอัครพันธ์",
  };

  // ฟังก์ชันสำหรับคัดลอกเลขบัญชี
  const copyAccountNumber = () => {
    navigator.clipboard
      .writeText(ownerBankDetails.accountNumber)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000); // ซ่อนข้อความหลังจาก 2 วินาที
      })
      .catch((err) => console.error("คัดลอกล้มเหลว", err));
  };

  // เพิ่มจำนวนสินค้าในตะกร้า
  const increaseQuantity = (id) => {
    console.log("Increase quantity of item with ID:", id);
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity:
                item.quantity < item.stock ? item.quantity + 1 : item.quantity,
            }
          : item
      )
    );
  };

  // ลดจำนวนสินค้าในตะกร้า
  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item._id === id
            ? { ...item, quantity: Math.max(0, item.quantity - 1) }
            : item
        )
        .filter((item) => item.quantity > 0) // ลบรายการที่มีจำนวน = 0
    );
  };

  // ลบสินค้าออกจากตะกร้า
  const removeFromCart = async (id) => {
    try {
      // ลบสินค้าออกจากตะกร้า (local state)
      const updatedCart = cart.filter((item) => item._id !== id);
      setCart(updatedCart);

      const userId = localStorage.getItem("userId");
      await removeItemFromCart(userId, id);
    } catch (error) {
      setError(
        <span>
          <StopOutlined /> ไม่สามารถลบสินค้าจากตะกร้าได้ <StopOutlined />
        </span>
      );
    }
  };

  // คำนวณยอดรวมทั้งหมด
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const userid = localStorage.getItem("userId");

  const validateFile = (file) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      setFileError(<span><CloseCircleOutlined /> กรุณาอัพโหลดไฟล์รูปภาพ (JPG, PNG เท่านั้น)</span>);
      return false;
    }

    if (file.size > maxSize) {
      setFileError(<span><CloseCircleOutlined /> ขนาดไฟล์ต้องไม่เกิน 5MB</span>);
      return false;
    }

    return true;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileError("");
    
    if (file && validateFile(file)) {
      setSlipFile(file);
      message.success({
        content: "อัพโหลดสลิปสำเร็จ",
        icon: <CheckCircleOutlined />
      });
    } else {
      e.target.value = null;
      setSlipFile(null);
    }
  };

  // จัดการการชำระเงิน (สร้างคำสั่งซื้อ)
  const handleCheckout = async () => {
    if (!slipFile) {
      setError(<span><WarningOutlined /> กรุณาแนบหลักฐานการชำระเงิน</span>);
      return;
    }

    try {
      setIsValidatingSlip(true);
      setError("");  // ลบข้อความ error ออก

      // เรียกใช้ validateSlip เพื่อตรวจสอบสลิปการชำระเงิน
      const slipValidationResponse = await validateSlip(slipFile); // เรียกใช้งาน validateSlip

      // ถ้าสลิปถูกต้อง
      if (slipValidationResponse.status === "valid") {
        // ส่งคำสั่งซื้อ
        const response = await placeOrder(userid, totalAmount, slipFile, cart);

        if (response.message === "Order placed successfully") {
          setCart([]); // ล้างตะกร้า
          // แสดงข้อความสำเร็จ
          setError(
            <p className="text-green-600">
              <CheckCircleOutlined className="text-green-600" /> ชำระเงินเสร็จสิ้น
            </p>
          );
          setTimeout(() => {
            navigate('/order-history');
          }, 3000);
        }
      } else {
        setError(<span><WarningOutlined /> สลิปการชำระเงินไม่ถูกต้อง</span>);
      }
    } catch (error) {
      // กรณีเกิดข้อผิดพลาด
      setError(
        <span><StopOutlined /> ไม่สามารถยืนยันการชำระเงินได้</span>
      );
    } finally {
      setIsValidatingSlip(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="p-8">
        <h1 className="text-2xl font-bold text-[#6D2323]">
          <ShoppingCartOutlined /> ตะกร้าสินค้า
        </h1>

        {cart.length === 0 ? (
          <p className="text-gray-500 mt-4">
            <InboxOutlined /> ไม่มีสินค้าในตะกร้า
          </p>
        ) : (
          <>
            <div className="mt-6 flex flex-col gap-4">
              {cart.map((item) => (
                <div
                  key={item._id}  // ใช้ item.id เพื่อเป็น key เฉพาะของแต่ละรายการสินค้า
                  className="flex items-center justify-between border-b py-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md border border-gray-300"
                  />

                  <div className="flex-1 ml-4">
                    <h2 className="font-semibold text-lg text-black">
                      {item.name}
                    </h2>
                    <p className="text-lg font-bold text-[#A31D1D]">
                      ฿{item.price}
                    </p>
                    <p className="text-sm text-black">
                      สินค้าคงเหลือ :{" "}
                      <span className="font-bold">{item.stock} ชิ้น</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      className="px-2 py-1 bg-gray-200 hover:bg-gray-300 transition rounded-lg"
                      onClick={() => decreaseQuantity(item._id)} // ใช้ item.id
                    >
                      <MinusOutlined />
                    </button>
                    <span className="text-lg font-bold text-black">
                      {item.quantity}
                    </span>
                    <button
                      className={`px-2 py-1 transition rounded-lg ${item.quantity >= item.stock
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-gray-200 hover:bg-gray-300"
                        }`}
                      onClick={() => increaseQuantity(item._id)} // ใช้ item.id
                      disabled={item.quantity >= item.stock}
                    >
                      <PlusOutlined />
                    </button>
                  </div>

                  <button
                    className="text-red-600 hover:text-red-800 ml-4"
                    onClick={() => removeFromCart(item._id)} // ใช้ item.id
                  >
                    <DeleteOutlined />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-[#E5D0AC] p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-[#6D2323]">
                <CreditCardOutlined /> ข้อมูลการชำระเงิน
              </h2>
              <p className="text-lg font-bold text-[#A31D1D] mt-2">
                ยอดรวม : ฿{totalAmount}
              </p>

              <div className="mt-4 bg-white p-4 rounded-lg border border-gray-400">
                <p className="text-black font-semibold">โอนเงินเข้าบัญชี :</p>
                <p className="text-gray-600">{ownerBankDetails.bankName}</p>
                <div className="flex items-center gap-2">
                  <p className="text-xl font-bold text-[#6D2323]">
                    {ownerBankDetails.accountNumber}
                  </p>
                  <button
                    className="px-3 py-1 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition"
                    onClick={copyAccountNumber}
                  >
                    <CopyOutlined /> คัดลอก
                  </button>
                </div>
                {copySuccess && (
                  <p className="text-sm text-green-600 mt-1">
                    <CheckCircleOutlined /> คัดลอกสำเร็จ!
                  </p>
                )}
                <p className="text-gray-700">
                  ชื่อบัญชี : {ownerBankDetails.accountName}
                </p>
                <div className="mt-4">
                  <p className="text-gray-700 mb-2">แนบหลักฐานการชำระเงิน</p>
                  <input
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={handleFileChange}
                    className="w-full"
                  />
                  {fileError && (
                    <p className="text-red-500 text-sm mt-1">
                      {fileError}
                    </p>
                  )}
                  {slipFile && (
                    <p className="text-green-500 text-sm mt-1">
                      <CheckCircleOutlined /> อัพโหลดไฟล์: {slipFile.name}
                    </p>
                  )}
                </div>
              </div>

              {isValidatingSlip ? (
                <button
                  className="mt-4 bg-gray-400 text-white py-3 rounded-lg font-semibold transition w-full"
                  disabled
                >
                  <LoadingOutlined /> กำลังตรวจสอบ...
                </button>
              ) : (
                <button
                  className="mt-4 bg-green-600 hover:bg-green-800 text-white py-3 rounded-lg font-semibold transition w-full"
                  onClick={handleCheckout}
                >
                  ยืนยันการชำระเงิน
                </button>
              )}

              {error && (
                <p className="mt-2 text-center">{error}</p>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartPage;
