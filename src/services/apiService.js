import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

// Set up Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  contentType: "application/json",
  // withCredentials: true, // Ensures cookies (JWT token) are sent with requests
});

// 🔹 AUTHENTICATION
export const registerUser = async (userData) => {
  const { data } = await api.post("/auth/register", userData);
  return data;
};
export const getAllUsers = async () => {
  try {
    const { data } = await api.get("/auth"); // Adjust API endpoint if needed
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
export const loginUser = async (credentials) => {
  const { data } = await api.post("/auth/login", credentials);
  return data;
};

export const logoutUser = async () => {
  await api.post("/auth/logout");
};

// 🔹 PRODUCTS
export const getAllProducts = async () => {
  const { data } = await api.get("/products");
  return data;
};

export const getProductById = async (id) => {
  const { data } = await api.get(`/products/${id}`);

  return data;
};
//delete product
export const deleteProduct = async (id) => {
  const data = await api.delete(`/products/${id}`);
  return data;
};
export const addProduct = async (productData) => {
  const { data } = await api.post("/products", productData);
  return data;
};

// 🔹 CART
export const getUserCart = async (userId) => {
  const { data } = await api.get(`/cart/${userId}`);
  return data;
};

export const addToCart = async (userId, productId, quantity) => {
  const { data } = await api.post("/cart/add", { userId, productId, quantity });
  return data;
};

export const removeFromCart = async (userId, productId) => {
  await api.delete(`/cart/${userId}/${productId}`);
};

// 🔹 ORDERS
export const placeOrder = async (userId, totalPrice) => {
  if (!userId || !totalPrice) {
    throw new Error("Missing required parameters: userId or totalPrice");
  }

  try {
    const { data } = await api.post(
      "/orders/checkout",
      {
        userId,
        totalPrice: parseInt(totalPrice, 10), // Ensure totalPrice is an integer
      },
      {
        headers: {
          "Content-Type": "application/json", // กำหนด Content-Type เป็น JSON
        },
      }
    );
    return data;
  } catch (error) {
    console.error(
      "Error placing order:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const getUserOrders = async (userId) => {
  const { data } = await api.get(`/orders/${userId}`);
  return data;
};
export const getOrder = async () => {
  const { data } = await api.get(`/orders`);
  return data;
};

export const uploadImageAndCreateProduct = async (productData, file) => {
  try {
    const formData = new FormData();
    formData.append("image", file); // Upload the image
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("category", productData.category);
    formData.append("stock", productData.stock);
    formData.append("seller", productData.seller);

    // Sending POST request to upload the image and create the product
    const response = await api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 201) {
      console.log("✅ Product created successfully:", response.data.product);
      return response.data.product;
    } else {
      throw new Error("❌ Product creation failed");
    }
  } catch (error) {
    console.error(
      "❌ Error creating product:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// 🔹 PAYMENT
export const createCheckoutSession = async (products) => {
  const { data } = await api.post("/payment/create-checkout-session", {
    products,
  });
  return data;
};

// API to add item to cart
// In your apiService.js
export const addItemToCart = async (userId, productId, quantity) => {
  try {
    const response = await api.post(
      `/cart/${userId}`, // Ensure this matches your backend route
      { productId, quantity },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding item to cart:", error);
    throw error;
  }
};

// API to remove item from cart
export const removeItemFromCart = async (userId, productId) => {
  try {
    const response = await api.delete(`/cart/${userId}/${productId}`, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error removing item from cart:", error);
    throw error;
  }
};

// API to get the user's cart
export const getCart = async (userId) => {
  try {
    const response = await api.get(`/cart/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};

// In apiService.js

// Reset Password
export const resetPassword = async (email, newPassword) => {
  try {
    const { data } = await api.put("/auth/resetpassword", {
      email,
      newPassword,
    });
    return data;
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
};

// Update Profile
export const updateProfile = async (id, name, email) => {
  try {
    const { data } = await api.put(`/auth/updateprofile/${id}`, {
      name,
      email,
    });
    return data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

// Delete User
export const deleteUser = async (id) => {
  try {
    const { data } = await api.delete(`/auth/delete/${id}`);
    return data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

//find user by id
export const findUserById = async (id) => {
  try {
    const { data } = await api.get(`/auth/${id}`);
    return data;
  } catch (error) {
    console.error("Error finding user:", error);
    throw error;
  }
};

export default api;
