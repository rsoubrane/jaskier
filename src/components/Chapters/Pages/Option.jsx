import React, { Component } from "react";

//Utils
import { Button, Col, Label } from "reactstrap";
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

Option.Boolean = class Boolean extends Component {
	render() {
		const option = cloneDeep(this.props.option);
		const id = this.props.index;

		return (
			<Col xs='11' className='input_option'>
				<FormInput.InputText
					id={id}
					name={`Option${id}`}
					value={option.text}
					change={this.props.handleChange}
				/>
			</Col>
		);
	}
};

Option.Choices = class Choices extends Component {
	render() {
		const option = cloneDeep(this.props.option);

		const { provided, id, pageOptions, add, duplicate, remove, change, redirectList, changeRedirect } = this.props;

		return (
			<div
				className='row align-items-center option_container'
				{...provided.draggableProps}
				ref={provided.innerRef}>
				<Col className='drag_handle' xs='1' {...provided.dragHandleProps}>
					<Handle />
				</Col>

				<Col xs='10' lg='8' className='input_option'>
					<FormInput.InputText id={id} name={`Option${id}`} value={option.text} change={change} />
				</Col>
				<Col xs='1' lg='3' className='action_icons'>
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

				<div className='w-25 mt-2 mb-5'>
					<Label htmlFor={id}>Vers page :</Label>
					<Select
						placeholder='Choisir page'
						inputProps={{ id }}
						className='basic-single'
						value={pageOptions[id - 1].redirectTo}
						options={redirectList}
						onChange={(option) => changeRedirect(option, id)}
					/>
				</div>
			</div>
		);
	}
};

export default Option;
