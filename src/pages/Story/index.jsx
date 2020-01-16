import React, { useState, useEffect } from "react";

// Components
import Header from "../../components/Headers/Header";
import LoadingScreen from "../../components/Loaders/LoadingScreen";

//Utils
import { Button, Card, Nav, NavLink, NavItem, CardBody, TabContent, Container, Row, TabPane } from "reactstrap";
import { useParams } from "react-router-dom";
import classnames from "classnames";

// Pages
import StoryEdit from "./edit";
import StoryDelete from "./delete";
import StoryChapters from "./chapters";
import StorySettings from "./settings";

// Assets
import bgDefault from "../../assets/img/bg-campaign.png";

//Services
import { getStory } from "../../services/stories";
import { getChapters } from "../../services/data";

export default function Story(props) {
	const [tabs, setTabs] = useState(2);

	const [story, setStory] = useState();
	const [chapters, setChapters] = useState();

	let { storySlug } = useParams();
	const [slug, setSlug] = useState(storySlug);

	const [isAdmin] = useState(true);
	const [supervisor, setSupervisor] = useState();
	const [setRedirect] = useState();
	const [loading, setLoading] = useState(true);

	//ComponentDidMount
	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			try {
				const story = await getStory(storySlug);
				const chapters = await getChapters(storySlug);
				setStory(story);
				setChapters(chapters);
				if (story && chapters) setLoading(false);
			} catch (error) {
				console.log(error);
			}
		}
		fetchData();
	}, [storySlug]);

	const toggleNavs = nav => {
		setTabs(nav);
	};

	const actionSupervisor = action => {
		setSupervisor(action);
	};

	const returnDashboard = () => {
		setSupervisor(null);
	};

	const editStory = newStory => {
		if (newStory.slug === story.slug) {
			setSlug(story.slug);
		} else {
			setRedirect("/admin/story/" + newStory.slug);
			props.refresh();
		}
	};

	return (
		<>
			{story ? (
				<Header title={story.story_name} description={story.story_description} background={bgDefault}>
					<div className={"action_campaign"}>
						{isAdmin ? (
							<div className={"list_action_campaign"}>
								<Button color='primary' onClick={() => actionSupervisor("edit")}>
									Modifier
								</Button>
								<Button color='danger' onClick={() => actionSupervisor("delete")}>
									Supprimer
								</Button>
							</div>
						) : null}
					</div>
				</Header>
			) : null}
			{supervisor === "edit" ? (
				<StoryEdit story={story} changeStory={editStory} returnStory={returnDashboard} />
			) : null}
			{supervisor === "delete" ? (
				<StoryDelete story={story} refresh={props.refresh} returnStory={returnDashboard} />
			) : null}

			{!supervisor ? (
				<LoadingScreen isVisible={loading}>
					<Container fluid>
						<Row>
							<div className=' col'>
								<Card className='bg-secondary shadow'>
									<CardBody>
										<div className='nav-wrapper'>
											<Nav
												className='nav-fill flex-column flex-md-row'
												id='tabs-icons-text'
												pills
												role='tablist'>
												<NavItem>
													<NavLink
														className={classnames("btn btn-primary mb-sm-3 mb-md-0", {
															active: tabs === 1
														})}
														onClick={() => toggleNavs(1)}>
														<i className='ni ni-cloud-upload-96 mr-2' />
														Dashboard
													</NavLink>
												</NavItem>
												<NavItem>
													<NavLink
														className={classnames("btn btn-primary mb-sm-3 mb-md-0", {
															active: tabs === 2
														})}
														onClick={() => toggleNavs(2)}>
														<i className='ni ni-calendar-grid-58 mr-2' />
														Chapters
													</NavLink>
												</NavItem>
												<NavItem>
													<NavLink
														className={classnames("btn btn-primary mb-sm-3 mb-md-0", {
															active: tabs === 3
														})}
														onClick={() => toggleNavs(3)}>
														<i className='ni ni-settings mr-2' />
														Settings
													</NavLink>
												</NavItem>
											</Nav>
										</div>
										<Card className='shadow'>
											<CardBody>
												<TabContent activeTab={"tabs" + tabs}>
													<TabPane tabId='tabs1'>
														<p className='description'>EN COURS</p>
													</TabPane>
													<TabPane tabId='tabs2'>
														<StoryChapters slug={slug} chapters={chapters} />
													</TabPane>
													<TabPane tabId='tabs3'>
														<div className='description'>
															<StorySettings />
														</div>
													</TabPane>
												</TabContent>
											</CardBody>
										</Card>
									</CardBody>
								</Card>
							</div>
						</Row>
					</Container>
				</LoadingScreen>
			) : null}
		</>
	);
}
