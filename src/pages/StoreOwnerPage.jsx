import React, { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";

// หน้าจัดการสินค้า (เจ้าของร้าน)
const StoreOwnerPage = () => {
    const [products, setProducts] = useState([]);

    // ✅ ฟอร์มเพิ่มสินค้าใหม่
    const [newProduct, setNewProduct] = useState({
        name: "",
        description: "",
        price: "",
        image: "",
        options: []
    });

    // ✅ ฟอร์มเพิ่มตัวเลือกสินค้าใหม่
    const [newOption, setNewOption] = useState({ id: "", name: "", stock: "", image: "" });

    // ✅ ฟังก์ชันเพิ่มตัวเลือกสินค้าใหม่
    const addOption = () => {
        if (!newOption.id || !newOption.name || !newOption.stock || !newOption.image) {
            alert("กรุณากรอกข้อมูลตัวเลือกสินค้าให้ครบ!");
            return;
        }
        setNewProduct({ 
            ...newProduct, 
            options: [...newProduct.options, { ...newOption, stock: Number(newOption.stock) }]
        });
        setNewOption({ id: "", name: "", stock: "", image: "" });
    };

    // ✅ ฟังก์ชันเพิ่มสินค้า
    const addProduct = (e) => {
        e.preventDefault();
        if (!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.image || newProduct.options.length === 0) {
            alert("กรุณากรอกข้อมูลให้ครบทุกช่องและเพิ่มตัวเลือกสินค้า!");
            return;
        }

        const newId = products.length ? products[products.length - 1].id + 1 : 1;
        setProducts([...products, { ...newProduct, id: newId, price: Number(newProduct.price) }]);

        // รีเซ็ตฟอร์ม
        setNewProduct({ name: "", description: "", price: "", image: "", options: [] });
    };

    // ✅ ฟังก์ชันลบสินค้า
    const deleteProduct = (id) => {
        setProducts(products.filter(product => product.id !== id));
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-[#6D2323]">📦 จัดการสินค้า (เจ้าของร้าน)</h1>

            {/* ✅ ฟอร์มเพิ่มสินค้า */}
            <div className="bg-[#E5D0AC] p-6 mt-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-[#6D2323] mb-4">เพิ่มสินค้าใหม่</h2>
                <form onSubmit={addProduct} className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="ชื่อสินค้า" className="p-3 border border-[#A31D1D] rounded-md bg-[#6D2323] text-white placeholder-gray-300"
                        value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} required />
                    <input type="text" placeholder="รายละเอียดสินค้า" className="p-3 border border-[#A31D1D] rounded-md bg-[#6D2323] text-white placeholder-gray-300"
                        value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} required />
                    <input type="number" placeholder="ราคา (฿)" className="p-3 border border-[#A31D1D] rounded-md bg-[#6D2323] text-white placeholder-gray-300"
                        value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} required />
                    <input type="text" placeholder="URL รูปสินค้า" className="p-3 border border-[#A31D1D] rounded-md bg-[#6D2323] text-white placeholder-gray-300"
                        value={newProduct.image} onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} required />
                </form>

                {/* ✅ ฟอร์มเพิ่มตัวเลือกสินค้า */}
                <h3 className="text-lg font-bold text-[#6D2323] mt-4">ตัวเลือกสินค้า</h3>
                <div className="grid grid-cols-4 gap-2">
                    <input type="text" placeholder="รหัสตัวเลือก" className="p-2 border border-[#A31D1D] rounded-md bg-[#6D2323] text-white placeholder-gray-300"
                        value={newOption.id} onChange={(e) => setNewOption({ ...newOption, id: e.target.value })} required />
                    <input type="text" placeholder="ชื่อสี/ประเภท" className="p-2 border border-[#A31D1D] rounded-md bg-[#6D2323] text-white placeholder-gray-300"
                        value={newOption.name} onChange={(e) => setNewOption({ ...newOption, name: e.target.value })} required />
                    <input type="number" placeholder="จำนวน (Stock)" className="p-2 border border-[#A31D1D] rounded-md bg-[#6D2323] text-white placeholder-gray-300"
                        value={newOption.stock} onChange={(e) => setNewOption({ ...newOption, stock: e.target.value })} required />
                    <input type="text" placeholder="URL รูปตัวเลือก" className="p-2 border border-[#A31D1D] rounded-md bg-[#6D2323] text-white placeholder-gray-300"
                        value={newOption.image} onChange={(e) => setNewOption({ ...newOption, image: e.target.value })} required />
                    <button type="button" className="col-span-4 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-800 transition"
                        onClick={addOption}>
                        เพิ่มตัวเลือกสินค้า
                    </button>
                </div>

                <button type="submit" className="w-full bg-[#A31D1D] text-white py-3 mt-4 rounded-lg font-semibold hover:bg-[#6D2323] transition"
                    onClick={addProduct}>
                    เพิ่มสินค้า
                </button>
            </div>

            {/* ✅ รายการสินค้า */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold text-[#6D2323]">📋 รายการสินค้า</h2>
                {products.map((product) => (
                    <div key={product.id} className="border p-4 rounded-lg shadow-md bg-white mt-4">
                        <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md" />
                        <h3 className="text-lg font-bold mt-2">{product.name}</h3>
                        <p className="text-sm text-gray-600">{product.description}</p>
                        <p className="text-[#A31D1D] font-semibold">฿{product.price}</p>

                        {/* แสดงตัวเลือกสินค้าที่เพิ่ม */}
                        <div className="mt-4">
                            <h4 className="font-bold text-[#6D2323]">ตัวเลือกสินค้า:</h4>
                            {product.options.map((option, index) => (
                                <div key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded-md mt-2">
                                    <span>{option.name} - {option.stock} ชิ้น</span>
                                    <img src={option.image} alt={option.name} className="w-8 h-8 rounded-full" />
                                </div>
                            ))}
                        </div>

                        <button className="w-full mt-2 bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
                            onClick={() => deleteProduct(product.id)}>
                            <DeleteOutlined /> ลบสินค้า
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StoreOwnerPage;
