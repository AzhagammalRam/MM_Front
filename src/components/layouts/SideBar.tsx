import React,{useState} from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import "./sidebar.css";

const SideBar: React.FC = () => {
  const user:any = useSelector((state: RootState) => state.auth.user);

  const [openMenu, setOpenMenu] = useState(null);

  const handleMenuClick = (menuId:any) => {
    setOpenMenu(openMenu === menuId ? null : menuId);
  };

  return (
    <>
      <aside className="sidebar">
        <button type="button" className="sidebar-close-btn">
          <iconify-icon icon="radix-icons:cross-2"></iconify-icon>
        </button>
        <div>
          <a href="index.html" className="sidebar-logo">
            <img
              src="assets/images/logo.png"
              alt="site logo"
              className="light-logo"
            />
            <img
              src="assets/images/logo-light.png"
              alt="site logo"
              className="dark-logo"
            />
            <img
              src="assets/images/logo-icon.png"
              alt="site logo"
              className="logo-icon"
            />
          </a>
        </div>
        <div className="sidebar-menu-area">
          <ul className="sidebar-menu" id="sidebar-menu">
            { user.role == 1 && <>
            <li className="">
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  `menu-link ${isActive ? "active" : ""}`
                }
              >
                <iconify-icon
                  icon="solar:home-smile-angle-outline"
                  className="menu-icon"
                ></iconify-icon>
                <span>&nbsp;&nbsp;Dashboard</span>
              </NavLink>
            </li> 
            </>
            }
            { (user.role == 1 ||  user.role == 2) && <>
            <li>
              <NavLink
                to="client"
                className={({ isActive }) =>
                  `menu-link ${isActive ? "active" : ""}`
                }
              >
                <iconify-icon icon="mdi:user-outline"></iconify-icon>
                &nbsp;&nbsp; Customer
              </NavLink>
            </li>
            <li>
              <NavLink
                to="material_inward"
                className={({ isActive }) =>
                  `menu-link ${isActive ? "active" : ""}`
                }
              >
                <iconify-icon icon="lets-icons:materials"></iconify-icon>
                &nbsp;&nbsp;Material Inward
              </NavLink>
            </li>
            <li>
              <NavLink
                to="cleaning"
                className={({ isActive }) =>
                  `menu-link ${isActive ? "active" : ""}`
                }
              >
                <iconify-icon icon="material-symbols-light:cleaning-services-outline"></iconify-icon>
                &nbsp;&nbsp; Short blasting
              </NavLink>
            </li>
            <li>
              <NavLink
                to="jobs"
                className={({ isActive }) =>
                  `menu-link ${isActive ? "active" : ""}`
                }
              >
                <iconify-icon icon="hugeicons:new-job"></iconify-icon>
                &nbsp;&nbsp; Production planning
              </NavLink>
            </li>
            </>}
            { (user.role == 1 ||  user.role == 3) && <>
            <li>
              <NavLink
                to="production_details"
                className={({ isActive }) =>
                  `menu-link ${isActive ? "active" : ""}`
                }
              >
                <iconify-icon icon="eos-icons:products"></iconify-icon>
                &nbsp;&nbsp;Production Details
              </NavLink>
            </li>
            <li>
              <NavLink
                to="filing_details"
                className={({ isActive }) =>
                  `menu-link ${isActive ? "active" : ""}`
                }
              >
                <iconify-icon icon="mdi:filing-cabinet"></iconify-icon>
                &nbsp;&nbsp; Filing Details
              </NavLink>
            </li>
            </> }
            <li>
              <NavLink
                to="dispatch_details"
                className={({ isActive }) =>
                  `menu-link ${isActive ? "active" : ""}`
                }
              >
                <iconify-icon icon="iconamoon:delivery-fast-thin"></iconify-icon>
                &nbsp;&nbsp;Dispatch Details
              </NavLink>
            </li>
           { user.role == 1 &&  <>
            <li className={`dropdown ${openMenu === 'setting' ? 'dropdown-open' : ''}`}  onClick={() => handleMenuClick('setting')}
            >
            <a href="#">
              <iconify-icon icon="icon-park-outline:setting-two" className="menu-icon"></iconify-icon>
              <span>&nbsp;&nbsp;Settings</span> 
             </a>
             <ul
                className="sidebar-submenu"
                style={{ display: openMenu === 'setting' ? 'block' : 'none' }}
              >
                <li>
                  <NavLink
                    to="floor"
                    className={({ isActive }) =>
                      `menu-link ${isActive ? "active" : ""}`
                    }
                  >
                    <iconify-icon icon="solar:floor-lamp-linear"></iconify-icon>
                    &nbsp;&nbsp; Floor
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="shift"
                    className={({ isActive }) =>
                      `menu-link ${isActive ? "active" : ""}`
                    }
                  >
                    <iconify-icon icon="fluent:shifts-16-regular"></iconify-icon>
                    &nbsp;&nbsp; Shift
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="role"
                    className={({ isActive }) =>
                      `menu-link ${isActive ? "active" : ""}`
                    }
                  >
                    <iconify-icon icon="carbon:user-role"></iconify-icon>
                    &nbsp;&nbsp; Role
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="user"
                    className={({ isActive }) =>
                      `menu-link ${isActive ? "active" : ""}`
                    }
                  >
                    <iconify-icon icon="mdi:user-key"></iconify-icon>
                    &nbsp;&nbsp; User
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="unit"
                    className={({ isActive }) =>
                      `menu-link ${isActive ? "active" : ""}`
                    }
                  >
                    <iconify-icon icon="ph:unite-bold"></iconify-icon>
                    &nbsp;&nbsp; Unit
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="material"
                    className={({ isActive }) =>
                      `menu-link ${isActive ? "active" : ""}`
                    }
                  >
                    <iconify-icon icon="icon-park:material-three"></iconify-icon>
                    &nbsp;&nbsp; Material
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="jobtype"
                    className={({ isActive }) =>
                      `menu-link ${isActive ? "active" : ""}`
                    }
                  >
                    <iconify-icon icon="carbon:batch-job"></iconify-icon>
                    &nbsp;&nbsp; Job type
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="jobtype_material"
                    className={({ isActive }) =>
                      `menu-link ${isActive ? "active" : ""}`
                    }
                  >
                    <iconify-icon icon="hugeicons:new-job"></iconify-icon>
                    &nbsp;&nbsp; Job type Material
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="inventory"
                    className={({ isActive }) =>
                      `menu-link ${isActive ? "active" : ""}`
                    }
                  >
                    <iconify-icon icon="ic:sharp-inventory"></iconify-icon>
                    &nbsp;&nbsp; Inventory
                  </NavLink>
                </li>
              </ul>
            </li>
            </>
            }
            <li>
              <NavLink
                to="logout"
                className={({ isActive }) =>
                  `menu-link ${isActive ? "active" : ""}`
                }
              >
                <iconify-icon icon="uiw:logout"></iconify-icon>
                &nbsp;&nbsp; Logout
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
