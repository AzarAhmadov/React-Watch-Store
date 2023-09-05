import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite, setSelectedProduct } from '../app/features/favorite/getFavorite';
import { addToBasket } from '../app/features/basket/getBasket';
import { toast, ToastContainer } from 'react-toastify';
import { GraphQLClient, gql } from 'graphql-request';

const ProductList = () => {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.product.favorites);
    const selectedFilter = useSelector((state) => state.sort.sortBy);
    const location = useLocation();
    const pathParts = location.pathname.slice(1).split('/');
    const [products, setProducts] = useState([]);
    const [visibleProducts, setVisibleProducts] = useState(products.slice(0, 8));
    const [currentPage] = useState(1);
    const productsPerPage = 8;

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

    let filteredProducts = products;
    const graphcms = new GraphQLClient('https://api-us-west-2.hygraph.com/v2/cljesksx20jv901un4i94aw4y/master');

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
    `;

    if (pathParts.length === 1 && pathParts[0] === 'Products') {
        filteredProducts = products;
    } else {
        pathParts.forEach((category) => {
            if (category) {
                filteredProducts = filteredProducts.filter((product) => product.category === category);
            }
        });
    }

    if (selectedFilter === 'lowToHigh') {
        visibleProducts.sort((a, b) => a.price - b.price);
    } else if (selectedFilter === 'highToLow') {
        visibleProducts.sort((a, b) => b.price - a.price);
    }

    const notifySuccess = () => {
        toast.success("Added to favorites", {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    const notifyAdd = () => {
        toast.success("Added to cart", {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    const notifyWarning = () => {
        toast.error("Removed from favorites", {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    useEffect(() => {
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const visible = filteredProducts.slice(startIndex, endIndex);

        setVisibleProducts((prevVisibleProducts) => {
            if (JSON.stringify(prevVisibleProducts) !== JSON.stringify(visible)) {
                return visible;
            }
            return prevVisibleProducts;
        });
    }, [currentPage, filteredProducts]);

    const handleLoadMoreClick = () => {
        const currentlyVisible = visibleProducts.length;
        const nextBatch = currentlyVisible + 8;
        setVisibleProducts(products.slice(0, nextBatch));
    };

    return (
        <section id='product-list'>
            <Container>
                <Row>
                    {
                        visibleProducts.map((el, idx) => (
                            <Col className='mt-3 g-3' key={idx} sm={6} lg={6} xl={3}>
                                <Card className='cards'>
                                    <Card.Img loading='lazy' className='img-top img-fluid' variant="top" alt={el.title} src={el.img.url} />
                                    <Card.Body>
                                        <Card.Title>{el.title}</Card.Title>
                                        <Card.Text className='fs-5'>
                                            {el.price}$
                                        </Card.Text>
                                        <div className='mt-2 d-flex'>
                                            <Link to={`/Products/${el.path}`} className='text-body preview'>Preview</Link>
                                            <div onClick={notifyAdd}>
                                                <Button onClick={() => dispatch(addToBasket(el))} className='ms-3' variant="dark"> Add to cart </Button>
                                            </div>
                                        </div>
                                    </Card.Body>
                                    <div className="heart"
                                        onClick={() => {
                                            dispatch(toggleFavorite(el.id));
                                            dispatch(setSelectedProduct(el));
                                        }}
                                    >
                                        {favorites.includes(el.id) ? (
                                            <svg onClick={notifyWarning} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                                <path
                                                    d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
                                                />
                                            </svg>
                                        ) : (
                                            <svg onClick={notifySuccess} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                                <path
                                                    d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v-3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"
                                                />
                                            </svg>
                                        )}
                                    </div>
                                </Card>
                            </Col>
                        ))
                    }
                    <div className='mt-2 mb-2'>
                        {visibleProducts.length < products.length && visibleProducts.length >= productsPerPage && (
                            <div className="text-center mt-3 mb-3">
                                <Button className='d-flex align-items-center justify-content-center m-auto' onClick={handleLoadMoreClick} variant="outline-dark">
                                    Load More
                                    <svg xmlns="http://www.w3.org/2000/svg" fill='#000' className='ms-2' height="1em" viewBox="0 0 512 512">
                                        <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
                                    </svg>
                                </Button>
                            </div>
                        )}
                    </div>
                </Row>
            </Container>
            <ToastContainer />
        </section>
    )
}

export default ProductList