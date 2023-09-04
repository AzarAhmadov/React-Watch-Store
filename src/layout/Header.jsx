import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { toggle } from '../app/features/Cart/getCart';
import { Link } from 'react-router-dom'
import { useToggle } from '../hooks/useToggle';

const Header = () => {

    const dispatch = useDispatch();

    const openMenu = () => {
        dispatch(toggle())
    }

    const basket = useSelector((state) => state.basket.items);
    const favorites = useSelector((state) => state.product.selectedProduct);

    const [isDescriptionVisible, toggleDescription] = useToggle(false);

    return (
        <>
            <header id='header'>
                <Container>
                    <Row>
                        <Col className='logo col-4'>
                            <Link to='/'> Watch Store
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13 8h-2v5h5v-2h-3z"></path><path d="M19.999 12c0-2.953-1.612-5.53-3.999-6.916V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2.083C5.613 6.469 4.001 9.047 4.001 12a8.003 8.003 0 0 0 4.136 7H8v2.041a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V19h-.139a8 8 0 0 0 4.138-7zm-8 5.999A6.005 6.005 0 0 1 6.001 12a6.005 6.005 0 0 1 5.998-5.999c3.31 0 6 2.691 6 5.999a6.005 6.005 0 0 1-6 5.999z"></path></svg>
                            </Link>
                        </Col>
                        <Col className='col-8' >
                            <nav className='nav'>
                                <ul className='list'>
                                    <li className='list-item'> <Link className='list-link' to='/'> Home </Link> </li>
                                    <li className='list-item'> <Link className='list-link' to='/Products'> Products </Link> </li>
                                    <li className='list-item'> <Link className='list-link' to='/Best-seller'> Best seller </Link> </li>
                                    <li className='list-item'> <Link className='list-link' to='/About'> About </Link> </li>
                                    <li className='list-item'>
                                        <Link to='/favorites'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412l7.332 7.332c.17.299.498.492.875.492a.99.99 0 0 0 .792-.409l7.415-7.415c2.354-2.354 2.354-6.049-.002-8.416a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595zm6.791 1.61c1.563 1.571 1.564 4.025.002 5.588L12 18.586l-6.793-6.793c-1.562-1.563-1.561-4.017-.002-5.584.76-.756 1.754-1.172 2.799-1.172s2.035.416 2.789 1.17l.5.5a.999.999 0 0 0 1.414 0l.5-.5c1.512-1.509 4.074-1.505 5.584-.002z"></path></svg>
                                        </Link>
                                        {favorites.length === 0 ? <></> : <span className="selected">  {favorites.length}  </span>}
                                    </li>
                                    <li className='list-item'>
                                        <svg onClick={openMenu} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 22h14c1.103 0 2-.897 2-2V9a1 1 0 0 0-1-1h-3V7c0-2.757-2.243-5-5-5S7 4.243 7 7v1H4a1 1 0 0 0-1 1v11c0 1.103.897 2 2 2zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v1H9V7zm-4 3h2v2h2v-2h6v2h2v-2h2l.002 10H5V10z"></path></svg>
                                        {basket.length === 0 ? <></> : <span className="selected">  {basket.length}  </span>}
                                    </li>
                                </ul>
                                <svg onClick={() => toggleDescription(false)} className='menu-bar' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path></svg>
                            </nav>
                        </Col>
                    </Row>
                </Container>
            </header>

            <section className={`mobile-menu ${isDescriptionVisible ? 'active' : ''}`}>
                <nav>
                    <ul>
                        <li onClick={() => toggleDescription(true)}> <Link to='/'> Home </Link> </li>
                        <li onClick={() => toggleDescription(true)}> <Link to='/Products'> Products </Link> </li>
                        <li onClick={() => toggleDescription(true)}>  <Link to='/Best-seller'> Best seller </Link> </li>
                        <li onClick={() => toggleDescription(true)}> <Link to='/About'> About </Link> </li>
                    </ul>
                </nav>

                <div onClick={() => toggleDescription(true)} className="close">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
                </div>

                <div className="logo">
                    <span> Watch store </span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13 8h-2v5h5v-2h-3z"></path><path d="M19.999 12c0-2.953-1.612-5.53-3.999-6.916V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2.083C5.613 6.469 4.001 9.047 4.001 12a8.003 8.003 0 0 0 4.136 7H8v2.041a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V19h-.139a8 8 0 0 0 4.138-7zm-8 5.999A6.005 6.005 0 0 1 6.001 12a6.005 6.005 0 0 1 5.998-5.999c3.31 0 6 2.691 6 5.999a6.005 6.005 0 0 1-6 5.999z"></path></svg>
                </div>
            </section>

            <section id='mobile'>
                <ul>
                    <li>
                        <svg onClick={openMenu} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 22h14c1.103 0 2-.897 2-2V9a1 1 0 0 0-1-1h-3V7c0-2.757-2.243-5-5-5S7 4.243 7 7v1H4a1 1 0 0 0-1 1v11c0 1.103.897 2 2 2zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v1H9V7zm-4 3h2v2h2v-2h6v2h2v-2h2l.002 10H5V10z"></path></svg>
                        {basket.length === 0 ? <></> : <span className="selected">  {basket.length}  </span>}
                    </li>
                    <li>
                        <Link to='/favorites'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412l7.332 7.332c.17.299.498.492.875.492a.99.99 0 0 0 .792-.409l7.415-7.415c2.354-2.354 2.354-6.049-.002-8.416a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595zm6.791 1.61c1.563 1.571 1.564 4.025.002 5.588L12 18.586l-6.793-6.793c-1.562-1.563-1.561-4.017-.002-5.584.76-.756 1.754-1.172 2.799-1.172s2.035.416 2.789 1.17l.5.5a.999.999 0 0 0 1.414 0l.5-.5c1.512-1.509 4.074-1.505 5.584-.002z"></path></svg>
                        </Link>
                        {favorites.length === 0 ? <></> : <span className="selected">  {favorites.length}  </span>}
                    </li>
                </ul>
            </section>
        </>
    )
}

export default Header