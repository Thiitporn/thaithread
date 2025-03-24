import React, { useState } from "react";
import { DeleteOutlined, CheckCircleOutlined, FileTextOutlined } from "@ant-design/icons";

// สถานะของคำสั่งซื้อ

const ManageOrders = () => {
    // ✅ สถานะของคำสั่งซื้อ
    const [orders, setOrders] = useState([
        { id: 1, customer: "ผู้ใช้ A", total: 500, status: "รอดำเนินการ" },
        { id: 2, customer: "ผู้ใช้ B", total: 1500, status: "สำเร็จ" },
    ]);

    // ✅ ฟังก์ชันลบคำสั่งซื้อ
    const deleteOrder = (id) => {
        setOrders(orders.filter(order => order.id !== id));
    };

    // ✅ ฟังก์ชันอัปเดตสถานะคำสั่งซื้อ
    const updateOrderStatus = (id, newStatus) => {
        setOrders(orders.map(order =>
            order.id === id ? { ...order, status: newStatus } : order
        ));
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-[#6D2323]">จัดการคำสั่งซื้อ</h1>

            {/* ✅ รายการคำสั่งซื้อ */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold text-[#6D2323]">
                    <FileTextOutlined /> รายการคำสั่งซื้อ
                </h2>
                {orders.map((order) => (
                    <div key={order.id} className="border p-4 rounded-lg shadow-md bg-white mt-4">
                        <h3 className="text-lg font-bold">คำสั่งซื้อ #{order.id}</h3>
                        <p className="text-sm text-gray-600">ลูกค้า: {order.customer}</p>
                        <p className="text-[#A31D1D] font-semibold">฿{order.total}</p>
                        <p className={`text-sm font-semibold ${order.status === "สำเร็จ" ? "text-green-600" : "text-yellow-600"}`}>{order.status}</p>

                        {/* ปุ่มอัปเดตสถานะ */}
                        <div className="flex gap-2 mt-4">
                            <button onClick={() => updateOrderStatus(order.id, "สำเร็จ")} className="text-green-600 hover:text-green-800">
                                <CheckCircleOutlined /> อัปเดตเป็นสำเร็จ
                            </button>

                            {/* ปุ่มลบคำสั่งซื้อ */}
                            <button onClick={() => deleteOrder(order.id)} className="text-red-600 hover:text-red-800">
                                <DeleteOutlined /> ลบคำสั่งซื้อ
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageOrders;
