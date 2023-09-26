import { Link } from "react-router-dom";

const SideNav = () => {
  return (
    <div className="w-1/3  h-full  flex flex-col justify-start items-start border-r-2 pt-5 pl-5">
      <div className="w-[50%]  flex flex-col justify-start items-end">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/tags">Tags</Link>
            </li>
            <li>
              <Link to="/user">User</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SideNav;
