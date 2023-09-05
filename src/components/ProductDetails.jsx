import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useToggle } from '../hooks/useToggle';
import { toast, ToastContainer } from 'react-toastify';
import { addToBasket } from '../app/features/basket/getBasket';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite, setSelectedProduct } from '../app/features/favorite/getFavorite';
import { GraphQLClient, gql } from 'graphql-request';

const ProductDetails = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await graphcms.request(QUERY);
                setProducts(data.products);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    const graphcms = new GraphQLClient('https://api-us-west-2.hygraph.com/v2/cljesksx20jv901un4i94aw4y/master')

    const QUERY = gql`
    {
    products {
        title,
        id,
        price,
        category,
        description,
        path,
        img {
          id,
          url
        },
        additionalImages {
          id
          image {
            id,
            url
          }
        }
      } 
    }
    `
    const location = useLocation();
    const parts = location.pathname.split('/');
    const productName = parts[parts.length - 1];
    const filteredProduct = products.find(item => item.path === productName);
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.product.favorites);
    const [selectedImage, setSelectedImage] = useState();
    const [isAddedToFavorites, setIsAddedToFavorites] = useState(false);

    useEffect(() => {
        if (favorites.includes(filteredProduct?.id)) {
            setIsAddedToFavorites(true);
        } else {
            setIsAddedToFavorites(false);
        }
    }, [favorites, filteredProduct]);

    useEffect(() => {
        if (filteredProduct && filteredProduct.img && filteredProduct.img.url) {
            setSelectedImage(filteredProduct.img.url);
        }
    }, [filteredProduct]);

    const handleImageClick = (imageSrc) => {
        setSelectedImage(imageSrc);
    };

    const [isDescriptionVisible, toggleDescription] = useToggle(true);

    const notifyAdd = () => {
        toast.success("Added to cart", {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    const notifySuccess = () => {
        toast.success("Added to favorites", {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    return (

        <section id='detail' >
            <Container>
                <Row>
                    <Col xl={5}>
                        <div className='img-tops'>
                            <img
                                src={selectedImage}
                                loading='lazy'
                                alt={filteredProduct?.title}
                                id='imageZoom'
                            />

                        </div>
                        <ul>
                            {filteredProduct?.additionalImages.map((image, index) => (
                                <li
                                    key={index}
                                >
                                    <img
                                        src={image?.image.url}
                                        alt={filteredProduct?.title}
                                        loading='lazy'
                                        onClick={() => handleImageClick(image?.image.url)}
                                        className='product-img'
                                    />
                                </li>
                            ))}
                        </ul>
                    </Col>
                    <Col xl={7}>
                        <div className="product-detail">
                            <h4 className='product-title'> {filteredProduct?.title} </h4>
                            <span className="price">
                                {filteredProduct?.price}$
                            </span>
                            <div className="quantity">
                                <span>Quantity</span>
                                <Form.Control defaultValue='1' readOnly />
                                <div className='d-flex align-items-center justify-content-center w-100'>
                                    <div className='w-100'
                                        onClick={() => {
                                            if (!isAddedToFavorites) {
                                                dispatch(toggleFavorite(filteredProduct?.id));
                                                dispatch(setSelectedProduct(filteredProduct));
                                                setIsAddedToFavorites(true);
                                                notifySuccess();
                                            }
                                        }}
                                    >
                                        <Button
                                            className='w-100'
                                            variant={isAddedToFavorites ? 'outline-success' : 'outline-danger'}
                                            type="button"
                                        >
                                            {isAddedToFavorites ? "Added to favorites" : "Add to favorites"}
                                        </Button>
                                    </div>
                                    <div className='w-100 ms-3' onClick={notifyAdd}>
                                        <Button onClick={() => dispatch(addToBasket(filteredProduct))} className='w-100' variant='dark' type="button"> Add to cart </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="decs">
                                <button className='dec-btn' onClick={toggleDescription}>
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