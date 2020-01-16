import React, { useState, useEffect } from "react";

//Utils
import { Link } from "react-router-dom";
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem
} from "reactstrap";

//Routes
import * as ROUTES from "../../constants/routes";

//Services
import { getUserStories } from "../../services/stories";

const Navigation = () => {
	const [stories, setStories] = useState([]);
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	useEffect(() => {
		async function fetchData() {
			try {
				const stories = await getUserStories();
				setStories(stories);
			} catch (error) {
				console.log(error);
			}
		}
		fetchData();
	}, []);

	return (
		<Navbar color='light' light expand='md'>
			<NavbarBrand href='/'>Jaskier</NavbarBrand>
			<NavbarToggler onClick={toggle} />
			<Collapse isOpen={isOpen} navbar>
				<Nav className='mr-auto' navbar>
					<NavItem>
						<NavLink tag={Link} to={ROUTES.HOME}>
							Home
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink tag={Link} to={ROUTES.SIGN_IN}>
							Sign In
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink tag={Link} to={ROUTES.SIGN_UP}>
							Sign Up
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink tag={Link} to={ROUTES.ACCOUNT}>
							Account
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink tag={Link} to={ROUTES.ADMIN}>
							Admin
						</NavLink>
					</NavItem>
					<UncontrolledDropdown nav inNavbar>
						<DropdownToggle nav caret>
							Stories
						</DropdownToggle>
						<DropdownMenu right>
							{stories
								? stories.map(story => (
										<DropdownItem key={story.story_id}>
											<NavLink tag={Link} to={`${ROUTES.STORY}/${story.story_slug}`}>
												{story.story_name}
											</NavLink>
										</DropdownItem>
								  ))
								: null}
							<DropdownItem divider />
							<DropdownItem>
								<NavLink tag={Link} to={ROUTES.NEW_STORY}>
									New Story
								</NavLink>
							</DropdownItem>
						</DropdownMenu>
					</UncontrolledDropdown>
				</Nav>
			</Collapse>
		</Navbar>
	);
};

export default Navigation;
