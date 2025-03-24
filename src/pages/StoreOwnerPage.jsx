import React, { useState, useEffect } from "react";
import {
  DeleteOutlined,
  UnorderedListOutlined,
  AppstoreOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
  LoadingOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Card, Button, Spin, Modal, Input } from "antd";
import {
  getAllProducts,
  uploadImageAndCreateProduct,
  deleteProduct,
  updateProduct,
} from "../services/apiService";
import Navbar from "../components/Navbar";

const StoreOwnerPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [editingProduct, setEditingProduct] = useState(null); // Track the product being edited
  const userId = localStorage.getItem("userId");

  // State for New Product
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: null,
    seller: userId, // Example seller ID
  });

  // Load Products on Page Load
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDeleteProduct = async (productId) => {
    try {
      setLoading(true);
      await deleteProduct(productId);
      setSuccessMessage(
        <span>
          <CheckCircleOutlined /> ลบสินค้าเรียบร้อย!
        </span>
      );
      fetchProducts(); // Reload products
    } catch (err) {
      setError(
        <span>
          <CloseCircleOutlined /> ไม่สามารถลบสินค้าได้
        </span>
      );
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      setError(
        <span>
          <CloseCircleOutlined /> ไม่สามารถโหลดสินค้าได้
        </span>
      );
    }
    setLoading(false);
  };

  // Handle File Upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      setError(
        <span>
          <CloseCircleOutlined /> กรุณาเลือกไฟล์รูปภาพ
        </span>
      );
      return;
    }

    try {
      setLoading(true);
      const imageUrl = await uploadImageAndCreateProduct(newProduct, file); // Using uploadImageAndCreateProduct to upload image and create product
      setSuccessMessage(
        <span>
          <CheckCircleOutlined /> อัปโหลดรูปสำเร็จ!
        </span>
      );
      setNewProduct({
        ...newProduct,
        image: imageUrl, // Save image URL from the response
      });
    } catch (err) {
      setError(
        <span>
          <CloseCircleOutlined /> อัปโหลดรูปภาพไม่สำเร็จ
        </span>
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle Product Form Submission
  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (
      !newProduct.name ||
      !newProduct.price ||
      !newProduct.category ||
      !newProduct.image
    ) {
      setError(
        <span>
          <CloseCircleOutlined /> กรุณากรอกข้อมูลให้ครบทุกช่อง!
        </span>
      );
      return;
    }

    try {
      setLoading(true);
      await uploadImageAndCreateProduct(newProduct, newProduct.image);
      setSuccessMessage(
        <span>
          <CheckCircleOutlined /> สินค้าถูกเพิ่มเรียบร้อย!
        </span>
      );
      setNewProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        image: null,
        seller: userId,
      });
      fetchProducts(); // Reload products
    } catch (err) {
      fetchProducts(); // Reload products
    }
  };

  // Handle Product Update
  const handleUpdateProduct = async () => {
    if (
      !editingProduct.name ||
      !editingProduct.price ||
      !editingProduct.category ||
      !editingProduct.image
    ) {
      setError(
        <span>
          <CloseCircleOutlined /> กรุณากรอกข้อมูลให้ครบทุกช่อง!
        </span>
      );
      return;
    }

    try {
      setLoading(true);
      await updateProduct(editingProduct._id, editingProduct);
      setSuccessMessage(
        <span>
          <CheckCircleOutlined /> สินค้าถูกอัปเดตเรียบร้อย!
        </span>
      );
      setEditingProduct(null); // Reset editing state
      fetchProducts(); // Reload products
    } catch (err) {
      setError(
        <span>
          <CloseCircleOutlined /> อัปเดตสินค้าไม่สำเร็จ
        </span>
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle Editing Product
  const handleEditProduct = (product) => {
    setEditingProduct({ ...product }); // Set the product being edited
  };

  return (
    <div>
      <Navbar />

      <div className="p-8 bg-[#F5F5F5] min-h-screen">
        <h1 className="text-4xl font-bold text-[#6D2323]">
          <AppstoreOutlined /> จัดการสินค้า (เจ้าของร้าน)
        </h1>

        {error && <p className="text-red-600 mt-2">{error}</p>}
        {successMessage && (
          <p className="text-green-600 mt-2">{successMessage}</p>
        )}

        {/* ✅ ฟอร์มเพิ่มสินค้า */}
        <div className="bg-[#E5D0AC] p-8 mt-6 rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold text-[#6D2323] mb-6">
            เพิ่มสินค้าใหม่
          </h2>
          <form onSubmit={handleAddProduct} className="space-y-4">
            <input
              type="text"
              placeholder="ชื่อสินค้า"
              className="w-full p-4 border-2 border-[#A31D1D] rounded-md bg-[#FEF9E1] text-[#6D2323] focus:outline-none"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="รายละเอียดสินค้า"
              className="w-full p-4 border-2 border-[#A31D1D] rounded-md bg-[#FEF9E1] text-[#6D2323] focus:outline-none"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
              required
            />
            <input
              type="number"
              placeholder="ราคา (฿)"
              className="w-full p-4 border-2 border-[#A31D1D] rounded-md bg-[#FEF9E1] text-[#6D2323] focus:outline-none"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="หมวดหมู่สินค้า"
              className="w-full p-4 border-2 border-[#A31D1D] rounded-md bg-[#FEF9E1] text-[#6D2323] focus:outline-none"
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct({ ...newProduct, category: e.target.value })
              }
              required
            />
            <input
              type="number"
              placeholder="จำนวนสต็อก"
              className="w-full p-4 border-2 border-[#A31D1D] rounded-md bg-[#FEF9E1] text-[#6D2323] focus:outline-none"
              value={newProduct.stock}
              onChange={(e) =>
                setNewProduct({ ...newProduct, stock: e.target.value })
              }
              required
            />

            {/* ✅ อัปโหลดรูปภาพ */}
            <input
              type="file"
              className="w-full p-4 border-2 border-[#A31D1D] rounded-md bg-[#FEF9E1] text-[#6D2323] focus:outline-none"
              accept="image/*"
              onChange={handleFileUpload}
              required
            />

            <button
              type="submit"
              className="w-full bg-[#A31D1D] text-white py-4 mt-6 rounded-lg font-semibold hover:bg-[#6D2323] transition"
            >
              {loading ? <Spin /> : "เพิ่มสินค้า"}
            </button>
          </form>
        </div>

        {/* List of Products */}
        <h2 className="text-2xl font-bold text-[#6D2323] mb-4 mt-12">
          <UnorderedListOutlined /> รายการสินค้า
        </h2>
        <div className="mt-10 grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <p className="text-center">
              <LoadingOutlined /> กำลังโหลดสินค้า...
            </p>
          ) : (
            products.map((product) => (
              <Card
                key={product._id}
                style={{
                  width: 240,
                  borderRadius: "12px",
                  boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
                }}
                cover={<img alt={product.name} src={product.image} />}
                actions={[
                  // eslint-disable-next-line react/jsx-key
                  <Button
                    type="primary"
                    danger
                    onClick={() => handleDeleteProduct(product._id)}
                    icon={<DeleteOutlined />}
                  >
                    ลบสินค้า
                  </Button>,
                  // eslint-disable-next-line react/jsx-key
                  <Button
                    type="default"
                    onClick={() => handleEditProduct(product)}
                    icon={<EditOutlined />}
                  >
                    แก้ไข
                  </Button>,
                ]}
              >
                <Card.Meta
                  title={product.name}
                  description={`฿${product.price}`}
                />
              </Card>
            ))
          )}
        </div>

        {/* Modal for Editing Product */}
        {editingProduct && (
          <Modal
            title="แก้ไขสินค้า"
            visible={true}
            onCancel={() => setEditingProduct(null)}
            onOk={handleUpdateProduct}
          >
            <Input
              value={editingProduct.name}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, name: e.target.value })
              }
              placeholder="ชื่อสินค้า"
            />
            <Input
              value={editingProduct.description}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  description: e.target.value,
                })
              }
              placeholder="รายละเอียดสินค้า"
            />
            <Input
              type="number"
              value={editingProduct.price}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, price: e.target.value })
              }
              placeholder="ราคา (฿)"
            />
            <Input
              value={editingProduct.category}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  category: e.target.value,
                })
              }
              placeholder="หมวดหมู่สินค้า"
            />
            <Input
              type="number"
              value={editingProduct.stock}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, stock: e.target.value })
              }
              placeholder="จำนวนสต็อก"
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default StoreOwnerPage;
