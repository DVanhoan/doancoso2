import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, Footer } from "./components";
import { getMyUser } from "./redux/actions/authActions";
import { ToastContainer, toast } from "react-toastify";
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
    Admin,
    Author
} from "./pages";
import PrivateRoute from "./components/PrivateRoute";

function App() {
    const dispatch = useDispatch();
    const { user, loading } = useSelector((state) => state.auth); 
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(getMyUser())
                .then(() => {
                    setAuthChecked(true); 
                })
                .catch(() => {
                    setAuthChecked(true);
                });
        } else {
            setAuthChecked(true); 
        }
    }, [dispatch]);

    if (!authChecked || loading) {
        toast.info("Đang xuất lý, xin vui lòng đợi!");
    }

    return (
        <main className="bg-[#fff]">
            <Navbar />

            <Routes>
                <Route path="/" element={<FindJobs />} />
                <Route path="/companies" element={<Companies />} />
                <Route path="/about-us" element={<About />} />
                <Route path="/user-auth" element={<AuthPage />} />
                <Route path="/job-detail/:id" element={<JobDetail />} />

                {/* Các route yêu cầu xác thực */}
                <Route
                    path="/user-profile"
                    element={
                        <PrivateRoute allowedRoles={["user", "author", "admin"]}>
                            <UserProfile />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/post-job"
                    element={
                        <PrivateRoute allowedRoles={["author"]}>
                            <UploadJob />
                        </PrivateRoute>
                    }
                />

                {/* Routes cho Company */}
                <Route
                    path="/company-profile"
                    element={
                        <PrivateRoute allowedRoles={["author"]}>
                            <CompanyProfile />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/upload-job"
                    element={
                        <PrivateRoute allowedRoles={["author", "admin"]}>
                            <UploadJob />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/admin/dashboard"
                    element={
                        <PrivateRoute allowedRoles={["admin"]}>
                            <Admin />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/author/dashboard"
                    element={
                        <PrivateRoute allowedRoles={["author"]}>
                            <Author />
                        </PrivateRoute>
                    }
                />

                <Route path="*" element={<Error_404 />} />
            </Routes>

            <Footer/> 
            <ToastContainer />
        </main>
    );
}

export default App;
