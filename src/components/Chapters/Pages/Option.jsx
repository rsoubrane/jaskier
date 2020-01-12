import React, { Component } from "react";

//Utils
import { Button, Col } from "reactstrap";
import cloneDeep from "lodash/cloneDeep";

//Components
import FormInput from "../../Forms/Form";

//Icons
import {
	MdAdd as Add,
	MdDelete as Delete,
	MdContentCopy as Duplicate,
	MdFormatAlignCenter as Handle
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
		const provided = this.props.provided;
		const option = cloneDeep(this.props.option);
		const id = this.props.index;
		const add = this.props.add;
		const duplicate = this.props.duplicate;
		const remove = this.props.remove;
		const change = this.props.change;

		return (
			<div
				className='row align-items-center option_container'
				{...provided.draggableProps}
				ref={provided.innerRef}>
				<Col className='drag_handle' xs='1' {...provided.dragHandleProps}>
					<Handle />
				</Col>

				<Col xs='10' lg='9' className='input_option'>
					<FormInput.InputText id={id} name={`Option${id}`} value={option.text} change={change} />
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
			</div>
		);
	}
};

export default Option;
