import React, { useEffect, lazy, Suspense } from 'react'
const FavoritesProdcuts = lazy(() => import('../components/FavoritesProdcuts'));
import Loading from '../layout/Loading';

const Favorites = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main>
            <Suspense fallback={<Loading />}>
                <FavoritesProdcuts />
            </Suspense>
        </main>
    )
}

export default Favorites