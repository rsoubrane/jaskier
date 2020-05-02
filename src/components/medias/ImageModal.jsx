import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

export default function ImageModal(props) {
	const [modal] = useState(true);

	const toggle = () => {
		props.closeModal();
	};

	return (
		<Modal isOpen={modal} toggle={toggle} size='xl'>
			<ModalBody>
				<img src={props.image} alt='Zoomed in' draggable='false' />
			</ModalBody>
			<ModalFooter>
				<Button color='secondary' onClick={toggle}>
					Fermer
				</Button>
			</ModalFooter>
		</Modal>
	);
}
