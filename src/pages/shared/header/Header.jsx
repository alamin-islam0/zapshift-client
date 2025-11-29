import React from "react";
import { Link, NavLink } from "react-router";
import { GoArrowUpRight } from "react-icons/go";
import Logo from "../../../components/logo/Logo";
import useAuth from "../../../hooks/useAuth";

const Header = () => {

  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut()
    .then(result => {
        console.log(result)
    })
    .catch(error => {
        console.log(error)
    })
  }

  const links = (
    <>
      <li>
        <NavLink to="/services">Services</NavLink>
      </li>
      <li>
        <NavLink to="/coverage">Coverage</NavLink>
      </li>
      <li>
        <NavLink to="/about-us">About Us</NavLink>
      </li>
      <li>
        <NavLink to="/pricing">Pricing</NavLink>
      </li>
      <li>
        <NavLink to="/rider">Be a Rider</NavLink>
      </li>
    </>
  );
  return (
    <div className="pt-5 lg:pt-8 px-4 lg:px-0">
      <div className="navbar bg-base-100 shadow-sm container mx-auto rounded-full">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <div className=" btn-ghost">
            <Logo />
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-6 font-medium text-gray-600">
            {links}
          </ul>
        </div>
        <div className="navbar-end gap-4">
          {
            user? 
            <a
            onClick={handleLogOut}
            className="btn btn-ghost border border-gray-200 rounded-full px-6 hover:bg-gray-50"
          >
            Logout
          </a> :
          <Link
            to={"/register"}
            className="btn btn-ghost border border-gray-200 rounded-full px-6 hover:bg-gray-50"
          >
            Sign In
          </Link>
          }
          <a href="/rider" className="hidden lg:flex btn bg-[#D9F27E] hover:bg-[#cce865] text-black rounded-full px-2 pl-6 items-center gap-2 border-none">
            Be a rider
            <span className="bg-[#1A1A1A] text-white p-2 rounded-full">
              <GoArrowUpRight className="text-lg" />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
