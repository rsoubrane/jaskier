import React, { Component } from "react";

//Utils
import { Button, Col, Label, Input } from "reactstrap";
import cloneDeep from "lodash/cloneDeep";
import Select from "react-select";

//Components
import FormInput from "../../Forms/Form";

//Icons
import {
	MdAdd as Add,
	MdDelete as Delete,
	MdContentCopy as Duplicate,
	MdFormatAlignCenter as Handle,
} from "react-icons/md";

//Data
import { data, quantityGold, quantityItem } from "../../../pages/Game/data";

export default class Option extends Component {
	render() {
		const option = cloneDeep(this.props.option);

		const {
			provided,
			id,
			pageOptions,
			add,
			duplicate,
			remove,
			change,
			redirectList,
			changeRedirect,
			changeGetItem,
			changeRemoveItem,
			changeQuantityGet,
			changeQuantityRemove,
		} = this.props;

		return (
			<div
				className='row align-items-center option_container'
				{...provided.draggableProps}
				ref={provided.innerRef}>
				<Col className='drag_handle' xs='1' {...provided.dragHandleProps}>
					<Handle />
				</Col>

				<Col xs='10' lg='9' className='input_option'>
					<Input
						type='text'
						className={"form-control-alternative" + (this.props.error ? " is-invalid" : "")}
						value={option.text}
						id={option.id}
						name={`Option${id}`}
						placeholder='Entrer une option'
						onChange={(e) => change(e)}
						autoComplete='off'
					/>
				</Col>

				<Col xs='1' lg='2' className='action_icons'>
					<Button size='sm' className='icon_container' onClick={() => duplicate(option, id)}>
						<Duplicate className='icon' />
					</Button>
					<Button color='primary' size='sm' className='icon_container' onClick={() => add(id)}>
						<Add className='icon' />
					</Button>
					<Button color='danger' size='sm' className='icon_container' onClick={() => remove(id)}>
						<Delete className='icon' />
					</Button>
				</Col>

				<div className='w-50 mt-3 px-2'>
					<Label htmlFor={id}>Redirige page :</Label>
					<Select
						placeholder='Choix page'
						inputProps={{ id }}
						className='basic-single'
						value={pageOptions[id - 1].redirectTo}
						options={redirectList}
						onChange={(option) => changeRedirect(option, id)}
					/>
				</div>

				<div className='w-25 mt-3 px-2'>
					<Label htmlFor={id}>Donner :</Label>
					<Select
						placeholder='Donner'
						inputProps={{ id }}
						className='basic-single'
						value={pageOptions[id - 1].getItem}
						options={data}
						onChange={(option) => changeGetItem(option, id)}
					/>
				</div>

				<div className='w-25 mt-3 px-2'>
					<Label htmlFor={id}>Retirer :</Label>
					<Select
						placeholder='Retirer'
						inputProps={{ id }}
						className='basic-single'
						value={pageOptions[id - 1].removeItem}
						options={data}
						onChange={(option) => changeRemoveItem(option, id)}
					/>
				</div>

				<div className='w-50 mt-2 mb-5 px-2'></div>
				{pageOptions[id - 1].getItem ? (
					<div className='w-25 mt-2 mb-5 px-2'>
						<Label htmlFor={id}>Quantité :</Label>
						<Select
							placeholder='Quantité'
							inputProps={{ id }}
							className='basic-single'
							value={pageOptions[id - 1].getItem.quantity}
							options={pageOptions[id - 1].getItem.label === "Gold" ? quantityGold : quantityItem}
							onChange={(option) => changeQuantityGet(option, id)}
						/>
					</div>
				) : null}
				{pageOptions[id - 1].removeItem ? (
					<div className='w-25 mt-2 mb-5 px-2'>
						<Label htmlFor={id}>Quantité :</Label>
						<Select
							placeholder='Quantité'
							inputProps={{ id }}
							className='basic-single'
							value={pageOptions[id - 1].removeItem.quantity}
							options={pageOptions[id - 1].removeItem.label === "Gold" ? quantityGold : quantityItem}
							onChange={(option) => changeQuantityRemove(option, id)}
						/>
					</div>
				) : null}
			</div>
		);
	}
}
