import React from 'react';
import AccountNav from './../components/Account-nav';
import { Outlet } from 'react-router-dom';

const AccountLayout = () => {
  return (
    <div className="container mx-auto my-4">
      <div className="account-layout">
        <div className="account-hdr bg-primary text-black border p-4">
          <h5 className="text-xl font-bold">Account Settings</h5>
        </div>
        <div className="account-bdy grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Navigation Panel */}
          <div className="col-span-1">
            <AccountNav />
          </div>
          
          {/* Content Panel */}
          <div className="col-span-3">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;
