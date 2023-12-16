import ongclogo from "../ongclogo.png";

const Header = () => {
  return (
    <div className="header">
      <a className="logo" href="/">
        <img src={ongclogo} alt="logo" height="70px" />
      </a>
      <nav>
        <ul className="nav__links">
          <li>
            <a href="#">HOME</a>
          </li>
          <li>
            <a
              href="#"
              className="btn1 btn-secondary dropdown-toggle"
              role="button"
              id="dropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              DEPARTMENTS
            </a>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <a className="dropdown-item" href="#">
                Action
              </a>
              <a className="dropdown-item" href="#">
                Another action
              </a>
              <a className="dropdown-item" href="#">
                Something else here
              </a>
            </div>
          </li>
          <li>
            <a href="#">DIRECTORY</a>
          </li>
          <li>
            <a
              href="#"
              className="btn1 btn-secondary dropdown-toggle"
              role="button"
              id="dropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              INTRANETS
            </a>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <a className="dropdown-item" href="#">
                Action
              </a>
              <a className="dropdown-item" href="#">
                Another action
              </a>
              <a className="dropdown-item" href="#">
                Something else here
              </a>
            </div>
          </li>
        </ul>
      </nav>
      <a className="cta" href="#">
        ABOUT US
      </a>
    </div>
  );
};

export default Header;
