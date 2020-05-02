import React, { useState } from "react";
import { Button, Modal, ModalFooter, ModalHeader } from "reactstrap";

export default function ConfirmModal(props) {
	const [modal] = useState(true);

	const confirm = () => {
		toggle("confirm");
	};

	const close = () => {
		toggle();
	};

	const toggle = confirm => {
		props.handleModal(confirm);
	};

	return (
		<Modal isOpen={modal} toggle={toggle}>
			<ModalHeader>
				<h3>{props.header}</h3>
			</ModalHeader>
			<ModalFooter>
				<Button color='danger' onClick={close}>
					Fermer
				</Button>
				<Button color='primary' onClick={confirm}>
					Confirmer
				</Button>
			</ModalFooter>
		</Modal>
	);
}
