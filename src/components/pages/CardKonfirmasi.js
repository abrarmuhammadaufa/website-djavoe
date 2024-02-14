import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import axios from 'axios';

function CardKonfirmasi(props) {
    const [namaBarang, setNamaBarang] = useState("");
    const [harga, setHarga] = useState("");
    const [namaLengkap, setNamaLengkap] = useState("");
    const [email, setEmail] = useState("");
    const [idLine, setIdLine] = useState("");
    const [kategori, setKategori] = useState("");
    const [gambar, setGambar] = useState(null);
    const [metodePembayaranOptions, setMetodePembayaranOptions] = useState([]);
    const [selectedMetodePembayaran, setMetodePembayaran] = useState('');
    const [showSuccessCard, setShowSuccessCard] = useState(false);

    useEffect(() => {
        if (props.selectedProduct) {
            setNamaBarang(props.selectedProduct.nama_barang);
            setHarga(props.selectedProduct.harga);
            setKategori(props.selectedProduct.kategori);
        }
    }, [props.selectedProduct]);

    useEffect(() => {
        const fetchMetodePembayaranOptions = async () => {
            try {
                // const response = await axios.get('http://localhost:4000/metode-pembayaran');
                const response = await axios.get('${process.env.BASE_API_URL}/metode-pembayaran');
                setMetodePembayaranOptions(response.data);
            } catch (error) {
                console.error('Error fetching metode pembayaran options:', error);
            }
        };

        fetchMetodePembayaranOptions();
    }, []);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        const allowedExtensions = ['jpg', 'jpeg', 'png'];
        const fileExtension = selectedFile.name.split('.').pop().toLowerCase();

        if (allowedExtensions.includes(fileExtension)) {
            setGambar(selectedFile);
        } else {
            e.target.value = null;
            alert('Invalid file type. Please select a JPG, JPEG, or PNG file.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nama_barang', namaBarang);
        formData.append('harga', harga);
        formData.append('kategori', kategori);
        formData.append('image', gambar);
        formData.append('nama_lengkap', namaLengkap);
        formData.append('email', email);
        formData.append('id_line', idLine);
        formData.append('metode_pembayaran', selectedMetodePembayaran);

        try {
            // const response = await axios.post('http://localhost:4000/tambah-order'
            const response = await axios.post('${process.env.BASE_API_URL}/tambah-order', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response.data);
            setShowSuccessCard(true);
            setNamaLengkap("");
            setEmail("");
            setIdLine("");
            setMetodePembayaran("");
            setGambar(null);
        } catch (error) {
            console.error('Error submitting order:', error);
        }
    };

    const handleModalHide = () => {
        setShowSuccessCard(false);
        setNamaLengkap("");
        setEmail("");
        setIdLine("");
        setMetodePembayaran("");
        setGambar(null);
        props.onHide();
    };

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={handleModalHide}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Konfirmasi Pesanan
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {showSuccessCard ? (
                    <Alert variant="success">
                        <Alert.Heading>Order Sukses!</Alert.Heading>
                        <p>Pesanan Anda telah berhasil disubmit.</p>
                        <p>Silakan masuk grup LINE pada <Alert.Link href="https://line.me/R/ti/g/4yyhYoa2Ln" target="_blank">tautan berikut.</Alert.Link></p>
                    </Alert>
                ) : (
                    <Form onSubmit={handleSubmit}>
                        <h5 className="mb-3">Barang</h5>
                        <Form.Group className="mb-3" controlId="formBasicNamaBarang">
                            <Form.Label>Nama Barang</Form.Label>
                            <Form.Control
                                type="text"
                                value={namaBarang}
                                onChange={(e) => setNamaBarang(e.target.value)}
                                required
                                disabled
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicHargaBarang">
                            <Form.Label>Harga (Rp)</Form.Label>
                            <Form.Control
                                type="text"
                                value={harga}
                                onChange={(e) => setHarga(e.target.value)}
                                required
                                disabled
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicRadioButtonKategori">
                            <Form.Label>Kategori</Form.Label>
                            <Form.Control
                                type="text"
                                value={kategori}
                                onChange={(e) => setKategori(e.target.value)}
                                required
                                disabled
                            >
                            </Form.Control>
                        </Form.Group>
                        <h5 className="mb-3 mt-4">Data Diri</h5>
                        <Form.Group className="mb-3" controlId="formBasicNamaLengkap">
                            <Form.Label>Nama Lengkap</Form.Label>
                            <Form.Control
                                type="text"
                                value={namaLengkap}
                                onChange={(e) => setNamaLengkap(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicIDLine">
                            <Form.Label>ID LINE</Form.Label>
                            <Form.Control
                                type="text"
                                value={idLine}
                                onChange={(e) => setIdLine(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <h5 className="mb-3 mt-4">Pembayaran</h5>
                        <Form.Group className="mb-3" controlId="formBasicRadioButtonMetodePembayaran">
                            <Form.Label>Metode Pembayaran</Form.Label>
                            <Form.Select
                                type="text"
                                value={selectedMetodePembayaran}
                                onChange={(e) => setMetodePembayaran(e.target.value)}
                                required
                            >
                                <option value="">Pilih Metode Pembayaran</option>
                                {metodePembayaranOptions.map((option) => (
                                    <option key={option.id} value={option.nama_metode}>
                                        {option.nama_metode}
                                    </option>
                                ))}
                            </Form.Select>
                            {selectedMetodePembayaran === 'BCA' && (
                                <>
                                    <p className="mt-3 text-danger">Transfer ke Nomor Rekening Berikut Sesuai Harga yang Ditampilkan Di Atas</p>
                                    <h1 className="mb-3">089746636 (BCA)</h1>
                                    <Form.Group controlId="formFile" className="mb-3">
                                        <Form.Label>Bukti Transfer</Form.Label><br />
                                        <Form.Control
                                            type="file"
                                            onChange={handleFileChange}
                                            accept=".jpg, .jpeg, .png"
                                            required
                                        />
                                        <Form.Label className="text-danger fs-6 mt-2" size="sm">Max Foto 5MB</Form.Label>
                                    </Form.Group>
                                </>
                            )}
                            {selectedMetodePembayaran === 'SHOPEEPAY' && (
                                <>
                                    <p className="mt-3 text-danger">Transfer ke Nomor ShopeePay Berikut Sesuai Harga yang Ditampilkan Di Atas</p>
                                    <h1 className="mb-3">081234567 (ShopeePay)</h1>
                                    <Form.Group controlId="formFile" className="mb-3">
                                        <Form.Label>Bukti Transfer</Form.Label><br />
                                        <Form.Control
                                            type="file"
                                            onChange={handleFileChange}
                                            accept=".jpg, .jpeg, .png"
                                            required
                                        />
                                        <Form.Label className="text-danger fs-6 mt-2" size="sm">Max Foto 5MB</Form.Label>
                                    </Form.Group>
                                </>
                            )}
                        </Form.Group>
                        <div className="text-center">
                            <Button className="mt-3" variant="primary" type="submit">
                                Submit
                            </Button>
                        </div>
                    </Form>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleModalHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CardKonfirmasi;
