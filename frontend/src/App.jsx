import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navbar, Footer } from './components';
import {
  About,
  AuthPage,
  FindJobs,
  Companies,
  CompanyProfile,
  UploadJob,
  JobDetail,
  UserProfile,
  Error_404,
} from './pages';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const { user } = useSelector((state) => state.user); // Lấy thông tin người dùng

  return (
    <main className="bg-[#fff]">
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/find-jobs" />} />
        <Route path="/find-jobs" element={<FindJobs />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/user-auth" element={<AuthPage />} />
        <Route path="/job-detail/:id" element={ <JobDetail /> }/>

        {/* Routes cho User */}
        <Route
          path="/user-profile"
          element={
            <PrivateRoute allowedRoles={['user', 'author', 'admin']}>
              <UserProfile />
            </PrivateRoute>
          }
        />

      
        <Route
          path="/post-job"
          element={
            <PrivateRoute allowedRoles={['author']}>
              <UploadJob />
            </PrivateRoute>
          }
        />

        {/* Routes cho Company */}
        <Route
          path="/company-profile"
          element={
            <PrivateRoute allowedRoles={['author']}>
              <CompanyProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/upload-job"
          element={
            <PrivateRoute allowedRoles={['company']}>
              <UploadJob />
            </PrivateRoute>
          }
        />
        
        <Route path="*" element={<Error_404 />} />
      </Routes>

      {user && <Footer />}
    </main>
  );
}

export default App;
