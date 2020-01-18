import React, { useState } from "react";

//Assets
import imgDefault from "../../assets/img/logo.png";
// import img404 from "../../assets/img/404.jpg";

//Components
import { Card } from "reactstrap";

export default function LazyLoad(props) {
	// const imageId = props.imageId;

	// const [imgUrl, setImgUrl] = useState(ApiService.urlApi + "/images/" + imageId);
	const [flipped] = useState(false);

	// useEffect(() => {
	// 	console.log(imgUrl);
	// 	ApiService.get("/media/18").then(res => {
	// 		if (res.status === 200) {
	// 			setFlipped(true);
	// 		} else if (res.status === 404) {
	// 			setImgUrl(img404);
	// 		} else {
	// 			NotificationService.call("danger", "Récupération de l'image", "Une erreur Api est survenue");
	// 		}
	// 	});
	// }, []);

	return (
		<div className={`card_inner ${flipped ? "flipped" : null}`}>
			<Card className={`card_image ${flipped ? "" : "visible"}`}>
				<img className={`img-fluid `} src={imgDefault} alt='Question' />
			</Card>

			{/* <Card className={`card_image ${flipped ? "flipped visible" : null}`}>
				<img className={`img-fluid `} src={imgUrl} alt='Question' />
			</Card> */}
		</div>
	);
}
