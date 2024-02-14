import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Image } from "react-bootstrap";
import logoDjavoe from "./img/logo.png";
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import ArticleIcon from '@mui/icons-material/Article';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import LogoutIcon from '@mui/icons-material/LogoutOutlined';

function Index() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/admin/login');
    };

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/admin/login');
            return;
        }
        const handleSidebarToggle = () => {
            document.body.classList.toggle('sidebar-toggled');
            document.querySelector('.sidebar').classList.toggle('toggled');
            if (document.querySelector('.sidebar').classList.contains('toggled')) {
                document.querySelectorAll('.sidebar .collapse').forEach((el) => el.classList.remove('show'));
            }
        };

        const handleWindowResize = () => {
            if (window.innerWidth < 768) {
                document.querySelectorAll('.sidebar .collapse').forEach((el) => el.classList.remove('show'));
            }

            if (window.innerWidth < 480 && !document.querySelector('.sidebar').classList.contains('toggled')) {
                document.body.classList.add('sidebar-toggled');
                document.querySelector('.sidebar').classList.add('toggled');
                document.querySelectorAll('.sidebar .collapse').forEach((el) => el.classList.remove('show'));
            }
        };

        document.getElementById('sidebarToggle').addEventListener('click', handleSidebarToggle);
        document.getElementById('sidebarToggleTop').addEventListener('click', handleSidebarToggle);
        window.addEventListener('resize', handleWindowResize);

        return () => {
            const sidebarToggle = document.getElementById('sidebarToggle');
            const sidebarToggleTop = document.getElementById('sidebarToggleTop');

            if (sidebarToggle) {
                sidebarToggle.removeEventListener('click', handleSidebarToggle);
            }
            if (sidebarToggleTop) {
                sidebarToggleTop.removeEventListener('click', handleSidebarToggle);
            }
            if (window) {
                window.removeEventListener('resize', handleWindowResize);
            }
        };
    }, []);

    return (
        <>
            <div>
                {/* Page Wrapper */}
                <div id="wrapper">
                    {/* Sidebar */}
                    <ul className="navbar-nav bg-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                        {/* Sidebar - Brand */}
                        <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/admin">
                            <div className="img-profile">
                                <Image className="img-profile rounded-circle" src={logoDjavoe} style={{ width: 60, height: 60, objectPosition: 'center' }} alt="" />
                            </div>
                            <div className="sidebar-brand-text mx-2">Admin Djavoe</div>
                        </a>
                        {/* Divider */}
                        <hr className="sidebar-divider my-0" />
                        {/* Nav Item - Dashboard */}
                        <li className="nav-item active">
                            <a className="nav-link" href="/admin">
                                <SpeedOutlinedIcon className="ml-2" />
                                <span className="ml-2">Dashboard</span></a>
                        </li>
                        {/* Divider */}
                        <hr className="sidebar-divider" />
                        {/* Heading */}
                        <div className="sidebar-heading">
                            Data
                        </div>
                        {/* Nav Item - Data Barang */}
                        <li className="nav-item">
                            <a className="nav-link collapsed" href="/admin/data-barang">
                                <SettingsIcon className="ml-2" />
                                <span className="ml-2">Data Barang</span>
                            </a>
                        </li>
                        {/* Nav Item - Data Transaksi */}
                        <li className="nav-item">
                            <a className="nav-link collapsed" href="/admin/data-transaksi">
                                <ArticleIcon className="ml-2" />
                                <span className="ml-2">Data Transaksi</span>
                            </a>
                        </li>
                        {/* Sidebar Toggler (Sidebar) */}
                        <div className="text-center d-none d-md-inline">
                            <button className="rounded-circle border-0 text-white" id="sidebarToggle">
                                <KeyboardArrowLeftOutlinedIcon />
                            </button>
                        </div>
                    </ul>
                    {/* End of Sidebar */}
                    {/* Content Wrapper */}
                    <div id="content-wrapper" className="d-flex flex-column">
                        {/* Main Content */}
                        <div id="content">
                            {/* Topbar */}
                            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                                {/* Sidebar Toggle (Topbar) */}
                                <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                                    <i className="fa fa-bars" />
                                </button>
                                {/* Topbar Navbar */}
                                <ul className="navbar-nav ml-auto">
                                    {/* Nav Item - Search Dropdown (Visible Only XS) */}
                                    <div className="topbar-divider d-none d-sm-block" />
                                    <a className="logout-item " href="/admin/login" data-toggle="modal" data-target="#logoutModal" onClick={handleLogout}>
                                        <LogoutIcon />
                                        <span className="ml-2">Logout</span>
                                    </a>
                                </ul>
                            </nav>
                            {/* End of Topbar */}
                            {/* Begin Page Content */}
                            <div className="container-fluid">
                                {/* Page Heading */}
                                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                    <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                                </div>
                                {/* Content Row */}
                                <div className="row">
                                    {/* Card Barang Terjual */}
                                    <div className="col-xl-6 col-md-6 mb-4">
                                        <div className="card border-left-primary shadow h-100 py-2">
                                            <div className="card-body">
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col mr-2">
                                                        <div className="text-xs font-weight-bold text-seccondary text-uppercase mb-1">
                                                            Barang Terjual</div>
                                                        <div className="h5 mb-0 font-weight-bold text-gray-800">95</div>
                                                    </div>
                                                    <div className="col-auto">
                                                        <i className="fas fa-clipboard-list fa-2x text-gray-300" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Card Barang Tersedia */}
                                    <div className="col-xl-6 col-md-6 mb-4">
                                        <div className="card border-left-primary shadow h-100 py-2">
                                            <div className="card-body">
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col mr-2">
                                                        <div className="text-xs font-weight-bold text-seccondary text-uppercase mb-1">
                                                            Barang Tersedia</div>
                                                        <div className="h5 mb-0 font-weight-bold text-gray-800">16</div>
                                                    </div>
                                                    <div className="col-auto">
                                                        <i className="fas fa-clipboard-list fa-2x text-gray-300" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Content Row */}
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12">
                                        {/* Illustrations */}
                                        <div className="card shadow mb-4">
                                            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                                <h6 className="m-0 font-weight-bold text-primary">Barang Terpopuler</h6>
                                            </div>
                                            {/* Card Body */}
                                            <div className="card-body">
                                                <div>
                                                    <table className="table table-bordered">
                                                        <thead>
                                                            <tr className="text-center text-nowrap">
                                                                <th className="col-md-1">No</th>
                                                                <th className="col-md-3">Nama Barang</th>
                                                                <th className="col-md-1">Kategori</th>
                                                                <th className="col-md-1">Jumlah Penjualan (pcs)</th>
                                                                <th className="col-md-1">Total Penjualan</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr className="text-center">
                                                                <td>1</td>
                                                                <td>Photocard Hueningkai Temptation Farewell ver</td>
                                                                <td>JAJANS</td>
                                                                <td>50</td>
                                                                <td>Rp {new Intl.NumberFormat('id-ID').format('4000000')}</td>

                                                            </tr>
                                                            <tr className="text-center">
                                                                <td>2</td>
                                                                <td>Photocard Soobin Temptation Daydream Ver</td>
                                                                <td>JAJANS</td>
                                                                <td>40</td>
                                                                <td>Rp {new Intl.NumberFormat('id-ID').format('3000000')}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* /.container-fluid */}
                        </div>
                        {/* End of Main Content */}
                        {/* Footer */}
                        <footer className="sticky-footer bg-white">
                            <div className="container my-auto">
                                <div className="copyright text-center my-auto">
                                    <span>Copyright © DJAVOE 2023</span>
                                </div>
                            </div>
                        </footer>
                        {/* End of Footer */}
                    </div>
                    {/* End of Content Wrapper */}
                </div>
                {/* End of Page Wrapper */}
            </div>
        </>
    );
}

export default Index;
