import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toggle } from '../app/features/Cart/getCart';
import { removeFromBasket, addToBasket, updateQuantity } from '../app/features/basket/getBasket';
import { Link } from 'react-router-dom';

export const ShoppingCart = () => {
    const isOpen = useSelector((state) => state.toggle.isOpen);
    const dispatch = useDispatch();

    const closeMenu = () => {
        dispatch(toggle());
    }

    const basket = useSelector((state) => state.basket.items);
    const totalPrice = basket.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <>
            <section className={`cart ${isOpen ? 'active' : ''}`} id='cart'>
                <div className="cart-content">
                    <span className="cart-top"> Cart ({basket.length}) </span>
                    <div className='cart-area'>
                        {basket.length === 0 ? (
                            <p className='empty'>
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" /></svg>
                                Your cart is empty
                            </p>
                        ) : (
                            basket.map((el, idx) => (
                                <ul key={idx}>
                                    <li>
                                        <div className='left'>
                                            <div>
                                                <Link onClick={closeMenu} to={`/Products/${el.path}`}>
                                                    <img src={el.img?.url} alt={el.name} />
                                                </Link>
                                            </div>
                                            <div className='detail'>
                                                <Link onClick={closeMenu} className='title' to={`/Products/${el.path}`}>
                                                    {el.title}
                                                </Link>
                                                <span className="prices">
                                                    {el.price}$
                                                </span>
                                                <Button onClick={() => dispatch(removeFromBasket(el))} variant="outline-danger" style={{ width: 'max-content' }} className='btn pt-1 pb-1'> remove </Button>
                                            </div>
                                        </div>
                                        <div className='d-flex align-items-center justify-content-end'>
                                            <Button
                                                onClick={() => dispatch(addToBasket(el))}
                                                className="pt-1 pb-1"
                                                variant="dark"
                                            >
                                                +
                                            </Button>
                                            <Form.Control
                                                onChange={(e) => dispatch(updateQuantity({ id: el.id, quantity: parseInt(e.target.value) }))}
                                                className="w-25 ms-1 me-1 pt-1 pb-1"
                                                type="number"
                                                value={el.quantity}
                                                min={1}
                                            />

                                            <Button
                                                onClick={() => {
                                                    if (el.quantity > 1) {
                                                        dispatch(updateQuantity({ id: el.id, quantity: el.quantity - 1 }));
                                                    } else {
                                                        dispatch(removeFromBasket(el));
                                                    }
                                                }}
                                                className="pt-1 pb-1"
                                                variant="dark"
                                            >
                                                -
                                            </Button>
                                        </div>
                                    </li>
                                </ul>
                            ))
                        )}
                    </div>

                    <div className="total">
                        <ul>
                            <li>
                                Total
                            </li>
                            <li>
                                {totalPrice}$
                            </li>
                        </ul>
                        <button className='btn btn-dark'> Proceed to Checkout </button>
                    </div>

                    <div onClick={closeMenu} className="remove">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
                    </div>
                </div>
            </section>
        </>
    )
}
