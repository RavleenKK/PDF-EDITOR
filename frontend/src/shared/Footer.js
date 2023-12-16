import ongclogo from "../ongclogo.png";

const Footer = () => {
  return (
    <div className="footer">
      <br />

      <div className="d-flex justify-content-around">
        <div>
          <h4>
            <b>Useful Information</b>
          </h4>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <h6>Holidays 2023</h6>
            </li>
            <li className="nav-item mb-2">
              <h6>BDP</h6>
            </li>
            <li className="nav-item mb-2">
              <h6>e-Bill</h6>
            </li>
            <li className="nav-item mb-2">
              <h6>Photogallery</h6>
            </li>
            <li className="nav-item mb-2">
              <h6>About</h6>
            </li>
          </ul>
        </div>

        <div>
          <h4>
            <b>Important Links</b>
          </h4>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <h6>English to Hindi Dictionary</h6>
            </li>
            <li className="nav-item mb-2">
              <h6>Laptop Offers</h6>
            </li>
            <li className="nav-item mb-2">
              <h6>Archive</h6>
            </li>
            <li className="nav-item mb-2">
              <h6>Policy Documents</h6>
            </li>
            <li className="nav-item mb-2">
              <h6>Government Telephone Directory</h6>
            </li>
          </ul>
        </div>
      </div>
      <br />
    </div>
  );
};

export default Footer;
