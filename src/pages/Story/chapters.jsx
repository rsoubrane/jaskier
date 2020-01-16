import React from "react";

//Utils
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";

export default function StoryChapters(props) {
	const slug = props.slug;
	const chapters = props.chapters;

	return (
		<Row>
			<Col xs={12} lg={4} className='mb-4 px-lg-4'>
				<Link to={`/admin/story/${slug}/chapter/add`}>Ajouter un nouveau chapitre</Link>
			</Col>

			{chapters
				? chapters.map(chapter => (
						<Col key={chapter.chapter_id} xs={12} lg={4} className='mb-4 px-lg-4'>
							<Link to={`/admin/story/${slug}/chapter/${chapter.chapter_slug}`}>
								{chapter.chapter_name}
							</Link>
						</Col>
				  ))
				: null}
		</Row>
	);
}
