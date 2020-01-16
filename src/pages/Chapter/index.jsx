import React, { useState, useEffect } from "react";

// Components
import Header from "../../components/Headers/Header";
import LoadingTab from "../../components/Loaders/LoadingTab";

//Utils
import { Button, Card, Nav, NavLink, NavItem, CardBody, TabContent, Container, Row, TabPane } from "reactstrap";
import classnames from "classnames";

// Pages
import ChapterEdit from "./edit";
import ChapterDelete from "./delete";
import ChapterDetails from "./details";
import ChapterSettings from "./settings";

//Services
import { getChapter } from "../../services/chapters";
import { getPages } from "../../services/data";

// Assets
import bgDefault from "../../assets/img/bg-campaign.png";

export default function Chapter(props) {
	const [tabs, setTabs] = useState(2);

	const [pages, setPages] = useState();
	const [chapter, setChapter] = useState();

	const [chapterSlug, setChapterSlug] = useState(props.match.params.chapterSlug);

	const [isAdmin] = useState(true);
	const [supervisor, setSupervisor] = useState("");
	const [setRedirect] = useState();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			try {
				const chapter = await getChapter(chapterSlug);
				const pages = await getPages(chapter);
				setChapter(chapter);
				setPages(pages);
			} catch (error) {
				console.log(error);
			}
		}
		fetchData();
		if (chapter && pages) setLoading(false);
	}, [chapterSlug, chapter, pages]);

	const toggleNavs = nav => {
		setTabs(nav);
	};

	const actionSupervisor = action => {
		setSupervisor(action);
	};

	const returnDashboard = () => {
		setSupervisor(null);
	};

	const editChapter = changedChapter => {
		if (changedChapter.slug === chapter.slug) {
			setChapterSlug(chapter.slug);
		} else {
			setRedirect("/admin/chapter/" + changedChapter.slug);
			props.refresh();
		}
	};

	return (
		<>
			{chapter ? (
				<Header title={chapter.chapter_name} background={bgDefault}>
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
				<ChapterEdit chapter={chapter} changeChapter={editChapter} returnChapter={returnDashboard} />
			) : null}
			{supervisor === "delete" ? (
				<ChapterDelete chapter={chapter} refresh={props.refresh} returnChapter={returnDashboard} />
			) : null}

			{!supervisor ? (
				<LoadingTab isVisible={loading}>
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
														Pages
													</NavLink>
												</NavItem>
												<NavItem>
													<NavLink
														className={classnames("btn btn-primary mb-sm-3 mb-md-0", {
															active: tabs === 3
														})}
														onClick={() => toggleNavs(3)}>
														<i className='ni ni-settings mr-2' />
														Réponses
													</NavLink>
												</NavItem>
												<NavItem>
													<NavLink
														className={classnames("btn btn-primary mb-sm-3 mb-md-0", {
															active: tabs === 4
														})}
														onClick={() => toggleNavs(4)}>
														<i className='ni ni-settings mr-2' />
														Import / Export
													</NavLink>
												</NavItem>
												<NavItem>
													<NavLink
														className={classnames("btn btn-primary mb-sm-3 mb-md-0", {
															active: tabs === 5
														})}
														onClick={() => toggleNavs(5)}>
														<i className='ni ni-settings mr-2' />
														Réglages
													</NavLink>
												</NavItem>
											</Nav>
										</div>
										<Card className='shadow'>
											<CardBody>
												<TabContent activeTab={"tabs" + tabs}>
													<TabPane tabId='tabs1'>EN COURS</TabPane>
													<TabPane tabId='tabs2'>
														{chapter && pages ? (
															<ChapterDetails chapter={chapter} pages={pages} />
														) : null}
													</TabPane>
													<TabPane tabId='tabs3'>
														<ChapterSettings />
													</TabPane>
													<TabPane tabId='tabs4'>
														<ChapterSettings />
													</TabPane>
													<TabPane tabId='tabs5'>
														<ChapterSettings />
													</TabPane>
												</TabContent>
											</CardBody>
										</Card>
									</CardBody>
								</Card>
							</div>
						</Row>
					</Container>
				</LoadingTab>
			) : null}
		</>
	);
}
