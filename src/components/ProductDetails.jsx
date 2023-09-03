import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { product_list } from '../assets/data/data';
import { useLocation } from 'react-router-dom';
import ImageZoom from "react-image-zooom";
import { useToggle } from '../hooks/useToggle';
import { toast, ToastContainer } from 'react-toastify';
import { addToBasket } from '../app/features/basket/getBasket';
import { useDispatch } from 'react-redux';

const ProductDetails = () => {
    const location = useLocation();
    const parts = location.pathname.split('/');
    const productName = parts[parts.length - 1];
    const filteredProduct = product_list.find(item => item.title === productName);
    const dispatch = useDispatch();

    const [selectedImage, setSelectedImage] = useState(filteredProduct.img);

    const handleImageClick = (imageSrc) => {
        setSelectedImage(imageSrc);
    };

    const [isDescriptionVisible, toggleDescription] = useToggle(true);

    const notifyAdd = () => {
        toast.success("Added to cart", {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    return (

        <section id='detail' >
            <Container>
                <Row>
                    <Col xl={5}>
                        <ImageZoom
                            src={selectedImage}
                            alt={filteredProduct.title}
                            zoom="300"
                            className='product-img'
                        />
                        <ul>
                            {filteredProduct.additionalImages.map((image, index) => (
                                <li key={index}>
                                    <img
                                        src={image}
                                        alt={filteredProduct.title}
                                        onClick={() => handleImageClick(image)}
                                        className='product-img'
                                    />
                                </li>
                            ))}
                        </ul>
                    </Col>
                    <Col xl={7}>
                        <div className="product-detail">
                            <h4 className='product-title'> {filteredProduct.title} </h4>
                            <span className="price">
                                {filteredProduct.price}$
                            </span>
                            <div className="quantity">
                                <span>Quantity</span>
                                <Form.Control value='1' />
                                <div onClick={notifyAdd}>
                                    <Button onClick={() => dispatch(addToBasket(filteredProduct))} className='w-100' variant='dark' type="button"> Add to cart </Button>
                                </div>
                            </div>
                            <div className="decs">
                                <button onClick={toggleDescription}>
                                    Description
                                    <svg className={`${isDescriptionVisible ? 'active' : ''}`} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512">
                                        <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                                    </svg>
                                </button>
                                <p className={`description ${isDescriptionVisible ? 'active' : ''}`}>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt alias nemo amet magni, sequi quos illo modi et perferendis impedit! Fugit quis beatae voluptatum quas doloremque voluptates harum aperiam vitae voluptas. Fugiat facilis accusamus provident quia sequi quidem nisi delectus consequatur, ex, iure magnam vero repellat qui corrupti nobis! Est.
                                </p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <ToastContainer />
        </section>
    );
}

export default ProductDetails;
