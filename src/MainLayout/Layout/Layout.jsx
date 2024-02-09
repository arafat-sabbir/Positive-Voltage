import { Link, NavLink, Outlet } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import useCurrentUserInfo from "../../Utility/Hooks/UseCurrentUserInfo/useCurrentUserInfo";
import useAuth from "../../Utility/Hooks/UseAuth/useAuth";
import { useEffect, useState } from "react";

const Layout = () => {
  const { userInfo, isLoading, refetch } = useCurrentUserInfo();
  const { user, signOutUser } = useAuth()
  console.log(userInfo, isLoading);
  const handleSignOut = () => {
    signOutUser()
      .then(res => { })
      .catch(err => { })
  }

  const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light")

  const [theme2, setTheme2] = useState(localStorage.getItem("theme2") ? localStorage.getItem("theme2") : "light")
  useEffect(() => {
    localStorage.setItem("theme", theme)
    localStorage.setItem("theme2", theme2)
    const htmlElement = document.querySelector("html");
    htmlElement.setAttribute("data-theme", theme)
    // Remove all existing classes from the element
    htmlElement.classList.remove(...htmlElement.classList);

    // Add the new class
    htmlElement.classList.add(theme2);
  }, [theme, theme2])

  const handleThemeChange = (e) => {
    if (e.target.checked) {
      setTheme("night")
      setTheme2("dark")
    } else {
      setTheme("light")
      setTheme2("light")
    }
  }

  const NavLinks = (
    <>
      <li>
        <NavLink to={"/cart"} className="text-2xl ml-3">
          {FiShoppingCart}
        </NavLink>
      </li>
      {user ? <li>
        <button onClick={handleSignOut}>Log Out</button>
      </li> : <li>
        <NavLink to={"/signIn"}>Sign In</NavLink>
      </li>}
    </>
  );
  return (
    <>
      <div>
        <div className="drawer">
          <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col">
            {/* Navbar */}
            <div className="bg-gray-">
              <div className="w-full  container mx-auto navbar ">
                <div className="flex-none lg:hidden">
                  <label
                    htmlFor="my-drawer-3"
                    aria-label="open sidebar"
                    className="btn btn-square btn-ghost"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block w-6 h-6 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      ></path>
                    </svg>
                  </label>
                </div>
                {/* Logo And Website Name */}
                <Link className="flex-1 px-2 mx-2" to={"/"}>
                  <img
                    src="https://i.ibb.co/3k8ffV1/Untitled-design-2.webp"
                    className="h-20 w-20"
                    alt=""
                  />
                  <h3 className="text-2xl dark:text-slate-100 font-semibold tracking-wide">
                    Positive Voltage
                  </h3>
                </Link>
                <div className="flex-none hidden lg:block ">
                  <ul className="menu menu-horizontal font-semibold">
                    {/* Navbar menu content here */}
                    <div>
                      <div className="join">
                        <div>
                          <div>
                            <input
                              className=" input bg-gray-100  h-[40px] input-bordered focus:outline-none  join-item"
                              placeholder="Search For Products"
                            />
                          </div>
                        </div>
                        <div className="indicator">
                          <button className="py-2 px-2 h-[40px] bg-[#FB8038] hover:bg-[#FB8038] text-white join-item">
                            Search
                          </button>
                        </div>
                      </div>
                    </div>
                    {NavLinks}
                    <div className="flex justify-center items-center">
                      <label className="cursor-pointer grid place-items-center mr-4">
                        <input checked={theme === "night"} onChange={handleThemeChange} type="checkbox" value="synthwave" className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2" />
                        <svg className="col-start-1 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
                        <svg className="col-start-2 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                      </label>
                    </div>

                  </ul>
                </div>
              </div>
            </div>
            {/* Page content here */}
            <Outlet></Outlet>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-3"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu p-4 w-80 min-h-full bg-base-200 font-semibold">
              {/* Sidebar content here */}
              {NavLinks}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
