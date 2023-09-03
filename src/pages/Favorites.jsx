import React, { useEffect } from 'react'
import FavoritesProdcuts from '../components/FavoritesProdcuts'

const Favorites = () => {
    
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    return (
        <main>
            <FavoritesProdcuts />
        </main>
    )
}

export default Favorites