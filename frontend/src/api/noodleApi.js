import api from "./api";

// 取得所有麵類品項
export const getReceipts = async () => {
  try {
    const response = await api.get("/receipts");
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBanners = async () => {
  try {
    const response = await api.get("/banners");

    return response.data;
  } catch (error) {
    throw error;
  }
}

export const orderNoodle = async (newNoodle) => {
  try {
    const response = await api.post("/cart-items", newNoodle);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getCartItems = async () => {
  try {
    const response = await api.get("/cart-items");

    return response.data;
  } catch (error) {
    throw error;
  }
}

export const updateOrder = async (orderId, data) => {
  try {
    const response = await api.put(`/cart-items/${orderId}`, data);

    return response.data;
  } catch (error) {
    throw error;
  }
}

export const removeOrder = async (orderId) => {
  try {
    const response = await api.delete(`/cart-items/${orderId}`, {});

    return response.data;
  } catch (error) {
    throw error;
  }
}

export const resetOrder = async () => {
  try {
    const response = await api.post(`/cart-items/reset`, {});

    return response.data;
  } catch (error) {
    throw error;
  }
}
