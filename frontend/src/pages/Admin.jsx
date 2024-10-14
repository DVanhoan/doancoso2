import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { adminDashboard } from "./../redux/actions/adminAction";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("companyCategories"); // State to manage active tab

  const dispatch = useDispatch();
  const {
    dashCount,
    recentAuthors,
    companyCategories,
    roles,
    permissions,
    rolesHavePermissions,
    loading,
    error,
  } = useSelector((state) => state.adminDashboard);

  useEffect(() => {
    dispatch(adminDashboard());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="account-layout border">
      <div className="account-hdr bg-primary text-white border p-4">
        Dashboard
      </div>
      <div className="account-bdy p-6">
        {/* Dashboard cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
          <div className="card dashboard-card text-white h-100 shadow bg-primary p-6">
            <div className="rotate">
              <i className="fas fa-users fa-4x"></i>
            </div>
            <h6 className="text-uppercase">Users</h6>
            <h1>{dashCount.user}</h1>
          </div>
          <div className="card dashboard-card text-white h-100 shadow bg-secondary p-6">
            <div className="rotate">
              <i className="fas fa-building fa-4x"></i>
            </div>
            <h6 className="text-uppercase">Total Jobs</h6>
            <h1>{dashCount.post}</h1>
          </div>
          <div className="card dashboard-card text-white h-100 shadow bg-info p-6">
            <div className="rotate">
              <i className="fas fa-user-tie fa-4x"></i>
            </div>
            <h6 className="text-uppercase">Authors</h6>
            <h1>{dashCount.author}</h1>
          </div>
        </div>



        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="card dashboard-card text-white h-100 shadow bg-danger p-6">
            <div className="rotate">
              <i className="fas fa-star-of-life fa-4x"></i>
            </div>
            <h6 className="text-uppercase">Live Posts</h6>
            <h1>{dashCount.livePost}</h1>
          </div>
          <div className="card dashboard-card text-white h-100 shadow bg-warning p-6">
            <div className="rotate">
              <i className="fas fa-industry fa-4x"></i>
            </div>
            <h6 className="text-uppercase">Company Categories</h6>
            <h1>{companyCategories.length}</h1>
          </div>
        </div>


      
          <div className="table-responsive">
            <table className="min-w-full table-auto bg-white">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="py-2 px-4">#</th>
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Email</th>
                  <th className="py-2 px-4">Company Name</th>
                  <th className="py-2 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentAuthors.data && recentAuthors.data.length > 0 ? (
                  recentAuthors.data.map((author) => (
                    <tr key={author.id} className="border-b">
                      <td className="py-2 px-4">{author.id}</td>
                      <td className="py-2 px-4">{author.name}</td>
                      <td className="py-2 px-4">{author.email}</td>
                      <td className="py-2 px-4">{author.company?.title}</td>
                      <td className="py-2 px-4">
                        <a
                          href=''
                          className="btn btn-primary"
                        >
                          View Company
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-2 px-4">
                      No authors found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          





        {/* Tab Navigation */}
        <div className="tabs">
          <div className="tab-list flex space-x-4">
            <button
              className={`tab-item ${activeTab === "companyCategories" ? "active" : ""}`}
              onClick={() => handleTabChange("companyCategories")}
            >
              Company Categories
            </button>
            <button
              className={`tab-item ${activeTab === "roles" ? "active" : ""}`}
              onClick={() => handleTabChange("roles")}
            >
              Roles
            </button>
            <button
              className={`tab-item ${activeTab === "permissions" ? "active" : ""}`}
              onClick={() => handleTabChange("permissions")}
            >
              Permissions
            </button>
            <button
              className={`tab-item ${activeTab === "rolesHavePermissions" ? "active" : ""}`}
              onClick={() => handleTabChange("rolesHavePermissions")}
            >
              Roles have permissions
            </button>
          </div>

          {/* Tab Content */}
          <div className="tab-content mt-4">
            {/* Company Categories Tab */}
            {activeTab === "companyCategories" && (
              <div className="tab-panel">
                <form className="flex mb-4">
                  <input
                    type="text"
                    className="input border p-2 rounded w-full"
                    placeholder="Company category name"
                  />
                  <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">
                    Add
                  </button>
                </form>

                <table className="min-w-full table-auto bg-white border">
                  <thead className="bg-gray-200 text-left">
                    <tr>
                      <th className="py-2 px-4">#</th>
                      <th className="py-2 px-4">Category Name</th>
                      <th className="py-2 px-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companyCategories.map((category, index) => (
                      <tr key={category.id} className="border-b">
                        <td className="py-2 px-4">{index + 1}</td>
                        <td className="py-2 px-4">{category.category_name}</td>
                        <td className="py-2 px-4">
                          <a
                            href={`/category/edit/${category.id}`}
                            className="text-blue-600 hover:underline"
                          >
                            Edit
                          </a>
                          <button className="ml-2 text-red-500">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Roles Tab */}
            {activeTab === "roles" && (
              <div className="tab-panel">
                <table className="min-w-full table-auto bg-white border">
                  <thead className="bg-gray-200 text-left">
                    <tr>
                      <th className="py-2 px-4">#</th>
                      <th className="py-2 px-4">Roles</th>
                      <th className="py-2 px-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roles.map((role, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2 px-4">{index + 1}</td>
                        <td className="py-2 px-4">{role}</td>
                        <td className="py-2 px-4">
                          <button className="text-blue-600 hover:underline">
                            Edit
                          </button>
                          <button className="ml-2 text-red-500">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Permissions Tab */}
            {activeTab === "permissions" && (
              <div className="tab-panel">
                <table className="min-w-full table-auto bg-white border">
                  <thead className="bg-gray-200 text-left">
                    <tr>
                      <th className="py-2 px-4">#</th>
                      <th className="py-2 px-4">Permissions</th>
                      <th className="py-2 px-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {permissions.map((permission, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2 px-4">{index + 1}</td>
                        <td className="py-2 px-4">{permission}</td>
                        <td className="py-2 px-4">
                          <button className="text-blue-600 hover:underline">
                            Edit
                          </button>
                          <button className="ml-2 text-red-500">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Roles have permissions Tab */}
            {activeTab === "rolesHavePermissions" && (
              <div className="tab-panel">
                <table className="min-w-full table-auto bg-white border">
                  <thead className="bg-gray-200 text-left">
                    <tr>
                      <th className="py-2 px-4">#</th>
                      <th className="py-2 px-4">Role</th>
                      <th className="py-2 px-4">Permissions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rolesHavePermissions.map((role, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2 px-4">{index + 1}</td>
                        <td className="py-2 px-4">{role.name}</td>
                        <td className="py-2 px-4">
                          {role.permissions.length === 0 ? (
                            <span className="text-blue-500">Basic Auth Permissions</span>
                          ) : (
                            role.permissions.map((permission) => (
                              <span
                                key={permission.id}
                                className="badge bg-blue-500 text-white px-2 py-1 rounded-full mr-1"
                              >
                                {permission.name}
                              </span>
                            ))
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
