import React, { useState } from "react";

//Utils
import { Row, Form, Col, Button, Input } from "reactstrap";

export default function ScreenStart({ start }) {
	const [pseudo, setPseudo] = useState("");

	return (
		<Row className='justify-content-center align-items-center text-center'>
			<Col xs='12'>
				<Form className='mt-5 text-center justify-content-center' onSubmit={() => start(pseudo)}>
					<Input
						type='text'
						className='w-50 mb-3'
						style={{ marginLeft: "25%" }}
						placeholder='Entrez votre pseudo'
						onChange={(e) => setPseudo(e.target.value)}
					/>
					<Button type='submit' size='lg' color='primary'>
						Lancer l'aventure !
					</Button>
				</Form>
			</Col>
		</Row>
	);
}
