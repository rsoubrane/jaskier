import React, { Component } from "react";

//Utils
import { Container, Row, Col } from "reactstrap";

//Pages
import ScreenStart from "./start";
import ScreenGame from "./game";
import ScreenEnd from "./end";
import Screen404 from "./error404";
import ScreenError from "./error";

//Services
import { db } from "../../services/Firebase/firebase";

//Data
import { player_stats, player_inventory } from "./data";

//Assets
import LogoGame from "../../assets/img/logo-game.png";

export default class GamePage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			pseudo: "",
			stats: player_stats,
			inventory: player_inventory,
			story: "",
			storySlug: this.props.match.params.storySlug,
			chapters: "",
			pages: "",
			currentPage: "",
			currentPageNumber: 0,
			answers: [],
			step: 0,
		};
	}

	handleStart = (pseudo) => {
		this.setState({ step: 1, pseudo });
	};

	getStory = async () => {
		let story = "";
		await db
			.collection("stories")
			.where("slug", "==", this.state.storySlug)
			.get()
			.then((querySnapshot) => {
				querySnapshot.docs.forEach((doc) => {
					story = doc.data();
				});
				this.setState({
					story,
					storyName: story.name,
					storyDescription: story.description,
				});
			});
	};
	getChapters = async () => {
		let chapters = [];
		await db
			.collection("chapters")
			.where("story_slug", "==", this.state.storySlug)
			.get()
			.then((querySnapshot) => {
				querySnapshot.docs.forEach((doc) => {
					chapters.push(doc.data());
				});
				this.setState({
					chapters,
				});
			});
	};

	getPages = async () => {
		let pages = [];
		await db
			.collection("pages")
			.where("story_slug", "==", this.state.storySlug)
			.orderBy("page_number")
			.get()
			.then((querySnapshot) => {
				querySnapshot.docs.forEach((doc) => {
					pages.push(doc.data());
				});
				this.setState(
					{
						pages,
					},
					() => {
						console.log("pages: ", this.state.pages);
						this.setState({
							currentPage: this.state.pages[this.state.currentPageNumber],
						});
					}
				);
			});
	};

	componentDidMount() {
		this.getStory();
		this.getChapters();
		this.getPages();
	}

	nextPage = (answer) => {
		const index = this.state.pages.findIndex((x) => x.page_number === answer.redirectTo.value);
		this.setState(
			{
				answers: [...this.state.answers, answer],
			},
			() => {
				if (this.state.currentPageNumber >= this.state.pages.length) {
					this.submitAnswers();
					this.setState({ step: 2 });
				} else {
					this.setState({
						currentPageNumber: answer.redirectTo,
						currentPage: this.state.pages[index],
					});
				}
			}
		);
	};

	submitAnswers = () => {
		// this.setState({ loading: true });
	};

	stepQuiz = () => {
		switch (this.state.step) {
			case 0:
				return <ScreenStart start={this.handleStart} />;
			case 1:
				return (
					<ScreenGame
						pseudo={this.state.pseudo}
						stats={this.state.stats}
						inventory={this.state.inventory}
						currentPage={this.state.currentPage}
						totalPages={this.state.pages.length}
						nextPage={this.nextPage}
					/>
				);
			case 2:
				return <ScreenEnd />;
			case 3:
				return <ScreenError />;
			case 4:
				return <Screen404 />;
			default:
				console.log("Error");
		}
	};

	render() {
		return (
			<Container className='game_bg' fluid>
				{this.state.step === 1 ? (
					<div className='game_backdrop'></div>
				) : (
					<img className='text-center logo_game' src={LogoGame} alt='logo' />
				)}
				<Container className='game_screen my-5' fluid>
					<Row>
						<Col className='mb-3 offset-1' xs='10'>
							{this.stepQuiz()}
						</Col>
					</Row>
				</Container>
			</Container>
		);
	}
}
