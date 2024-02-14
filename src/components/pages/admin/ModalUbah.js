import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import axios from 'axios';

function ModalUbah(props) {
    const [namaBarang, setNamaBarang] = useState("");
    const [harga, setHarga] = useState("");
    const [kategori, setKategori] = useState("");
    const [kategoriOptions, setKategoriOptions] = useState([]);
    const [gambar, setGambar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (props.selectedProduct) {
            setNamaBarang(props.selectedProduct.nama_barang);
            setHarga(props.selectedProduct.harga);
            setKategori(props.selectedProduct.kategori);
            setGambar(props.selectedProduct.image);
        }
    }, [props.selectedProduct]);

    useEffect(() => {
        const fetchKategoriOptions = async () => {
            try {
                // const response = await axios.get('http://localhost:4000/kategori-options');
                const response = await axios.get('${process.env.BASE_API_URL}/kategori-options');
                setKategoriOptions(response.data);
            } catch (error) {
                console.error('Error fetching category options:', error);
            }
        };

        fetchKategoriOptions();
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
        setError(null);
        setSuccess(false);
        setLoading(true);

        const formData = new FormData();
        formData.append('nama_barang', namaBarang);
        formData.append('harga', harga);
        formData.append('kategori', kategori);

        if (gambar) {
            formData.append('image', gambar);
        }

        try {
            // const response = await axios.post(`http://localhost:4000/ubah-data-barang/${props.selectedProduct.id_barang}`
            const response = await axios.post(`${process.env.BASE_API_URL}/ubah-data-barang/${props.selectedProduct.id_barang}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response.data);
            setSuccess(true);
            setNamaBarang("");
            setHarga("");
            setKategori("");
            setGambar(null);
            console.log('Form Data:', formData);
        } catch (error) {
            console.error('Error updating data:', error);
            setError('Error updating data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleModalHide = () => {
        setSuccess(false);
        setError(null);
        setNamaBarang("");
        setHarga("");
        setKategori("");
        setGambar(null);
        props.onHide();
        window.location.reload();
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
                    Ubah Data Barang
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {success ? (
                    <Alert variant="success">
                        <Alert.Heading>Ubah Sukses!</Alert.Heading>
                        <p>Data barang telah berhasil diperbarui.</p>
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
                            <Form.Label>Harga (Rp)</Form.Label>
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
                        <div className="text-center">
                            <Button variant="primary" type="submit" disabled={loading}>
                                {loading ? 'Updating...' : 'Update'}
                            </Button>
                        </div>
                    </Form>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleModalHide} disabled={loading}>
                    {success || error ? 'Tutup' : 'Close'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalUbah;
