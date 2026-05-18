import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  return userInfo &&
    userInfo.user.role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/admin" />
  );
};

export default AdminRoute;