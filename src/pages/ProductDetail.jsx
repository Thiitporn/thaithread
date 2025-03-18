import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ShoppingCartOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { CartContext, UserContext } from "../App";  

const ProductDetail = () => {
    const { id } = useParams();
    const { cart, setCart } = useContext(CartContext);
    const { user } = useContext(UserContext); // ✅ ตรวจสอบว่าผู้ใช้ล็อกอินหรือไม่

    const [quantity, setQuantity] = useState(1);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const product = {
        id: id,
        name: "กางเกงขาบานผ้าพิมพ์ทอง",
        description: "ผ้าพิมพ์ทอง ผ้าคุณภาพสูง ใส่สบาย ไม่ระคายเคือง",
        price: 159,
        options: [
            { id: "01", image: "/src/assets/option01.jpg", stock: 50 },
            { id: "02", image: "/src/assets/option02.jpg", stock: 30 },
            { id: "03", image: "/src/assets/option03.jpg", stock: 20 },
        ],
    };

    useEffect(() => {
        if (product.options.length > 0) {
            setSelectedOption(product.options[0]);
        }
    }, []);

    const stockAvailable = selectedOption ? selectedOption.stock : 0;

    const increaseQuantity = () => {
        if (quantity < stockAvailable) {
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

    const addToCart = () => {
        if (!user) {
            showModalPopup("กรุณาเข้าสู่ระบบก่อนเพิ่มสินค้าในตะกร้า !");
            return;
        }

        if (!selectedOption) {
            showModalPopup("กรุณาเลือกตัวเลือกสินค้าก่อน !");
            return;
        }

        if (quantity > stockAvailable) {
            showModalPopup("สินค้าไม่เพียงพอ !");
            return;
        }

        product.options = product.options.map(option =>
            option.id === selectedOption.id ? { ...option, stock: option.stock - quantity } : option
        );

        const existingItem = cart.find(item => item.id === product.id && item.optionId === selectedOption.id);
        if (existingItem) {
            setCart(cart.map(item => item.id === product.id && item.optionId === selectedOption.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ));
        } else {
            setCart([...cart, { ...product, optionId: selectedOption.id, quantity, stock: stockAvailable - quantity }]);
        }

        showModalPopup(` เพิ่มสินค้า ${product.name} (ตัวเลือก ${selectedOption.id}) x${quantity} ลงในตะกร้าแล้ว !`);
    };

    return (
        <div className="p-8 flex flex-col md:flex-row gap-12 items-center justify-center">
            <div className="w-full md:w-1/2 flex flex-col items-center">
                <img src={selectedOption ? selectedOption.image : ""} 
                    alt={product.name} 
                    className="w-80 md:w-96 object-cover rounded-lg shadow-lg border border-gray-300" 
                />
            </div>

            <div className="w-full md:w-1/2 flex flex-col">
                <h1 className="text-2xl font-bold text-[#6D2323]">{product.name}</h1>
                <p className="text-gray-600 mt-2">{product.description}</p>
                <p className="text-3xl font-bold text-[#A31D1D] mt-4">฿{product.price}</p>

                <div className="mt-4">
                    <h3 className="font-semibold text-gray-700">เลือกสินค้า :</h3>
                    <div className="grid grid-cols-4 gap-2 mt-2">
                        {product.options.map((option) => (
                            <div 
                                key={option.id} 
                                className={`border-2 bg-white rounded-md p-1 cursor-pointer transition duration-300 hover:shadow-md 
                                    ${selectedOption && selectedOption.id === option.id ? 'border-[#A31D1D] shadow-lg' : 'border-gray-300'}`}
                                onClick={() => setSelectedOption(option)}
                            >
                                <img src={option.image} alt={option.id} className="w-12 h-12 object-cover rounded-md mx-auto" />
                                <p className="text-center text-xs font-bold mt-1 text-[#6D2323]">{option.id}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-6 flex items-center gap-4">
                    <h3 className="font-semibold text-gray-700">จำนวน :</h3>
                    <div className="flex items-center border-2 border-gray-300 rounded-lg">
                        <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 transition rounded-l-lg" onClick={decreaseQuantity}>
                            <MinusOutlined />
                        </button>
                        <span className="px-6 text-lg font-bold text-black">{quantity}</span>
                        <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 transition rounded-r-lg" onClick={increaseQuantity}>
                            <PlusOutlined />
                        </button>
                    </div>
                    <span className="text-gray-700 text-sm ml-2">มีสินค้าทั้งหมด {stockAvailable} ชิ้น</span>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                    <button 
                        onClick={addToCart} 
                        disabled={!user} 
                        className={`w-full py-3 text-white text-lg font-semibold rounded-lg flex items-center justify-center gap-2 transition shadow-md
                            ${user ? 'bg-[#28A745] hover:bg-[#218838]' : 'bg-gray-400 cursor-not-allowed'}`}
                    >
                        <ShoppingCartOutlined />
                        เพิ่มลงตะกร้า
                    </button>

                    {!user && (
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
    );
};

export default ProductDetail;
