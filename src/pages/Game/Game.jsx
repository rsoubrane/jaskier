import React, { useState, useEffect } from "react";

//Components
import ImageModal from "../../components/medias/ImageModal";

//Utils
import { Card, CardBody, Form, Row, Col } from "reactstrap";

//Assets
import LogoGame from "../../assets/img/logo-game.png";

export default function Answer(props) {
	const stats = props.stats;

	const page = props.currentPage;

	const current = page.page_number;
	const total = props.totalPages;

	const [selected] = useState({});
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [imgData] = useState();

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (page) setLoading(false);
	}, [page]);

	const handleNext = (option) => {
		props.nextPage(option);
	};

	const handleModal = () => {
		setIsModalOpen(!isModalOpen);
	};

	return page ? (
		<Form className='container_game h-100'>
			<Row>
				<Col xs={{ size: 10, offset: 1 }} lg={{ size: 4, offset: 4 }} className='text-center'>
					<img className='img-fluid w-75 mb-3' src={LogoGame} alt='logo' />
				</Col>

				<Col xs={{ size: 10, offset: 1 }} lg={{ size: 8, offset: 0 }}>
					<Card className='bg-secondary shadow card-dark'>
						<CardBody className='page_details'>
							<Row>
								<Col xs={`${page.image_id || page.image ? 6 : 12}`} className='page_label'>
									{page.page_text}
								</Col>

								{page.image_id || page.image ? (
									<Col xs='6' className={`page_image ${page.image_id ? "d-block" : "d-none"}`}>
										{isModalOpen === true && imgData ? (
											<div className='modal-container'>
												<ImageModal image={imgData} closeModal={handleModal} />
											</div>
										) : null}
									</Col>
								) : null}
							</Row>

							<Row className='page_options mt-5' key={page.id}>
								{page.page_options.map((option) => (
									<Col xs='6' lg='3' className='option_card' key={option.id}>
										<Card
											onClick={() => handleNext(option)}
											className={`${
												Object.values(selected).includes(option.id) ? "selected" : null
											}`}>
											<h4>{option.text}</h4>
										</Card>
									</Col>
								))}
							</Row>

							<Row className='mt-4 justify-content-end'>
								<div className='page_count'>
									<span>Page {current} </span> sur <span> {total}</span>
								</div>
							</Row>
						</CardBody>
					</Card>
				</Col>

				<Col xs={{ size: 10, offset: 1 }} lg={{ size: 4, offset: 0 }} className='mt-5 mt-lg-0'>
					<Card className='bg-secondary shadow card-dark'>
						<CardBody className='page_inventory'>
							<h3 className='inventory_title text-center bold'>Profil</h3>

							<Row className='justify-content-left align-items-center'>
								<Col xs='6'>
									<img className='w-100' alt='avatar' src='/images/avatar.png' />
								</Col>
								<Col xs='6' className='player_information'>
									<h3>{props.pseudo ? props.pseudo : "Romain"}</h3>
									<div className='health_bar my-2' data-total='100' data-value='100'>
										<div
											className='bar'
											style={{ width: `${(stats.health.value / 100) * 100}%` }}></div>
									</div>

									<h5 className='text-right'>{stats.health.value} / 100</h5>

									<h4>$ {stats.gold.value}</h4>
									<h4>ATK : {stats.attack.value}</h4>
									<h4>PTC : {stats.protection.value}</h4>
								</Col>
							</Row>

							<Row className='inventory_list mt-5 justify-content-center'>
								{props.inventory.map((item) => {
									return item.quantity.value > 0 ? (
										<Col xs={{ size: 3 }} key={item.id} className='mx-2'>
											<Row className='justify-content-center align-items-center'>
												<Col xs='12' className='inventory_label d-inline-flex'>
													<p>{item.label}</p>
													<p> {item.type === "potion" ? `(${item.quantity.value})` : null}</p>
												</Col>

												<Col xs='12' className='inventory_image'>
													<img
														className='w-100 my-3'
														src={`/images/inventory/${item.image}.png`}
														alt='item'
														style={{ maxHeight: "70px" }}
													/>
												</Col>

												<Col xs='12' className='inventory_quantity mt-5'>
													<p></p>
												</Col>
											</Row>
										</Col>
									) : null;
								})}
							</Row>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</Form>
	) : null;
}
