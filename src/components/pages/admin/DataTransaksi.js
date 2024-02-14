import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Image } from "react-bootstrap";
import logoDjavoe from "./img/logo.png";
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import LogoutIcon from '@mui/icons-material/LogoutOutlined';
import ArticleIcon from "@mui/icons-material/Article";

function DataTransaksi() {
    const [barangData, setBarangData] = useState([]);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/admin/login');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await axios.get('http://localhost:4000/tampil-data-transaksi');
                const response = await axios.get('${process.env.BASE_API_URL}/tampil-data-transaksi');
                setBarangData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token);

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

    function formatDate(dateString) {
        const options = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: false,
        };

        const formattedDate = new Date(dateString);
        return new Intl.DateTimeFormat('id-ID', options).format(formattedDate);
    }

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
                        {/* Nav Item - Pages Collapse Menu */}
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
                                    <a className="animated--grow-in dropdown-item " href="/admin/login" data-toggle="modal" data-target="#logoutModal" onClick={handleLogout}>
                                        <LogoutIcon />
                                        <span className="ml-2">Logout</span>
                                    </a>
                                </ul>
                            </nav>
                            {/* End of Topbar */}
                            {/* Begin Page Content */}
                            <div className="container-fluid">
                                {/* Page Heading */}
                                <h1 className="h3 mb-2 text-gray-800">Data Transaksi</h1>
                                <br />
                                {/* Content Row */}
                                <div className="row">
                                </div>
                                {/* Content Row */}
                                <div className="row">
                                </div>
                                {/* Content Row */}
                                <div className="row">
                                    {/* Tabel */}
                                    <div className="col-xl-12 col-lg-12">
                                        <div className="card shadow mb-4">
                                            {/* Card Header */}
                                            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                                <h6 className="m-0 font-weight-bold text-primary">Tabel Data Transaksi</h6>
                                            </div>
                                            {/* Card Body */}
                                            <div className="card-body">
                                                <div className="table-responsive">
                                                    <table className="table table-bordered">
                                                        <thead>
                                                            <tr className="text-nowrap text-center">
                                                                <th className="col-sm-1">No</th>
                                                                <th className="col-md-1">Nomor Transaksi</th>
                                                                <th className="col-md-1">Nama Customer</th>
                                                                <th className="col-md-1">Nama Barang</th>
                                                                <th className="col-md-1">Harga</th>
                                                                <th className="col-md-1">Metode Pembayaran</th>
                                                                <th className="col-md-3">Bukti Pembayaran</th>
                                                                <th className="col-md-1">Waktu Transaksi</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {barangData.map((barang, index) => (
                                                                <tr key={index} className="text-center">
                                                                    <td>{index + 1}</td>
                                                                    <td>{barang.nomor_transaksi}</td>
                                                                    <td>{barang.nama_lengkap}</td>
                                                                    <td>{barang.nama_barang}</td>
                                                                    <td>Rp {new Intl.NumberFormat('id-ID').format(barang.total_harga)}</td>

                                                                    <td>{barang.metode_pembayaran}</td>
                                                                    <td>
                                                                        {/* <a href={`http://localhost:4000/${barang.bukti_bayar}`} alt={barang.bukti_bayar} target="_blank" rel="noreferrer"> */}
                                                                        <a href={`${process.env.BASE_API_URL}/${barang.bukti_bayar}`} alt={barang.bukti_bayar} target="_blank" rel="noreferrer">
                                                                            {/* {barang.bukti_bayar && <Image src={`http://localhost:4000/${barang.bukti_bayar}`} style={{ maxWidth: '120px' }} alt={barang.bukti_bayar} fluid />} */}
                                                                            {barang.bukti_bayar && <Image src={`${process.env.BASE_API_URL}/${barang.bukti_bayar}`} style={{ maxWidth: '120px' }} alt={barang.bukti_bayar} fluid />}
                                                                        </a>
                                                                    </td>
                                                                    <td>{formatDate(barang.created_at)}</td>
                                                                </tr>
                                                            ))}
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
                <div className="modal fade" id="logoutModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                                <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                                <a className="btn btn-primary" href="login.html">Logout</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default DataTransaksi;
