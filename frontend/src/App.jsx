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
    AdminDashboard,
    AuthorSection,
    AccountLayout
} from "./pages";
import PrivateRoute from "./components/PrivateRoute";

function App() {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(getMyUser())
                .then(() => setAuthChecked(true))
                .catch(() => setAuthChecked(true));
        } else {
            setAuthChecked(true);
        }
    }, [dispatch]);

    if (!authChecked) {
        return <div>Loading...</div>; 
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

                <Route path="/account" element={<AccountLayout />}>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="profile" element={<UserProfile />} />
                    <Route path="author" element={<AuthorSection />} />
                    <Route path="upload-job" element={<UploadJob />} />
                </Route>

                <Route
                    path="/post-job"
                    element={
                        <PrivateRoute allowedRoles={["author"]}>
                            <UploadJob />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/company-profile"
                    element={
                        <PrivateRoute allowedRoles={["author"]}>
                            <CompanyProfile />
                        </PrivateRoute>
                    }
                />


                <Route path="*" element={<Error_404 />} />
            </Routes>

            <Footer />
            <ToastContainer />
        </main>
    );
}

export default App;
