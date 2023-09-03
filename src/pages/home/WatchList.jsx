import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const WatchList = () => {
    return (
        <section id='lists'>
            <Container className='g-0' fluid>
                <Row>
                    <Col xl={12} className="best-seller">
                        <div className="content">
                            <h3>
                                Best Seller
                            </h3>
                            <p>
                                wrist watches for all tastes
                            </p>
                            <Link to='/Best-seller'>Shop now</Link>
                        </div>
                    </Col>
                    <Col className="col-item g-0" xl={4}>
                        <div className="items">
                            <Link to='/Mens-watches'>
                                <div className="man">
                                    <span>Men's watches</span>
                                    <button> Show now </button>
                                </div>
                            </Link>
                        </div>
                    </Col>
                    <Col className="col-item g-0" xl={4}>
                        <div className="items">
                            <Link to='/Womens-watches'>
                                <div className="women">
                                    <span>Women's watches</span>
                                    <button> Show now </button>
                                </div>
                            </Link>
                        </div>
                    </Col>
                    <Col className="col-item g-0" xl={4}>
                        <div className="items">
                            <Link to='/Kids-watches'>
                                <div className="kids">
                                    <span>Kid's watches</span>
                                    <button> Show now </button>
                                </div>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default WatchList