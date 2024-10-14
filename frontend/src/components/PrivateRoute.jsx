import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';


const PrivateRoute = ({ children, allowedRoles }) => {
  const { user } = useSelector((state) => state.auth); 
  const role = user?.role;
  const location = useLocation();

  console.log(allowedRoles, role);


  if (!user?.access_token) {
    return <Navigate to="/user-auth" state={{ from: location }} replace />;
  }

 
  if (allowedRoles && !allowedRoles.includes(role)) {
    console.log(allowedRoles, role);
    return <Navigate to="/" replace />;
  }



  return children; 
};

export default PrivateRoute;
