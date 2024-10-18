import React, { Fragment, useState, useEffect  } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BiChevronDown } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { HiMenuAlt3 } from "react-icons/hi";
import { AiOutlineClose, AiOutlineLogout } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomButton from "./CustomButton";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


function MenuList({ auth, onClick }) {
  const dispatch = useDispatch(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    const result = dispatch(logout());
    if (result) {
      onClick();
      navigate("/");
    }
  };

  const authObject = JSON.parse(auth);
  const role = localStorage.getItem("role");
  return (
    <div>
      <Menu as='div' className='inline-block text-left'>
        <div className='flex'>
          <Menu.Button className="inline-flex items-center gap-2 w-full rounded-md bg-gray-200 md:px-4 py-2 px-2 text-sm font-medium text-slate-700 hover:bg-opacity-20">
            <div className='leading[80px] flex flex-col items-start'>
              <p className='text-sm f`ont-semibold '>
                {authObject?.name}
              </p>
              <span className='text-sm text-blue-600 '>
                {authObject?.email}
              </span>
            </div>

            <img
              src={authObject?.profileUrl}
              alt=''
              className='w-10 h-10 rounded-full object-cover '
            />
            <BiChevronDown className='h-8 w-8 text-slate-600' aria-hidden='true' />
          </Menu.Button>

        </div>

        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='absolute z-50 right-2 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg focus:outline-none'>
            <div className='p-1 '>
              {role === "user" && (
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="user-profile"
                      className={`${active ? "bg-blue-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md p-2 text-sm`}
                      onClick={onClick}
                    >
                      <CgProfile
                        className={`${active ? "text-white" : "text-gray-600"
                          } mr-2 h-5 w-5`}
                        aria-hidden='true'
                      />
                      Profile
                    </Link>
                  )}
                </Menu.Item>
              )}
              
              {
                role === "author" && (
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/account/author"
                        className={`${active ? "bg-blue-500 text-white" : "text-gray-900"
                          } group flex w-full items-center rounded-md p-2 text-sm`}
                        onClick={onClick}
                      >
                        <CgProfile
                          className={`${active ? "text-white" : "text-gray-600"
                            } mr-2 h-5 w-5`}
                          aria-hidden='true'
                        />
                        Author Session
                      </Link>
                    )}
                  </Menu.Item>
                )
              }

              {
                role === "admin" &&
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="account/dashboard"
                      className={`${active ? "bg-blue-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md p-2 text-sm`}
                      onClick={onClick}
                    >
                      <CgProfile
                        className={`${active ? "text-white" : "text-gray-600"
                          } mr-2 h-5 w-5`}
                        aria-hidden='true'
                      />
                      Admin Dashboard
                    </Link>
                  )}
                </Menu.Item>
              }

              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => handleLogout()}
                    className={`${active ? "bg-blue-500 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <AiOutlineLogout
                      className={`${active ? "text-white" : "text-gray-600"
                        } mr-2 h-5 w-5`}
                      aria-hidden='true'
                    />
                    
                    Log Out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

const Navbar = () => {
  const auth = localStorage.getItem("user");
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("token");


  useEffect(() => {
    setIsOpen(false);
  }, []);

  const handleCloseNavbar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div className='relative bg-gray-200 z-50'>
        <nav className='container mx-auto flex items-center justify-between p-5'>
          <div>
            <Link to='/' className='text-[#0261a6] font-bold text-xl'>
              Job<span className='text-[#2091e5]'>Vippro</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <ul className='hidden lg:flex text-[#0261a6] gap-10 text-base'>
            <li>
              <Link 
                to='/' 
                className='hover:text-blue-500 transition duration-300 ease-in-out'>
                Find Job
              </Link>
            </li>
            <li>
              <Link 
                to='/companies' 
                className='hover:text-blue-500 transition duration-300 ease-in-out'>
                Companies
              </Link>
            </li>
            <li>
              <Link 
                to='/blog' 
                className='hover:text-blue-500 transition duration-300 ease-in-out'>
                Blog
              </Link>
            </li>
            <li>
              <Link 
                to='/about-us' 
                className='hover:text-blue-500 transition duration-300 ease-in-out'>
                About
              </Link>
            </li>
          </ul>

          {/* Authentication/Profile Section */}
          <div className='hidden lg:block'>
            {!token ? (
              <Link to='/user-auth'>
                <CustomButton
                  title='Sign In'
                  containerStyles='text-[#0261a6] py-1.5 px-5 focus:outline-none hover:bg-blue-700 hover:text-white rounded-full text-base border border-blue-600 transition duration-300 ease-in-out'
                />
              </Link>
            ) : (
              <MenuList auth={auth} />
            )}
          </div>

          {/* Mobile Menu Icon */}
          <button
            className='block lg:hidden text-slate-900'
            onClick={handleCloseNavbar}
          >
            {isOpen ? <AiOutlineClose size={26} /> : <HiMenuAlt3 size={26} />}
          </button>
        </nav>

        {/* MOBILE MENU */}
        <div
          className={`${isOpen ? "absolute bg-gray-200 w-full flex flex-col items-start pl-8 gap-3 py-5" : "hidden"}`}
        >
          <Link to='/' onClick={handleCloseNavbar} className='hover:text-blue-500 transition duration-300 ease-in-out'>
            Find Job
          </Link>

          <Link to='/companies' onClick={handleCloseNavbar} className='hover:text-blue-500 transition duration-300 ease-in-out'>
            Companies
          </Link>

          <Link to='/blog' onClick={handleCloseNavbar} className='hover:text-blue-500 transition duration-300 ease-in-out'>
            Blog
          </Link>

          <Link to='/about-us' onClick={handleCloseNavbar} className='hover:text-blue-500 transition duration-300 ease-in-out'>
            About
          </Link>

          <div className='w-full py-10'>
            {!token ? (
              <Link to='/user-auth'>
                <CustomButton
                  title='Sign In'
                  containerStyles='text-blue-600 py-1.5 px-5 focus:outline-none hover:bg-blue-700 hover:text-white rounded-full text-base border border-blue-600 transition duration-300 ease-in-out'
                  onClick={handleCloseNavbar}
                />
              </Link>
            ) : (
              <MenuList auth={auth} onClick={handleCloseNavbar} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
