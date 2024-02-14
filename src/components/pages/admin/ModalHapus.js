import React, { useState } from "react";
import { Modal, Button, Alert } from "react-bootstrap";
import axios from 'axios';

function ModalDelete(props) {
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    const handleDelete = async () => {
        try {
            console.log('props.selectedProduct:', props.selectedProduct);

            if (props.selectedProduct && props.selectedProduct.id_barang) {
                console.log('Deleting product with ID:', props.selectedProduct.id_barang);

                // const response = await axios.delete(`http://localhost:4000/hapus-barang/${props.selectedProduct.id_barang}`);
                const response = await axios.delete(`${process.env.BASE_API_URL}/hapus-barang/${props.selectedProduct.id_barang}`);
                console.log(response.data);
                setShowSuccessAlert(true);
            } else {
                console.error('Error deleting data: Selected product or its ID is null or undefined.');
                setShowErrorAlert(true);
            }
        } catch (error) {
            console.error('Error deleting data:', error);
            setShowErrorAlert(true);
        }
    };

    const handleModalHide = () => {
        setShowSuccessAlert(false);
        setShowErrorAlert(false);
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
                    Hapus Data Barang
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {showSuccessAlert ? (
                    <Alert variant="success">
                        <Alert.Heading>Hapus Sukses!</Alert.Heading>
                        <p>Data barang telah berhasil dihapus.</p>
                    </Alert>
                ) : showErrorAlert ? (
                    <Alert variant="danger">
                        <Alert.Heading>Error!</Alert.Heading>
                        <p>Terjadi kesalahan saat menghapus data barang.</p>
                    </Alert>
                ) : (
                    <p>Anda yakin ingin menghapus data barang ini?</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                {showSuccessAlert || showErrorAlert ? (
                    <Button onClick={handleModalHide}>Tutup</Button>
                ) : (
                    <>
                        <Button variant="danger" onClick={handleDelete}>
                            Hapus
                        </Button>
                        <Button onClick={handleModalHide}>Batal</Button>
                    </>
                )}
            </Modal.Footer>
        </Modal>
    );
}

export default ModalDelete;
