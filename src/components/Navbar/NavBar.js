import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import logo from "../images/logo.png";
import CartWidget from "./CartWidget";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" className="logo-img" />
          </Navbar.Brand>
        </Link>
        <div className="d-inline-flex d-lg-none carrito">
        <CartWidget />
        </div>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto custom-nav-links text-center">
            <Link to="/category/AMINOÁCIDOS Y BCAA" className="nav-link">
              AMINOÁCIDOS Y BCAA
            </Link>
            <Link to="/category/PROTEINAS" className="nav-link">
              PROTEINAS
            </Link>
            <Link to="/category/CREATINA" className="nav-link">
              CREATINA
            </Link>
            <Link to="/category/QUEMADORES" className="nav-link">
              QUEMADORES
            </Link>
            <Link
              to="/category/PRE ENTRENOS CAFEINA Y BETA ALANINA"
              className="nav-link"
            >
              PRE ENTRENOS CAFEINA Y BETA ALANINA
            </Link>
            <Link to="/category/COLAGENO Y VITAMINAS" className="nav-link">
              COLAGENO Y VITAMINAS
            </Link>
          </Nav>
          <Nav className="ms-auto d-none d-lg-block">
            <CartWidget />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
