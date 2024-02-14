import React, { useEffect } from 'react';
import AOS from 'aos';
import NavbarFix from '../components/NavbarFix';

function Home() {

    useEffect(() => {

        // Initialize AOS
        AOS.init({
            offset: 120,
            delay: 0,
            easing: 'ease',
            duration: 400,
            disable: false,
            once: false,
            startEvent: 'DOMContentLoaded',
            throttleDelay: 99,
            debounceDelay: 50,
            disableMutationObserver: false,
        });

        // Clean up AOS on component unmount
        return () => {
            AOS.refreshHard();
        };
    }, []);  // Empty dependency array to run the effect only once

    return (
        <>
            <NavbarFix />
            <section className="section bg-light">
                <div className="container">
                    <div class="row mb-4">
                        <div class="col-sm-6 mt-5">
                            <h2 class="posts-entry-title">Terlaris di Jajan</h2>
                        </div>
                    </div>
                    <div className='row align-items-strech retro-layout'>
                        <div className="col-md-4">
                            <a href="single.html" className="h-entry mb-30 v-height gradient">
                                <div className="featured-img" style={{ backgroundImage: 'url("https://i.pinimg.com/564x/e3/18/e6/e318e6e3aeacbf2d62f07733fd02d83a.jpg")' }} />
                                <div className="text">
                                    <span className="date">Rp 100.000</span>
                                    <h2>DON'T DON - The 2nd Repackage Album Super Junior</h2>
                                </div>
                            </a>
                            <a href="single.html" className="h-entry v-height gradient">
                                <div className="featured-img" style={{ backgroundImage: 'url("https://i.pinimg.com/564x/e3/18/e6/e318e6e3aeacbf2d62f07733fd02d83a.jpg")' }} />
                                <div className="text">
                                    <span className="date">Rp 100.000</span>
                                    <h2>DON'T DON - The 2nd Repackage Album Super Junior</h2>
                                </div>
                            </a>
                        </div>
                        <div className="col-md-4">
                            <a href="single.html" className="h-entry img-5 h-100 gradient">
                                <div className="featured-img" style={{ backgroundImage: 'url("https://i.pinimg.com/564x/e3/18/e6/e318e6e3aeacbf2d62f07733fd02d83a.jpg")' }} />
                                <div className="text">
                                    <span className="date">Rp 100.000</span>
                                    <h2>DON'T DON - The 2nd Repackage Album Super Junior</h2>
                                </div>
                            </a>
                        </div>
                        <div className="col-md-4">
                            <a href="single.html" className="h-entry mb-30 v-height gradient">
                                <div className="featured-img" style={{ backgroundImage: 'url("https://i.pinimg.com/564x/e3/18/e6/e318e6e3aeacbf2d62f07733fd02d83a.jpg")' }} />
                                <div className="text">
                                    <span className="date">Rp 100.000</span>
                                    <h2>DON'T DON - The 2nd Repackage Album Super Junior</h2>
                                </div>
                            </a>
                            <a href="single.html" className="h-entry v-height gradient">
                                <div className="featured-img" style={{ backgroundImage: 'url("https://i.pinimg.com/564x/e3/18/e6/e318e6e3aeacbf2d62f07733fd02d83a.jpg")' }} />
                                <div className="text">
                                    <span className="date">Rp 100.000</span>
                                    <h2>DON'T DON - The 2nd Repackage Album Super Junior</h2>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section Terlaris di PO */}
            <section className="section bg-light">
                <div className="container">
                    <div className="row mb-4">
                        <div className="col-sm-6 mt-5">
                            <h2 className="posts-entry-title">Terlaris di PO</h2>
                        </div>
                    </div>
                    <div className="row align-items-stretch retro-layout-alt">
                        <div className="col-md-5 order-md-2">
                            <a href="single.html" className="hentry img-1 h-100 gradient">
                                <div className="featured-img" style={{ backgroundImage: 'url("https://i.pinimg.com/564x/e3/18/e6/e318e6e3aeacbf2d62f07733fd02d83a.jpg")' }} />
                                <div className="text">
                                    <span className="date">Rp 100.000</span>
                                    <h2>DON'T DON - The 2nd Repackage Album Super Junior</h2>
                                </div>
                            </a>
                        </div>
                        <div className="col-md-7">
                            <a href="single.html" className="hentry img-2 v-height mb30 gradient">
                                <div className="featured-img" style={{ backgroundImage: 'url("https://i.pinimg.com/564x/e3/18/e6/e318e6e3aeacbf2d62f07733fd02d83a.jpg")' }} />
                                <div className="text text-sm">
                                    <span className="date">Rp 100.000</span>
                                    <h2>DON'T DON - The 2nd Repackage Album Super Junior</h2>
                                </div>
                            </a>
                            <div className="two-col d-block d-md-flex justify-content-between">
                                <a href="single.html" className="hentry v-height img-2 gradient">
                                    <div className="featured-img" style={{ backgroundImage: 'url("https://i.pinimg.com/564x/e3/18/e6/e318e6e3aeacbf2d62f07733fd02d83a.jpg")' }} />
                                    <div className="text text-sm">
                                        <span className="date">Rp 100.000</span>
                                        <h2>DON'T DON - The 2nd Repackage Album Super Junior</h2>
                                    </div>
                                </a>
                                <a href="single.html" className="hentry v-height img-2 ms-auto float-end gradient">
                                    <div className="featured-img" style={{ backgroundImage: 'url("https://i.pinimg.com/564x/e3/18/e6/e318e6e3aeacbf2d62f07733fd02d83a.jpg")' }} />
                                    <div className="text text-sm">
                                        <span className="date">Rp 100.000</span>
                                        <h2>DON'T DON - The 2nd Repackage Album Super Junior</h2>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section Jargon */}
            <div className="section sec-features mt-5" data-bs-theme="dark" style={{ backgroundColor: "#6E260E", fontFamily: "Work Sans, sans-serif" }}>
                <div className="container">
                    <div className="row g-5 mt-2">
                        <div className="col-lg-4" data-aos="fade-up" data-aos-delay={0}>
                            <div className="feature d-flex">
                                <span className="bi-bag-check-fill" />
                                <div>
                                    <h3>Mudah</h3>
                                    <p>Pelanggan dapat dengan mudah menikmati pengalaman belanja barang dari luar negeri dengan fasilitas pengiriman internasional yang cepat.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 text-white" data-aos="fade-up" data-aos-delay={100}>
                            <div className="feature d-flex">
                                <span className="bi-shield-fill-check" />
                                <div>
                                    <h3>Aman</h3>
                                    <p>Barang yang dipesan dipastikan aman sampai tujuan.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4" data-aos="fade-up" data-aos-delay={200}>
                            <div className="feature d-flex">
                                <span className="bi-clipboard2-check-fill" />
                                <div>
                                    <h3>Monitor</h3>
                                    <p>Barang akan terus dimonitor dimulai dari barang dipesan hingga sampai ke tangan pelanggan.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
