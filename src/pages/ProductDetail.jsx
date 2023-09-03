import React, { useEffect } from 'react'
import ProductDetails from '../components/ProductDetails'

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