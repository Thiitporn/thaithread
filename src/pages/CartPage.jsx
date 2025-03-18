import React, { useContext, useState } from "react";
import { CartContext, UserContext } from "../App";
import { DeleteOutlined, PlusOutlined, MinusOutlined, UploadOutlined, CreditCardOutlined, CopyOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
    const { cart, setCart } = useContext(CartContext);
    const { user } = useContext(UserContext);
    const [slipFile, setSlipFile] = useState(null);
    const [error, setError] = useState("");
    const [copySuccess, setCopySuccess] = useState(false);
    const navigate = useNavigate();

    // ✅ ข้อมูลบัญชีธนาคารของเจ้าของร้าน
    const ownerBankDetails = {
        bankName: "ธนาคารกสิกรไทย (KBank)",
        accountNumber: "067-395003-5",
        accountName: "ฐิติพร กัณหอัครพันธ์"
    };

    // ✅ ฟังก์ชันคัดลอกเลขบัญชี
    const copyAccountNumber = () => {
        navigator.clipboard.writeText(ownerBankDetails.accountNumber)
            .then(() => {
                setCopySuccess(true);
                setTimeout(() => setCopySuccess(false), 2000); // ซ่อนข้อความหลัง 2 วินาที
            })
            .catch(err => console.error("คัดลอกล้มเหลว", err));
    };

    // ✅ ฟังก์ชันเพิ่มสินค้าในตะกร้า (ต้องไม่เกินจำนวนที่มีอยู่)
    const increaseQuantity = (id, optionId) => {
        setCart(cart.map(item =>
            item.id === id && item.optionId === optionId
                ? { ...item, quantity: item.quantity < item.stock ? item.quantity + 1 : item.quantity }
                : item
        ));
    };

    // ✅ ฟังก์ชันลดสินค้าในตะกร้า
    const decreaseQuantity = (id, optionId) => {
        setCart(cart.map(item =>
            item.id === id && item.optionId === optionId
                ? { ...item, quantity: Math.max(0, item.quantity - 1) }
                : item
        ).filter(item => item.quantity > 0)); // ลบสินค้าที่มีจำนวน = 0
    };

    // ✅ ฟังก์ชันลบสินค้าออกจากตะกร้า
    const removeFromCart = (id, optionId) => {
        setCart(cart.filter(item => !(item.id === id && item.optionId === optionId)));
    };

    // ✅ คำนวณยอดรวม
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold text-[#6D2323]"><ShoppingCartOutlined /> ตะกร้าสินค้า</h1>

            {cart.length === 0 ? (
                <p className="text-gray-500 mt-4">ไม่มีสินค้าในตะกร้า</p>
            ) : (
                <>
                    {/* ✅ แสดงรายการสินค้า */}
                    <div className="mt-6 flex flex-col gap-4">
                        {cart.map((item) => (
                            <div key={`${item.id}-${item.optionId}`} className="flex items-center justify-between border-b py-4">
                                {/* ✅ รูปสินค้า */}
                                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md border border-gray-300" />

                                {/* ✅ รายละเอียดสินค้า */}
                                <div className="flex-1 ml-4">
                                    <h2 className="font-semibold text-lg text-black">{item.name}</h2>
                                    <p className="text-sm text-black">ตัวเลือก : <span className="font-bold text-[#A31D1D]">{item.optionId}</span></p>
                                    <p className="text-lg font-bold text-[#A31D1D]">฿{item.price}</p>
                                    <p className="text-sm text-black">สินค้าคงเหลือ : <span className="font-bold">{item.stock} ชิ้น</span></p>
                                </div>

                                {/* ✅ ปุ่มเพิ่ม/ลดจำนวนสินค้า */}
                                <div className="flex items-center gap-2">
                                    <button className="px-2 py-1 bg-gray-200 hover:bg-gray-300 transition rounded-lg"
                                        onClick={() => decreaseQuantity(item.id, item.optionId)}>
                                        <MinusOutlined />
                                    </button>
                                    <span className="text-lg font-bold text-black">{item.quantity}</span>
                                    <button 
                                        className={`px-2 py-1 transition rounded-lg ${item.quantity >= item.stock ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'}`}
                                        onClick={() => increaseQuantity(item.id, item.optionId)}
                                        disabled={item.quantity >= item.stock}
                                    >
                                        <PlusOutlined />
                                    </button>
                                </div>

                                {/* ✅ ปุ่มลบสินค้า */}
                                <button className="text-red-600 hover:text-red-800 ml-4" 
                                    onClick={() => removeFromCart(item.id, item.optionId)}>
                                    <DeleteOutlined />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* ✅ ส่วนการชำระเงิน */}
                    <div className="mt-6 bg-[#E5D0AC] p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold text-[#6D2323]"><CreditCardOutlined /> ข้อมูลการชำระเงิน</h2>
                        <p className="text-lg font-bold text-[#A31D1D] mt-2">ยอดรวม : ฿{totalAmount}</p>

                        {/* ✅ ข้อมูลบัญชีธนาคาร */}
                        <div className="mt-4 bg-white p-4 rounded-lg border border-gray-400">
                            <p className="text-black font-semibold">โอนเงินเข้าบัญชี :</p>
                            <p className="text-gray-600">{ownerBankDetails.bankName}</p>
                            <div className="flex items-center gap-2">
                                <p className="text-xl font-bold text-[#6D2323]">{ownerBankDetails.accountNumber}</p>
                                <button 
                                    className="px-3 py-1 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition"
                                    onClick={copyAccountNumber}
                                >
                                    <CopyOutlined /> คัดลอก
                                </button>
                            </div>
                            {copySuccess && <p className="text-sm text-green-600 mt-1">✅ คัดลอกสำเร็จ!</p>}
                            <p className="text-gray-700">ชื่อบัญชี : {ownerBankDetails.accountName}</p>
                        </div>

                        {/* ✅ อัพโหลดสลิป */}
                        <div className="mt-4 bg-gray-200 p-4 rounded-lg border border-gray-400">
                            <p className="text-black text-l font-bold text-center">อัพโหลดสลิปโอนเงินของคุณ </p>
                            <label className="cursor-pointer flex flex-col items-center justify-center mt-2 p-4 border-2 border-dashed border-[#A31D1D] bg-white rounded-lg hover:bg-gray-100">
                                <UploadOutlined className="text-4xl text-[#A31D1D]" />
                                <span className="text-sm text-gray-600 mt-2">คลิกเพื่ออัพโหลดไฟล์</span>
                                <input type="file" className="hidden" accept="image/png, image/jpeg, image/jpg" />
                            </label>
                        </div>

                        <button className="mt-4 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition w-full">
                            ยืนยันการชำระเงิน
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;
