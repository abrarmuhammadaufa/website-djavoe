import { Link, useLocation } from "react-router-dom";
import "./NavbarFix.css"

function NavbarFix() {
    const location = useLocation();

    return (
        <nav className="navbar navbar-expand-sm" data-bs-theme="dark" style={{ backgroundColor: "#6E260E", fontFamily: "Work Sans, sans-serif" }}>
            {/* <nav className="navbar navbar-expand-lg bg-body-secondary"> */}
            <div className="container-md">
                <a className="navbar-brand" href="/"><img src="../../../logo_djavoe.png" alt="" width={60} /></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {/* <div class=""> */}
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
                            <Link className="nav-link" to="/">Beranda</Link>
                        </li>
                        <li className={`nav-item ${location.pathname === '/Jajan' ? 'active' : ''}`}>
                            <Link className="nav-link" to="/Jajan">Jajan</Link>
                        </li>
                        <li className={`nav-item ${location.pathname === '/PO' ? 'active' : ''}`}>
                            <Link className="nav-link" to="/Po">PO</Link>
                        </li>
                    </ul>
                </div>
                {/* </div> */}
            </div>
        </nav>
    );
}

export default NavbarFix;