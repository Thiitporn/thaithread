import React, { useState, useEffect } from "react";
import { DeleteOutlined, UnorderedListOutlined, AppstoreOutlined, CloseCircleOutlined, CheckCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import { Card, Button } from "antd";
import {
  getAllProducts,
  uploadImageAndCreateProduct,
} from "../services/apiService";

const StoreOwnerPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const userId = localStorage.getItem("userId");
  // ✅ State for New Product
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: null,
    seller: userId, // Example seller ID
  });

  // ✅ Load Products on Page Load
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      setError(<span><CloseCircleOutlined /> ไม่สามารถโหลดสินค้าได้</span>);
    }
    setLoading(false);
  };

  // ✅ Handle File Upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      setError(<span><CloseCircleOutlined /> กรุณาเลือกไฟล์รูปภาพ</span>);
      return;
    }

    try {
      setLoading(true);
      const imageUrl = await uploadImageAndCreateProduct(newProduct, file); // Using uploadImageAndCreateProduct to upload image and create product
      setSuccessMessage(<span><CheckCircleOutlined /> อัปโหลดรูปสำเร็จ!</span>);
      setNewProduct({
        ...newProduct,
        image: imageUrl, // Save image URL from the response
      });
    } catch (err) {
      setError(<span><CloseCircleOutlined /> อัปโหลดรูปภาพไม่สำเร็จ</span>);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle Product Form Submission
  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (
      !newProduct.name ||
      !newProduct.price ||
      !newProduct.category ||
      !newProduct.image
    ) {
      setError(<span><CloseCircleOutlined /> กรุณากรอกข้อมูลให้ครบทุกช่อง!</span>);
      return;
    }

    try {
      setLoading(true);
      await uploadImageAndCreateProduct(newProduct, newProduct.image);
      setSuccessMessage(<span><CheckCircleOutlined /> สินค้าถูกเพิ่มเรียบร้อย!</span>);
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
      setError(<span><CloseCircleOutlined /> สร้างสินค้าไม่สำเร็จ</span>);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-[#6D2323]">
        <AppstoreOutlined /> จัดการสินค้า (เจ้าของร้าน)
      </h1>

      {error && <p className="text-red-600">{error}</p>}
      {successMessage && <p className="text-green-600">{successMessage}</p>}

      {/* ✅ ฟอร์มเพิ่มสินค้า */}
      <div className="bg-[#E5D0AC] p-6 mt-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-[#6D2323] mb-4">
          เพิ่มสินค้าใหม่
        </h2>
        <form onSubmit={handleAddProduct} className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="ชื่อสินค้า"
            className="input-style"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="รายละเอียดสินค้า"
            className="input-style"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            required
          />
          <input
            type="number"
            placeholder="ราคา (฿)"
            className="input-style"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="หมวดหมู่สินค้า"
            className="input-style"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
            required
          />
          <input
            type="number"
            placeholder="จำนวนสต็อก"
            className="input-style"
            value={newProduct.stock}
            onChange={(e) =>
              setNewProduct({ ...newProduct, stock: e.target.value })
            }
            required
          />

          {/* ✅ อัปโหลดรูปภาพ */}
          <input
            type="file"
            className="input-style"
            accept="image/*"
            onChange={handleFileUpload}
            required
          />

          <button type="submit" className="btn-red w-full mt-4">
            {loading ? <LoadingOutlined /> : "เพิ่มสินค้า"}
          </button>
        </form>
      </div>

      {/* ✅ รายการสินค้า */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-[#6D2323]">
          <UnorderedListOutlined /> รายการสินค้า
        </h2>
        {loading ? (
          <p><LoadingOutlined /> กำลังโหลดสินค้า...</p>
        ) : (
          <div className="product-list">
            {products.map((product) => (
              <Card
                key={product._id}
                style={{ width: 240, margin: "10px" }}
                cover={<img alt={product.name} src={product.image} />}
                actions={[
                  <Button type="primary" danger icon={<DeleteOutlined />}>
                    ลบสินค้า
                  </Button>,
                ]}
              >
                <Card.Meta
                  title={product.name}
                  description={`฿${product.price}`}
                />
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreOwnerPage;
