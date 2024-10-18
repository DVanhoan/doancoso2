import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const AccountNav = () => {
  const location = useLocation();
  const role = localStorage.getItem('role');
  const isAdmin = role === 'admin';
  const isAuthor = role === 'author';
  const isUser = role === 'user';

  const isActive = (segment) => location.pathname.includes(segment);

  return (
    <div className="account-nav">
      <ul className="space-y-4">
        {isAdmin && (
          <>
            <li className={`p-4 border rounded-md transition duration-300 ease-in-out ${isActive('/dashboard') ? 'bg-blue-500 text-white' : 'bg-white hover:bg-blue-100 focus:bg-blue-100'}`}>
              <Link to="/account/dashboard" className={`flex items-center space-x-2 ${isActive('/dashboard') ? 'text-white' : 'text-black hover:text-blue-500 focus:text-blue-500'}`}>
                <i className="fas fa-chart-line"></i>
                <span>Dashboard</span>
              </Link>
            </li>
            <li className={`p-4 border rounded-md transition duration-300 ease-in-out ${isActive('/view-all-users') ? 'bg-blue-500 text-white' : 'bg-white hover:bg-blue-100 focus:bg-blue-100'}`}>
              <Link to="/account/view-all-users" className={`flex items-center space-x-2 ${isActive('/view-all-users') ? 'text-white' : 'text-black hover:text-blue-500 focus:text-blue-500'}`}>
                <i className="fas fa-users"></i>
                <span>View All Users</span>
              </Link>
            </li>
          </>
        )}

        {isAuthor && (
          <>
            <li className={`p-4 border rounded-md transition duration-300 ease-in-out ${isActive('/author') ? 'bg-blue-500 text-white' : 'bg-white hover:bg-blue-100 focus:bg-blue-100'}`}>
              <Link to="/account/author" className={`flex items-center space-x-2 ${isActive('/author') ? 'text-white' : 'text-black hover:text-blue-500 focus:text-blue-500'}`}>
                <i className="fas fa-chart-line"></i>
                <span>Author Section</span>
              </Link>
            </li>
            <li className={`p-4 border rounded-md transition duration-300 ease-in-out ${isActive('/upload-job') ? 'bg-blue-500 text-white' : 'bg-white hover:bg-blue-100 focus:bg-blue-100'}`}>
              <Link to="/account/upload-job" className={`flex items-center space-x-2 ${isActive('/post/create') ? 'text-white' : 'text-black hover:text-blue-500 focus:text-blue-500'}`}>
                <i className="fas fa-plus-square"></i>
                <span>Create Job listing</span>
              </Link>
            </li>
            <li className={`p-4 border rounded-md transition duration-300 ease-in-out ${isActive('/job-application') ? 'bg-blue-500 text-white' : 'bg-white hover:bg-blue-100 focus:bg-blue-100'}`}>
              <Link to="/job-application" className={`flex items-center space-x-2 ${isActive('/job-application') ? 'text-white' : 'text-black hover:text-blue-500 focus:text-blue-500'}`}>
                <i className="fas fa-bell"></i>
                <span>Job Applications</span>
              </Link>
            </li>
          </>
        )}

        <li className={`p-4 border rounded-md transition duration-300 ease-in-out ${isActive('/overview') ? 'bg-blue-500 text-white' : 'bg-white hover:bg-blue-100 focus:bg-blue-100'}`}>
          <Link to="/account" className={`flex items-center space-x-2 ${isActive('/overview') ? 'text-white' : 'text-black hover:text-blue-500 focus:text-blue-500'}`}>
            <i className="fas fa-user-shield"></i>
            <span>User Account</span>
          </Link>
        </li>

        {isUser && (
          <li className={`p-4 border rounded-md transition duration-300 ease-in-out ${isActive('/become-employer') ? 'bg-blue-500 text-white' : 'bg-white hover:bg-blue-100 focus:bg-blue-100'}`}>
            <Link to="/account/become-employer" className={`flex items-center space-x-2 ${isActive('/become-employer') ? 'text-white' : 'text-black hover:text-blue-500 focus:text-blue-500'}`}>
              <i className="fas fa-user-shield"></i>
              <span>Become an employer</span>
            </Link>
          </li>
        )}

        <li className={`p-4 border rounded-md transition duration-300 ease-in-out ${isActive('/change-password') ? 'bg-blue-500 text-white' : 'bg-white hover:bg-blue-100 focus:bg-blue-100'}`}>
          <Link to="/account/change-password" className={`flex items-center space-x-2 ${isActive('/change-password') ? 'text-white' : 'text-black hover:text-blue-500 focus:text-blue-500'}`}>
            <i className="fas fa-fingerprint"></i>
            <span>Change Password</span>
          </Link>
        </li>

        <li className={`p-4 border rounded-md transition duration-300 ease-in-out ${isActive('/my-saved-jobs') ? 'bg-blue-500 text-white' : 'bg-white hover:bg-blue-100 focus:bg-blue-100'}`}>
          <Link to="/my-saved-jobs" className={`flex items-center space-x-2 ${isActive('/my-saved-jobs') ? 'text-white' : 'text-black hover:text-blue-500 focus:text-blue-500'}`}>
            <i className="fas fa-stream"></i>
            <span>My Saved Jobs</span>
          </Link>
        </li>

        <li className={`p-4 border rounded-md transition duration-300 ease-in-out ${isActive('/deactivate') ? 'bg-blue-500 text-white' : 'bg-white hover:bg-blue-100 focus:bg-blue-100'}`}>
          <Link to="/account/deactivate" className={`flex items-center space-x-2 ${isActive('/deactivate') ? 'text-white' : 'text-black hover:text-blue-500 focus:text-blue-500'}`}>
            <i className="fas fa-folder-minus"></i>
            <span>Deactivate Account</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AccountNav;
