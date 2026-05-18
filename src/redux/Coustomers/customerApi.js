import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

export const fetchCustomersApi = async () => {

  const response = await axios.get(
    `${API_URL}/customers`
  );

  return response.data.customers;
};