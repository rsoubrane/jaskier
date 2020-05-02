import React from "react";

//Assets
import LogoFD from "../../assets/img/logo.png";
import BG from "../../assets/img/404.jpg";

//Utils
import { Container } from "reactstrap";

export default function SurveyError() {
	return (
		<div className='error_page text-center'>
			<Container className='card' style={{ background: `white url(${BG}) 50% no-repeat` }}>
				<img className='img-fluid' src={LogoFD} alt='logo' />
			</Container>
		</div>
	);
}
