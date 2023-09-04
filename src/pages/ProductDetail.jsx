import React, { lazy, Suspense, useEffect } from 'react'
const ProductDetails = lazy(() => import('../components/ProductDetails'));
import Loading from '../layout/Loading';

const ProductDetail = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main>
            <Suspense fallback={<Loading />}>
                <ProductDetails />
            </Suspense>
        </main>
    )
}

export default ProductDetail