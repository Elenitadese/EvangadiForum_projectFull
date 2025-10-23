
import { Link } from "react-router-dom";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import footerimg from '../Imag/fimg.png';

export default function Footer() {
  return (
    <footer className="bg-dark text-white fixed-bottom">
      <div className="container">
        <div className="row g-4">

          {/* Logo & Social Icons */}
          <div className="col-md-4 py-1">
            <div className="fw-bold fs-4">
              <img
                src={footerimg}
                alt="Logo"
                style={{ width: "50%", height: "auto" }}
              />
            </div>
            <div className="d-flex gap-2 mt-1">
              <a href="#" className="text-white fs-5"><FacebookIcon /></a>
              <a href="#" className="text-white fs-5"><InstagramIcon /></a>
              <a href="#" className="text-white fs-5"><YouTubeIcon /></a>
            </div>
          </div>

          {/* Useful Links */}
          <div className="col-md-3 py-1 d-none d-md-block">
            <h5 className="fw-semibold mb-1 fs-6">Useful Links</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <Link to="/terms" className="text-white text-decoration-none">Terms of Service</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-white text-decoration-none">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 py-1 d-none d-md-block">
            <h5 className="fw-semibold mb-1 fs-6">Contact Info</h5>
            <p className="mb-1">support@evangadi.com</p>
            <p className="mb-0">+1-202-386-2702</p>
          </div>

        </div>

        {/* Copyright */}
        <div className="text-center mt-1 small">
          &copy; {new Date().getFullYear()} EVANGADI March 2025 Team3 | All rights reserved.
        </div>
      </div>
    </footer>
  );
}
