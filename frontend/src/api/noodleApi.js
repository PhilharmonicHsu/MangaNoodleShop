import api from "./api";

// 取得所有麵類品項
export const getReceipts = async (keyword = null) => {
  try {
    const url = (keyword)
      ? `/receipts?name=${keyword}`
      : "/receipts"

    const response = await api.get(url);
    
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

export const order = async () => {
  try {
    const response = await api.post(`/cart-items/order`, {});

    return response;
  } catch (error) {
    throw error;
  }
}

export const cancel = async () => {
  try {
    const response = await api.post(`/cart-items/cancel`, {});

    return response.data;
  } catch (error) {
    throw error;
  }
}

