import React from "react";

//Assets
import LogoFD from "../../../assets/img/free/Logo FD2.png";
import BG from "../../../assets/img/free/bg-end-answer.jpg";
//Utils
import { Container } from "reactstrap";

export default function EndPage() {
	return (
		<div className='end_page text-center'>
			<Container className='card' style={{ background: `url(${BG})` }}>
				<img className='img-fluid' src={LogoFD} alt='logo' />
				<h1>Merci d'avoir pris le temps de participer au sondage !</h1>
			</Container>
		</div>
	);
}
