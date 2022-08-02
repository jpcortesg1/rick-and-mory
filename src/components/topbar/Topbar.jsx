import { Link, useLocation } from "react-router-dom";
import "./topbar.css";

export default function Topbar() {
  const { pathname } = useLocation();

  return (
    <div className="topbar">
      <div className="topbarLeft">
        <img
          src="https://1000marcas.net/wp-content/uploads/2022/04/Rick-and-Morty.png"
          alt="icon"
          className="topbarImg"
        />
      </div>
      <div className="topbarRight">
        <ul className="topbarRightItems">
          <li className="topbarRightItem">
            <Link to="/">
              <span className={`topbartText ${pathname === "/" && "active"}`}>
                Character
              </span>
            </Link>
          </li>
          <li className="topbarRightItem">
            <Link to="/locations">
              <span
                className={`topbartText ${
                  pathname === "/locations" && "active"
                }`}
              >
                Locations
              </span>
            </Link>
          </li>
          <li className="topbarRightItem">
            <Link to="/episodes">
              <span
                className={`topbartText ${
                  pathname === "/episodes" && "active"
                }`}
              >
                Episodes
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
