import React, { lazy, Suspense } from 'react';
import Loading from '../layout/Loading';
const AboutDetail = lazy(() => import('../components/AboutDetail'));

const About = () => {
    return (
        <main>
            <Suspense fallback={<Loading />}>
                <AboutDetail />
            </Suspense>
        </main>
    )
}

export default About