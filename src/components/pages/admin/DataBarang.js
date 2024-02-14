import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import ModalTambah from './ModalTambah';
import ModalUbah from "./ModalUbah";
import ModalHapus from "./ModalHapus";
import { Image } from "react-bootstrap";
import logoDjavoe from "./img/logo.png";
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import LogoutIcon from '@mui/icons-material/LogoutOutlined';
import ArticleIcon from "@mui/icons-material/Article";

function DataBarang() {
    const [modalTambahShow, setModalTambahShow] = React.useState(false);
    const [modalUbahShow, setModalUbahShow] = React.useState(false);
    const [modalHapusShow, setModalHapusShow] = React.useState(false);
    const [barangData, setBarangData] = useState([]);
    const [selectedProductForChange, setSelectedProductForChange] = useState(null);
    const [selectedProductForDelete, setSelectedProductForDelete] = useState(null);


    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/admin/login');
    };

    const handleCardEditClick = ({ id_barang, nama_barang, harga, kategori }) => {
        setSelectedProductForChange({ id_barang, nama_barang, harga, kategori });
        setModalUbahShow(true);
    };

    const handleCardDeleteClick = ({ id_barang, nama_barang, harga, kategori }) => {
        setSelectedProductForDelete({ id_barang, nama_barang, harga, kategori });
        setModalHapusShow(true);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await axios.get('http://localhost:4000/tampil-data-barang');
                const response = await axios.get('${process.env.BASE_API_URL}/tampil-data-barang');
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
                                <h1 className="h3 mb-2 text-gray-800">Data Barang</h1>
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
                                                <h6 className="m-0 font-weight-bold text-primary">Tabel Data Barang</h6>
                                                {/* Button trigger modal tambah data */}
                                                <Button className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" variant="primary" onClick={() => setModalTambahShow(true)}>
                                                    Tambah Data Barang
                                                </Button>
                                                <ModalTambah
                                                    show={modalTambahShow}
                                                    onHide={() => setModalTambahShow(false)}
                                                />
                                                <ModalUbah
                                                    show={modalUbahShow}
                                                    onHide={() => setModalUbahShow(false)}
                                                    selectedProduct={selectedProductForChange}
                                                />
                                                <ModalHapus
                                                    show={modalHapusShow}
                                                    onHide={() => setModalHapusShow(false)}
                                                    selectedProduct={selectedProductForDelete}
                                                />
                                            </div>
                                            {/* Card Body */}
                                            <div className="card-body">
                                                <div className="table-responsive">
                                                    <table className="table table-bordered">
                                                        <thead>
                                                            <tr className="text-center">
                                                                <th className="col-sm-1">No</th>
                                                                <th className="col-md-3">Nama Barang</th>
                                                                <th className="col-md-1">Kategori</th>
                                                                <th className="col-md-1">Harga</th>
                                                                <th className="col-md-3">Image</th>
                                                                <th className="col-md-1">Aksi</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {barangData.map((barang, index) => (
                                                                <tr key={index} className="text-center">
                                                                    <td>{index + 1}</td>
                                                                    <td>{barang.nama_barang}</td>
                                                                    <td>{barang.kategori}</td>
                                                                    <td>Rp {new Intl.NumberFormat('id-ID').format(barang.harga)}</td>
                                                                    <td>
                                                                        {/* {barang.image && <Image src={`http://localhost:4000/uploads/${barang.image}`} style={{ maxWidth: '120px' }} alt={barang.nama_barang} fluid />} */}
                                                                        <a href={`${process.env.BASE_API_URL}/uploads/${barang.image}`} alt={barang.image} target="_blank" rel="noreferrer">
                                                                            {barang.image && <Image src={`${process.env.BASE_API_URL}/uploads/${barang.image}`} style={{ maxWidth: '120px' }} alt={barang.image} fluid />}
                                                                        </a>
                                                                    </td>
                                                                    <td>
                                                                        {/* Your action buttons */}
                                                                        <button type="button" className="btn btn-dark mr-2" data-toggle="modal" data-target="#Modaledit" onClick={() => handleCardEditClick(barang)}>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                                                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                                                            </svg>
                                                                        </button>
                                                                        <button type="submit" name="submit" className="btn btn-danger btn-flat" onClick={() => handleCardDeleteClick(barang)}>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                                                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                                                            </svg>
                                                                        </button>
                                                                    </td>
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
                {/* End of Page Wrapper */}
                {/* Scroll to Top Button*/}
                <a className="scroll-to-top rounded" href="#page-top">
                    <i className="fas fa-angle-up" />
                </a>
                {/* Logout Modal*/}
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

export default DataBarang;
