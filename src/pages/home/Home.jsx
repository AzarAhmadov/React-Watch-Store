import React, { lazy, Suspense } from 'react';
const WatchList = lazy(() => import('./WatchList'));
import Loading from '../../layout/Loading';

export const Home = () => {
    return (
        <main>
            <Suspense fallback={<Loading />}>
                <WatchList />
            </Suspense>
        </main>
    )
}
