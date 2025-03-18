import React, { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const ManageProducts = () => {
    // ✅ สถานะของสินค้าทั้งหมด
    const [products, setProducts] = useState([]);

    // ✅ สถานะสำหรับฟอร์มเพิ่มสินค้า
    const [newProduct, setNewProduct] = useState({
        name: "",
        description: "",
        price: "",
        image: "",
        options: []  // เพิ่มตัวเลือกสินค้า
    });

    // ✅ ฟอร์มเพิ่มสินค้าใหม่
    const addProduct = (e) => {
        e.preventDefault();
        if (!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.image) {
            alert("กรุณากรอกข้อมูลให้ครบทุกช่อง!");
            return;
        }

        // สร้าง id ใหม่ให้กับสินค้า
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
                <button type="submit" className="w-full bg-[#A31D1D] text-white py-3 mt-4 rounded-lg font-semibold hover:bg-[#6D2323] transition">
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

                        {/* ปุ่มลบสินค้า */}
                        <button onClick={() => deleteProduct(product.id)} className="w-full mt-2 bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition">
                            <DeleteOutlined /> ลบสินค้า
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageProducts;
