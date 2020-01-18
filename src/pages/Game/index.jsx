import React, { useState, useEffect, useParams } from "react";

//Assets
import bgDefault from "../../assets/img/bg-campaign.png";

//Utils
import cloneDeep from "lodash/cloneDeep";
import { Container, Row, Col } from "reactstrap";

//Components
import GameHeader from "../../components/Headers/GameHeader";
import LoadingHeader from "../../components/Headers/LoadingHeader";
import Game from "./Game";
import EndPage from "./EndPage";

//Services
import { db } from "../../services/Firebase/firebase";

//JSON to be removed
import questionsList from "./Questions.json";

const types = ["Choix simple", "Choix multiple", "Vrai/Faux", "Liste déroulante"];

export default function SurveyAnswer() {
	const [loading, setLoading] = useState(false);
	const [questions, setQuestions] = useState(questionsList);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [questionType, setQuestionType] = useState(types[questionsList[0].type - 1]);
	const [answers, setAnswers] = useState({});
	const [displayEndPage, setDisplayEndPage] = useState(false);

	const [story, setStory] = useState();
	const [storyName, setStoryName] = useState();
	const [storySlug, setStorySlug] = useState("batman");
	const [chapters, setChapters] = useState();
	const [currentChapter, setCurrentChapter] = useState();
	const [currentChapterNumber, setCurrentChapterNumber] = useState(0);
	const [totalPages, setTotalPages] = useState();
	const [pages, setPages] = useState();
	const [currentPage, setCurrentPage] = useState();
	const [currentPageNumber, setCurrentPageNumber] = useState(0);

	// let { storySlug } = useParams();
	const [description, setDescription] = useState();

	const [pageType, setPageType] = useState();

	useEffect(() => {
		const getStory = async () => {
			let story = "";
			await db
				.collection("stories")
				.where("slug", "==", storySlug)
				// .where("slug", "==", storySlug)
				.get()
				.then(querySnapshot => {
					querySnapshot.docs.forEach(doc => {
						story = doc.data();
					});
					setStory(story);
					setStoryName(story.name);
					setDescription(story.description);
				});
		};
		const getChapters = async () => {
			let chapters = [];
			await db
				.collection("chapters")
				.where("story_slug", "==", storySlug)
				// .where("story_slug", "==", storySlug)
				.get()
				.then(querySnapshot => {
					querySnapshot.docs.forEach(doc => {
						chapters.push(doc.data());
					});
					setChapters(chapters);
				});
			// .then({
			//     if (chapters) setCurrentChapter(chapters[currentChapterNumber]);
			// 	if (currentChapter) setPages(currentChapter.pages);
			// 	if (pages) setCurrentPage(pages[currentPageNumber]);
			// 	if (currentPage) setPageType(currentPage.type);
			// })
		};
		getStory();
		getChapters();
	}, []);
	// }, [storySlug, currentChapter, currentChapterNumber, currentPage, currentPageNumber, pages]);
	// }, [storySlug]);

	// useEffect(() => {
	// 	if (chapters) setCurrentChapter(chapters[currentChapterNumber]);
	// 	if (currentChapter) setPages(currentChapter.pages);

	// 	if (pages) {
	// 		setTotalPages(pages.length);

	// 		setCurrentPage(pages[currentPageNumber]);

	// 		if (currentPage) setPageType(currentPage.type);
	// 	}
	// }, []);

	const checkSelected = choice => {
		const type = questionType;
		let copySelected = cloneDeep(answers);
		let selectedValues = Object.values(answers);

		//Reset the selected values to nothing if we can only have 1 answer
		if (type === "Choix simple" || type === "Vrai/Faux") {
			selectedValues = [];
		}

		//Logic for adding or removing an answer from our list
		if (selectedValues.includes(choice)) {
			const index = selectedValues.indexOf(choice);
			copySelected.splice(index, 1);
			setAnswers(copySelected);
		} else {
			setAnswers([...selectedValues, choice]);
		}
	};

	const previousQuestion = () => {
		console.log("currentQuestion: ", currentQuestion);
		if (currentQuestion !== 0) {
			setCurrentQuestion(currentQuestion - 1);
			setQuestionType(types[questionsList[currentQuestion - 1].type - 1]);
			setAnswers({});
		} else {
			alert("Il n'y a pas de question avant celle ci !");
		}
	};
	const nextQuestion = () => {
		if (currentQuestion !== questions.length - 1) {
			setCurrentQuestion(currentQuestion + 1);
			setQuestionType(types[questionsList[currentQuestion + 1].type - 1]);
			setAnswers({});
		} else {
			setDisplayEndPage(true);
		}
	};

	return (
		<div style={displayEndPage ? { overflow: "hidden" } : null}>
			{displayEndPage ? <EndPage /> : null}

			{loading ? (
				<LoadingHeader />
			) : (
				<GameHeader background={bgDefault} title={storyName} className='text-center' />
			)}

			{/* {pages ? ( */}
			<Container className='survey_answer mt-5' fluid>
				<Row>
					<Col className='mb-3 offset-2' xs='8'>
						<Game
							currentQuestion={questions[currentQuestion]}
							questionType={pageType}
							totalQuestion={questions.length}
							previousQuestion={previousQuestion}
							nextQuestion={nextQuestion}
							displayEndPage={displayEndPage}
							checkSelected={checkSelected}
							selectedAnswers={answers}
						/>
					</Col>
				</Row>
			</Container>
			{/* ) : null} */}
		</div>
	);
}
