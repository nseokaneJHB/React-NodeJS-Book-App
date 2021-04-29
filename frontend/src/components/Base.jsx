import { useState } from 'react';
import { MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBIcon } from 'mdbreact';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Custom Components
import Home from "./Home";
import About from "./About";

const Base = () => {
	// State
	const [collapse, setCollapse] = useState(false)

	// Navbar toggle
	const toggleNavbar = () => {
		setCollapse(!collapse)
	}

	// Navbar color
	const defaultBG = { backgroundColor: '#57bbb1' }

	return (
		<div>
			<BrowserRouter>
				<header>
					<MDBNavbar style={defaultBG} dark expand="md" scrolling fixed="top">
						<MDBContainer>
							<MDBNavbarBrand href="/">
								<strong>Navbar</strong>
							</MDBNavbarBrand>

							<MDBNavbarToggler onClick={toggleNavbar} />
							<MDBCollapse isOpen={collapse} navbar>
								<MDBNavbarNav left>
									<MDBNavItem>
										<MDBNavLink to="/"><MDBIcon fas icon="home" />&nbsp;Home</MDBNavLink>
									</MDBNavItem>
								</MDBNavbarNav>
								<MDBNavbarNav right>
									<MDBNavItem>
										<MDBNavLink to="/about"><MDBIcon fas icon="question-circle" />&nbsp;About</MDBNavLink>
									</MDBNavItem>
								</MDBNavbarNav>
							</MDBCollapse>
						</MDBContainer>
					</MDBNavbar>
				</header>
				<div className="mt-5 pt-5">
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route exact path="/about">
							<About />
						</Route>
					</Switch>
				</div>
			</BrowserRouter>
		</div>
	)
}

export default Base
