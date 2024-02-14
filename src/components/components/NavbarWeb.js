import React, { useEffect, useState } from 'react';

const NavbarWeb = () => {
    useEffect(() => {
        const siteMenuClone = () => {
            const cloneNavs = document.querySelectorAll('.js-clone-nav');
            const siteMobileMenuBody = document.querySelector('.site-mobile-menu-body');

            cloneNavs.forEach((nav) => {
                const navCloned = nav.cloneNode(true);
                navCloned.setAttribute('class', 'site-nav-wrap');
                siteMobileMenuBody.appendChild(navCloned);
            });

            setTimeout(() => {
                const hasChildrens = document.querySelector('.site-mobile-menu').querySelectorAll('.has-children');

                let counter = 0;

                hasChildrens.forEach((hasChild) => {
                    const refEl = hasChild.querySelector('a');

                    const newElSpan = document.createElement('span');
                    newElSpan.setAttribute('class', 'arrow-collapse collapsed');

                    hasChild.insertBefore(newElSpan, refEl);

                    const arrowCollapse = hasChild.querySelector('.arrow-collapse');
                    arrowCollapse.setAttribute('data-bs-toggle', 'collapse');
                    arrowCollapse.setAttribute('data-bs-target', '#collapseItem' + counter);

                    const dropdown = hasChild.querySelector('.dropdown');
                    dropdown.setAttribute('class', 'collapse');
                    dropdown.setAttribute('id', 'collapseItem' + counter);

                    counter++;
                });
            }, 1000);

            const menuToggle = document.querySelectorAll('.js-menu-toggle');

            menuToggle.forEach((mtoggle) => {
                mtoggle.addEventListener('click', (e) => {
                    if (document.body.classList.contains('offcanvas-menu')) {
                        document.body.classList.remove('offcanvas-menu');
                        mtoggle.classList.remove('active');
                    } else {
                        document.body.classList.add('offcanvas-menu');
                        mtoggle.classList.add('active');
                    }
                });
            });

            const specifiedElement = document.querySelector('.site-mobile-menu');

            document.addEventListener('click', (event) => {
                const isClickInside = specifiedElement.contains(event.target);

                if (!isClickInside) {
                    if (document.body.classList.contains('offcanvas-menu')) {
                        document.body.classList.remove('offcanvas-menu');
                        menuToggle.forEach((mtoggle) => mtoggle.classList.remove('active'));
                    }
                }
            });
        };

        siteMenuClone();
    }, []);

    return <div>
        <div className="site-mobile-menu site-navbar-target">
            <div className="site-mobile-menu-header">
                <div className="site-mobile-menu-close">
                    <span className="icofont-close js-menu-toggle" />
                </div>
            </div>
            <div className="site-mobile-menu-body" />
        </div>
        <nav className="site-nav">
            <div className="container">
                <div className="menu-bg-wrap">
                    <div className="site-navigation">
                        <div className="row g-0 align-items-center">
                            <div className="col-2">
                                <a href="index.html" className="logo m-0 float-start">Blogy<span className="text-primary">.</span></a>
                            </div>
                            <div className="col-8 text-center">
                                <form action="#" className="search-form d-inline-block d-lg-none">
                                    <input type="text" className="form-control" placeholder="Search..." />
                                    <span className="bi-search" />
                                </form>
                                <ul className="js-clone-nav d-none d-lg-inline-block text-start site-menu mx-auto">
                                    <li className="active"><a href="index.html">Home</a></li>
                                    <li className="has-children">
                                        <a href="category.html">Pages</a>
                                        <ul className="dropdown">
                                            <li><a href="search-result.html">Search Result</a></li>
                                            <li><a href="blog.html">Blog</a></li>
                                            <li><a href="single.html">Blog Single</a></li>
                                            <li><a href="category.html">Category</a></li>
                                            <li><a href="about.html">About</a></li>
                                            <li><a href="contact.html">Contact Us</a></li>
                                            <li><a href="/">Menu One</a></li>
                                            <li><a href="/">Menu Two</a></li>
                                            <li className="has-children">
                                                <a href="/">Dropdown</a>
                                                <ul className="dropdown">
                                                    <li><a href="/">Sub Menu One</a></li>
                                                    <li><a href="/">Sub Menu Two</a></li>
                                                    <li><a href="/">Sub Menu Three</a></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li><a href="category.html">Culture</a></li>
                                    <li><a href="category.html">Business</a></li>
                                    <li><a href="category.html">Politics</a></li>
                                </ul>
                            </div>
                            <div className="col-2 text-end">
                                <a href="/" className="burger ms-auto float-end site-menu-toggle js-menu-toggle d-inline-block d-lg-none light">
                                    <span />
                                </a>
                                <form action="#" className="search-form d-none d-lg-inline-block">
                                    <input type="text" className="form-control" placeholder="Search..." />
                                    <span className="bi-search" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
</div >;
};

export default NavbarWeb;
