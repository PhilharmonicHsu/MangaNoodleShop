import api from "./api";

// 取得所有麵類品項
export const register = async (userInfo) => {
  try {
    const response = await api.post("/users/register", userInfo);
    
    return response;
  } catch (error) {
    throw error;
  }
};

export const login = async (userInfo) => {
  try {
    const response = await api.post("/users/login", userInfo);

    return response;
  } catch (error) {
    throw error;
  }
}

export const checkAuth = async () => {
  try {
    const response = await api.get("users/check-auth");
    
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      return null;
    }

    throw error
  }
}

export const logout = async () => {
  try {
    const response = await api.post("users/logout", {});

    return response.data;
  } catch (error) {
    throw error;
  }
}
