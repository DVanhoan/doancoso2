import { Navigate, useLocation } from 'react-router-dom';


const PrivateRoute = ({ children, allowedRoles }) => {
  
  const role = localStorage.getItem('role');
  const location = useLocation();
  const token = localStorage.getItem('token');

  


  if (!token) {
    return <Navigate to="/user-auth" state={{ from: location }} replace />;
  }

 
  if (allowedRoles && !allowedRoles.includes(role)) {
    console.log(allowedRoles, role);
    return <Navigate to="/" replace />;
  }



  return children; 
};

export default PrivateRoute;
