import React, { lazy, useEffect } from 'react'
const ProductDetails = lazy(() => import('../components/ProductDetails'));

const ProductDetail = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main>
            <ProductDetails />
        </main>
    )
}

export default ProductDetail