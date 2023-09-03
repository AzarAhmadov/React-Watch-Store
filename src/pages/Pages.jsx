import React from 'react'
import { BrowserRouter, useLocation } from "react-router-dom"
import { Route, Routes } from "react-router-dom"
import { Home } from './home/Home'
import Header from '../layout/Header'
import ProductList from '../components/ProductList'
import Footer from '../layout/Footer'
import Breadcrumb from '../layout/Breadcrumb'
import ProductDetail from './ProductDetail'
import FavoritesProdcuts from '../components/FavoritesProdcuts'
import { ShoppingCart } from '../components/ShoppingCart'
import Filter from '../components/Filter'
import { motion, AnimatePresence } from 'framer-motion';

const transition = {
    duration: 1,
    ease: 'easeInOut',
};

const animationVariants = {
    initial: {
        opacity: 0,
        x: -5,
    },
    animate: {
        opacity: 1,
        x: 0,
    },
    exit: {
        opacity: 0,
        x: 0,
    },
};

const AnimatedRoute = ({ element }) => {
    const location = useLocation();

    return (
        <motion.div
            key={location.pathname}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={animationVariants}
            transition={transition}
        >
            {element}
        </motion.div>
    );
};

const Pages = () => {
    return (
        <BrowserRouter>
            <Header />
            <ShoppingCart />
            <Routes>
                <Route path="/" element={
                    <AnimatedRoute element={
                        <Home />
                    }>
                    </AnimatedRoute>
                } />
                <Route path="/Products" element={
                    <AnimatedRoute element={
                        <>
                            <Breadcrumb />
                            <Filter />
                            <ProductList />
                        </>
                    }>
                    </AnimatedRoute>
                } />
                <Route path="/Best-seller" element={
                    <AnimatedRoute element={
                        <>
                            <Breadcrumb />
                            <Filter />
                            <ProductList />
                        </>
                    }>
                    </AnimatedRoute>
                } />
                <Route path="/Mens-watches" element={
                    <AnimatedRoute element={
                        <>
                            <Breadcrumb />
                            <Filter />
                            <ProductList />
                        </>
                    }>
                    </AnimatedRoute>
                } />
                <Route path="/Womens-watches" element={
                    <AnimatedRoute element={
                        <>
                            <Breadcrumb />
                            <Filter />
                            <ProductList />
                        </>
                    }>
                    </AnimatedRoute>
                } />
                <Route path="/Kids-watches" element={
                    <AnimatedRoute element={
                        <>
                            <Breadcrumb />
                            <Filter />
                            <ProductList />
                        </>
                    }>
                    </AnimatedRoute>
                } />
                <Route path="/Products/:productName" element={
                    <AnimatedRoute element={
                        <>
                            <Breadcrumb />
                            <ProductDetail />
                        </>
                    }>
                    </AnimatedRoute>
                } />
                <Route path="/Favorites" element={
                    <AnimatedRoute element={
                        <>
                            <Breadcrumb />
                            <FavoritesProdcuts />
                        </>
                    }>
                    </AnimatedRoute>
                } />
                <Route path="*" element={<>Sehife tapilmadi</>} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default Pages