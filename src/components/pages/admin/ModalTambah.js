import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import axios from 'axios';

function ModalTambah(props) {
    const [namaBarang, setNamaBarang] = useState("");
    const [harga, setHarga] = useState("");
    const [kategoriOptions, setKategoriOptions] = useState([]);
    const [kategori, setKategori] = useState("");
    const [gambar, setGambar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const apiURL = '${process.env.BASE_API_URL}/kategori-options';

    useEffect(() => {
        const fetchKategoriOptions = async () => {
            try {
                // const response = await axios.get('http://localhost:4000/kategori-options');
                const response = await axios.get(apiURL);
                setKategoriOptions(response.data);
            } catch (error) {
                console.error('Error fetching category options:', error);
            }
        };

        fetchKategoriOptions();
    }, []);

    const handleFileChange = (e) => {
        setGambar(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        setLoading(true);

        const formData = new FormData();
        formData.append('nama_barang', namaBarang);
        formData.append('harga', harga);
        formData.append('kategori', kategori);
        formData.append('image', gambar);

        try {
            // const response = await axios.post('http://localhost:4000/tambah-barang'
            const response = await axios.post('${process.env.BASE_API_URL}/tambah-barang', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response.data);
            setSuccess(true);
        } catch (error) {
            console.error('Error uploading data:', error);
            setError('Error uploading data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleModalHide = () => {
        setSuccess(false);
        setError(null);
        props.onHide();
        window.location.reload();
    };

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Tambah Barang
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {success ? (
                    <Alert variant="success">
                        <Alert.Heading>Tambah Sukses!</Alert.Heading>
                        <p>Item added successfully.</p>
                    </Alert>
                ) : error ? (
                    <Alert variant="danger">
                        <Alert.Heading>Error!</Alert.Heading>
                        <p>{error}</p>
                    </Alert>
                ) : (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicNamaBarang">
                            <Form.Label>Nama Barang</Form.Label>
                            <Form.Control
                                type="text"
                                value={namaBarang}
                                onChange={(e) => setNamaBarang(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicHargaBarang">
                            <Form.Label>Harga</Form.Label>
                            <Form.Control
                                type="text"
                                value={harga}
                                onChange={(e) => setHarga(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicRadioButtonKategori">
                            <Form.Label>Kategori</Form.Label>
                            <Form.Select
                                aria-label="Default select example"
                                value={kategori}
                                onChange={(e) => setKategori(e.target.value)}
                            >
                                <option>Choose</option>
                                {kategoriOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="formFile" className="mb-4">
                            <Form.Label>Gambar</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={handleFileChange}
                                accept=".jpg, .jpeg, .png"
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={loading}>
                            {loading ? 'Submitting...' : 'Submit'}
                        </Button>
                    </Form>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleModalHide} disabled={loading}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalTambah;
