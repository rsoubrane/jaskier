import React, { Component } from "react";

// Utils
import Select, { components } from "react-select";
import { Button, FormGroup, Input } from "reactstrap";

const { Option, SingleValue } = components;
const IconOption = props => (
	<Option {...props}>
		<i className={"select2-icon " + props.data.icon}></i>
		{props.data.label}
	</Option>
);
const ValueOption = props => (
	<SingleValue {...props}>
		<i className={"select2-icon " + props.data.icon}></i>
		{props.data.label}
	</SingleValue>
);

class Form extends Component {
	render() {
		return <form className={this.props.customClass}>{this.props.children}</form>;
	}
}

Form.InputText = class InputText extends Component {
	render() {
		return (
			<FormGroup>
				{this.props.label ? (
					<label
						className={"form-control-label" + (this.props.error ? " text-danger" : "")}
						htmlFor={this.props.id}>
						{this.props.label}
					</label>
				) : null}
				<Input
					type='text'
					className={"form-control-alternative" + (this.props.error ? " is-invalid" : "")}
					value={this.props.value}
					id={this.props.id}
					name={this.props.name}
					placeholder={this.props.placeholder}
					onChange={this.props.change}
					onKeyDown={this.props.onKeyDown}
					autoComplete='off'
				/>
				{this.props.error ? <div className='invalid-feedback'>{this.props.error}</div> : null}
			</FormGroup>
		);
	}
};

Form.InputTextArea = class InputTextArea extends Component {
	render() {
		return (
			<FormGroup>
				{this.props.label ? (
					<label
						className={"form-control-label" + (this.props.error ? " text-danger" : "")}
						htmlFor={this.props.id}>
						{this.props.label}
					</label>
				) : null}
				<Input
					className={"form-control-alternative" + (this.props.error ? " is-invalid" : "")}
					// defaultValue={this.props.value}
					value={this.props.value}
					id={this.props.id}
					name={this.props.name}
					rows={this.props.rows}
					maxLength={this.props.maxlength}
					placeholder={this.props.placeholder}
					onChange={this.props.change}
					type='textarea'
				/>
				{this.props.error ? <div className='invalid-feedback'>{this.props.error}</div> : null}
			</FormGroup>
		);
	}
};

Form.SelectBox = class SelectBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			key_value: this.props.key_value ? this.props.key_value : "value",
			key_label: this.props.key_label ? this.props.key_label : "label",
			options: this.props.options ? this.props.options : []
		};
	}

	componentWillReceiveProps = props => {
		this.setState({ options: props.options });
	};

	listOptions = () => {
		if (this.state.options) {
			const key_value = this.state.key_value;
			const key_label = this.state.key_label;
			return this.state.options.map((option, key) => (
				<option key={key} value={option[key_value]}>
					{option[key_label]}
				</option>
			));
		} else {
			return null;
		}
	};

	render() {
		return (
			<div className='form-group select2'>
				{this.props.label ? (
					<label
						className={"control-label" + (this.props.error ? " text-danger" : "")}
						htmlFor={this.props.id}>
						{this.props.label}
					</label>
				) : null}

				<select
					className={"form-control" + (this.props.error ? " is-invalid" : "")}
					id={this.props.id}
					name={this.props.id}
					value={this.props.value}
					onChange={this.props.change}>
					<option value={""}>{this.props.placeholder}</option>
					{this.listOptions()}
				</select>
				{this.props.error ? <div className='invalid-feedback'>{this.props.error}</div> : null}
			</div>
		);
	}
};

Form.SingleSelect = class SingleSelect extends Component {
	render() {
		return (
			<div className='form-group select2'>
				{this.props.label ? (
					<label
						className={"form-control-label" + (this.props.error ? " text-danger" : "")}
						htmlFor={this.props.id}>
						{this.props.label}
					</label>
				) : null}

				<Select
					className={"" + (this.props.error ? " reactselect-invalid" : "")}
					id={this.props.id}
					name={this.props.id}
					options={this.props.options}
					value={this.props.value}
					components={{
						Option: this.props.option ? this.props.option : IconOption,
						SingleValue: ValueOption
					}}
					placeholder={this.props.placeholder}
					onChange={this.props.change}
				/>
				{this.props.error ? <div className='invalid-feedback'>{this.props.error}</div> : null}
			</div>
		);
	}
};

Form.Image = class ImageSelect extends Component {
	render() {
		return (
			<div className='mt-3'>
				{this.props.label ? (
					<>
						<label htmlFor='imgUpload' className='btn btn-secondary btn-outlined'>
							{this.props.label}
						</label>

						<input
							type={this.props.type}
							className='input-file'
							id={this.props.id}
							name={this.props.name}
							accept={this.props.accept}
							onChange={this.props.change}
							style={{ display: "none" }}
						/>

						{this.props.image ? (
							<>
								<Button color='danger' size='sm' onClick={this.props.removeImage}>
									Supprimer l'image
								</Button>

								<img className='img-base-64 mb-5' src={this.props.pageImage} alt='base64' />
							</>
						) : null}
					</>
				) : null}
			</div>
		);
	}
};

export default Form;
