import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import NavbarFix from '../components/NavbarFix';
import CardKonfirmasi from './CardKonfirmasi';
import AlertPo from '../components/alertPo';
import "../../index.css";
import "./po.css";


function Po() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalBeliShow, setModalBeliShow] = React.useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsVisible(false);
        }, 3000);
        return () => clearTimeout(timeoutId);
    }, []);

    const handleCardClick = ({ nama_barang, harga, kategori }) => {
        setSelectedProduct({ nama_barang, harga, kategori });
        setModalBeliShow(true);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await axios.get('http://localhost:4000/tampil-data-po');
                const response = await axios.get('${process.env.BASE_API_URL}/tampil-data-po');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();  // Call the fetchData function
    }, []);

    const addEllipsis = (str, maxLength) => {
        if (str.length > maxLength) {
            return str.slice(0, maxLength - 3) + "...";
        } else {
            return str;
        }
    };

    const renderH5 = (h5String) => {
        const maxLength = 26; // Set maximum length
        const shortenedH5 = addEllipsis(h5String, maxLength);
        return <h5>{shortenedH5}</h5>;
    };

    const containerStyle = {
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 1s ease-in-out',
        pointerEvents: isVisible ? 'auto' : 'none',
    };

    return (
        <>
            <NavbarFix />
            <div className='bg-light'>
                <div className="section container-xxl mt-3">
                    <div className='container-sm mb-5'>
                        <div className={isVisible ? 'container-sm' : 'container-sm hidden'} style={containerStyle}>
                            {isVisible && <AlertPo />}
                        </div>
                    </div>
                    <h2 className="posts-entry-title mb-5">Daftar Barang</h2>
                    <CardKonfirmasi
                        show={modalBeliShow}
                        onHide={() => setModalBeliShow(false)}
                        selectedProduct={selectedProduct}
                    />
                    {loading ? (
                        <div className="row justify-content-center d-flex mb-4">
                            <div className="col-mb-4 text-center">Loading...</div>
                        </div>
                    ) : (
                        <div className="row justify-content-center d-flex mb-4">
                            {data.map((data) => (
                                <div key={data.id_barang} className="col-mb-4 justify-content-center mb-4" style={{ width: '20.62rem' }}>
                                    <div className="card" style={{ width: '18rem', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {/* {data.image && <Image src={`http://localhost:4000/uploads/${data.image}`} id='ukuranGambar' alt={data.nama_barang} fluid />}
                                         */}
                                        {data.image && <Image src={`${process.env.BASE_API_URL}/uploads/${data.image}`}   id='ukuranGambar' alt={data.nama_barang} fluid />}
                                        <div className="card-body">
                                            <div className="text mb-2">
                                                {renderH5(data.nama_barang)}
                                                <span className="date">Rp {data.harga}</span>
                                            </div>
                                            <Button variant="success" onClick={() => handleCardClick(data)}>Beli</Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Po;
