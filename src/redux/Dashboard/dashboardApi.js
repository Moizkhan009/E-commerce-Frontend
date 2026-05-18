  // import axios from "axios";
  // import { api } from "../api";

  // const API = "http://localhost:5000/api/dashboard";

  // export const fetchDashboardStatsApi = async () => {
  //   const response = await axios.get(API);
  //   return response.data.stats;
  // };
  // redux/features/dashboard/dashboardApi.js
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const fetchDashboardStats = async () => {
  // No token required - direct call
  const response = await axios.get(`${API_BASE_URL}/dashboard`);
  return response.data; // Returns { stats, topProducts, lowStockProducts, inventorySummary }
};

// Individual API calls if needed
export const fetchTopProducts = async () => {
  const response = await axios.get(`${API_BASE_URL}/dashboard`);
  return response.data.topProducts;
};

export const fetchLowStockProducts = async () => {
  const response = await axios.get(`${API_BASE_URL}/dashboard`);
  return response.data.lowStockProducts;
};

export const fetchInventorySummary = async () => {
  const response = await axios.get(`${API_BASE_URL}/dashboard`);
  return response.data.inventorySummary;
};