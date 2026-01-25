import api from "../utils/api";

const useAxiosWithAuth = async () => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) return;
    const res = await api.get(`/apiBaseUrl/:id`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Fetched data", res.data);
  } catch (err) {
    console.error("Error fetching data", err);
  }
};
export default useAxiosWithAuth;
