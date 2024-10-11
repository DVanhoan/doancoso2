import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

// Component PrivateRoute để bảo vệ route theo vai trò
const PrivateRoute = ({ children, allowedRoles }) => {
  const { user } = useSelector((state) => state.user); // Lấy thông tin người dùng từ Redux
  const location = useLocation();

  // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
  if (!user?.token) {
    return <Navigate to="/user-auth" state={{ from: location }} replace />;
  }

  // Nếu vai trò không nằm trong danh sách allowedRoles, chuyển hướng về trang chủ
  if (allowedRoles && !allowedRoles.includes(user?.user?.accountType)) {
    return <Navigate to="/" replace />;
  }

  return children; // Nếu hợp lệ, hiển thị nội dung trang con
};

export default PrivateRoute;
