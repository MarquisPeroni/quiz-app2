import React, { useEffect } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN } from '../redux/actions';
import '../css/Home.css'; 
import backgroundImage from '../assets/citywallpaper.jpg';
import NavbarComponent from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  // Check for stored user in localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      dispatch({ type: LOGIN, payload: JSON.parse(storedUser) });
    }
  }, [dispatch]);

  return (
    
    <div className="home-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <NavbarComponent />
      <Container fluid className="text-container text-center p-5 mb-4 mx-4 rounded-3">
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8}>
            <h1 className="display-5 fw-bold text-light bordered-text">Test Your Knowledge!</h1>
            {!user ? (
              <p className="fs-4 text-light bordered-text">
                Login or register to start playing.
              </p>
            ) : (
              <p className="fs-4 text-light bordered-text">
                Choose a quiz to get started:
              </p>
            )}
            {!user ? (
              <>
                <Button variant="dark" as={Link} to="/login" className="me-2">
                  Login
                </Button>
                <Button variant="secondary" as={Link} to="/register">
                  Register
                </Button>
              </>
            ) : (
              <>
                <Button as={Link} to="/quiz/1" className="quiz-button ff me-2 mb-2">
                  <img src="https://cdn0.iconfinder.com/data/icons/weaponry-solid-collection/60/Weaponary_-_Solid_-_058_-_Buster_Sword-512.png" alt="Final Fantasy Icon" />
                  Final Fantasy VII
                </Button>
                <Button as={Link} to="/quiz/3" className="quiz-button er me-2 mb-2">
                  <img src="https://img.icons8.com/?size=100&id=tC7u2bGeJkdS&format=png&color=000000" alt="Elden Ring Icon" />
                  Elden Ring
                </Button>
                <Button as={Link} to="/quiz/2" className="quiz-button mg me-2 mb-2">
                  <img src="https://img.icons8.com/?size=100&id=392&format=png&color=000000" alt="Metal Gear Solid Icon" />
                  Metal Gear Solid 3
                </Button>
                <Button as={Link} to="/quiz/5" className="quiz-button pk me-2 mb-2">
                  <img src="https://img.icons8.com/?size=100&id=13862&format=png&color=000000" alt="Pokemon Icon" />
                  Pokemon G/S
                </Button>
                <Button as={Link} to="/quiz/4" className="quiz-button hk me-2 mb-2">
                  <img src="https://img.icons8.com/?size=100&id=iTkwwwqdX4t6&format=png&color=000000" alt="Hollow Knight Icon" />
                  Hollow Knight
                </Button>
              </>
            )}
          </Col>
        </Row>
      </Container>
      <Footer quote="No cloud, no squall shall hinder us." />
    </div>
  );
};

export default Home;
