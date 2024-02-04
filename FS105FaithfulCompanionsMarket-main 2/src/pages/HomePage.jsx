import React from 'react'; 
import { Col, Row, Container } from "react-bootstrap";
import '../styles/HomePage.css';
import PromoBanner from '../components/PromoBanner';
import dogs from "../dogs"; // Adjust the path as necessary
import cats from "../cats";
import birds from "../birds";
import fishes from "../fishes";
import accessories from "../accessories";
import petfood from "../petfood.js"
import Footer from '../components/Footer';  
import Navbar from '../components/Navbar'; 
import Newsletter from '../components/Newsletter';
const HomePage = () => {

  /* This code below is to be called in the function toggle3DEffect */
  let currentActiveElement = null;

  /* Called into each card accordingly */
  function toggle3DEffect(event) {
    if (currentActiveElement) {
      currentActiveElement.classList.remove('shadow-3d');
    }
  
    const element = event.currentTarget;
    if (currentActiveElement !== element) {
      element.classList.add('shadow-3d');
      currentActiveElement = element;
    } else {
      currentActiveElement = null;
    }
  }

  return (
    <>
      <Navbar />
      <PromoBanner />
      <Container className="px-0">
      <Row>
         <h1><a href="/dogs" style={{ textDecoration: 'none', color: 'inherit' }}>Dogs</a></h1>
        {dogs.map((dog) => (
          <Col sm={12} md={6} lg={4} xl={2} key={dog._id} className="img-item" onClick={toggle3DEffect}>
            <div className="img-content">
              <h6>{dog.name}</h6>
              <img
                src={dog.image}
                alt={dog.name}
                className="img-centered"
              />
              <p>{dog.description}</p>
            </div>
          </Col>
        ))}
      </Row>
      <Row>
        <h1><a href="/cats" style={{ textDecoration: 'none', color: 'inherit' }}>Cats</a></h1>
        {cats.map((cat) => (
          <Col sm={12} md={6} lg={4} xl={2} key={cat._id} className="img-item" onClick={toggle3DEffect}>
            <div className="img-content">
              <h3>{cat.name}</h3>
              <img
                src={cat.image}
                alt={cat.name}
                className="img-centered"
              />
              <p>{cat.description}</p>
            </div>
          </Col>
        ))}
      </Row>
      <Row>
        <h1><a href="/birds" style={{ textDecoration: 'none', color: 'inherit' }}>Birds</a></h1>
        {birds.map((bird) => (
          <Col sm={12} md={6} lg={4} xl={2} key={bird._id} className="img-item" onClick={toggle3DEffect}>
            <div className="img-content">
              <h3>{bird.name}</h3>
              <img
                src={bird.image}
                alt={bird.name}
                className="img-centered"
              />
              <p>{bird.description}</p>
            </div>
          </Col>
        ))}
      </Row>
      <Row>
        <h1><a href="/fishes" style={{ textDecoration: 'none', color: 'inherit' }}>Fishes</a></h1>
        {fishes.map((fish) => (
          <Col sm={12} md={6} lg={4} xl={2} key={fish._id} className="img-item" onClick={toggle3DEffect}>
            <div className="img-content">
              <h3>{fish.name}</h3>
              <img
                src={fish.image}
                alt={fish.name}
                className="img-centered"
              />
              <p>{fish.description}</p>
            </div>
          </Col>
        ))}
      </Row>
      <Row>
        <h1><a href="/petaccessories" style={{ textDecoration: 'none', color: 'inherit' }}>Pet Accessories</a></h1>
        {accessories.map((accessory) => (
          <Col sm={12} md={6} lg={4} xl={2} key={accessory._id} className="img-item" onClick={toggle3DEffect}>
            <div className="img-content">
              <h3>{accessory.name}</h3>
              <img
                src={accessory.image}
                alt={accessory.name}
                className="img-centered"
              />
              <p>{accessory.description}</p>
            </div>
          </Col>
        ))}
      </Row>
      <Row>
        <h1><a href="/petfoods" style={{ textDecoration: 'none', color: 'inherit' }}>Pet Foods</a></h1>
        {petfood.map((petfood) => (
          <Col sm={12} md={6} lg={4} xl={2} key={petfood._id} className="img-item" onClick={toggle3DEffect}>
            <div className="img-content">
              <h3>{petfood.name}</h3>
              <img
                src={petfood.image}
                alt={petfood.name}
                className="img-centered"
              />
              <p>{petfood.description}</p>
            </div>
          </Col>
        ))}
      </Row>
      </Container>
      <Newsletter />
      <Footer />
      
    </>
  );
};

export default HomePage;
