import React, { Component } from "react";

import { Row, Col } from "reactstrap";

export default class CardSurvey extends Component {
	render() {
		const card = this.props;

		return (
			<div className='survey_card'>
				<img className='card_image' src={card.imgUrl} alt='background' />
				<div className='card_backdrop'></div>

				<div className='card_body'>
					<Row>
						<Col className='body_type' sm='12' md='6'>
							<div className='type_container'>
								<i className={`ni ni-${card.typeIcon}`} />
								<span className='pl-2'>{card.type}</span>
							</div>
						</Col>
						<Col className='body_visibility' sm='12' md='6'>
							<div className='visibility_container'>
								<i className={`ni ni-${card.visibilityIcon}`} />
								<span className='pl-2'>{card.visibility}</span>
							</div>
						</Col>
					</Row>

					<h1 className='body_title'>{card.title}</h1>
					<h3 className='body_status'>{card.status}</h3>
				</div>
			</div>
		);
	}
}
