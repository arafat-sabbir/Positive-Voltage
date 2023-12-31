import { Link, NavLink, Outlet } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";

const Layout = () => {
  const Navlinks = (
    <>
      <li>
        <NavLink to={"/cart"} className="text-2xl ml-3">{FiShoppingCart}</NavLink>
      </li>
      <li>
        <NavLink to={"/signIn"}>Sign In</NavLink>
      </li>
    </>
  );
  return (
    <div>
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
                  <h3 className="text-2xl font-semibold tracking-wide">
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
                              className=" input  h-[40px] input-bordered focus:outline-none  join-item"
                              placeholder="Search For Products"
                            />
                          </div>
                        </div>
                        <div className="indicator">
                          <button className="py-2 px-2 h-[40px] bg-[#FB8038] hover:bg-[#FB8038] text-white join-item">Search</button>
                        </div>
                      </div>
                    </div>
                    {Navlinks}
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
              {Navlinks}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
