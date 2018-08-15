import React from 'react';
import Style from '../scss/TradeForm.scss';

class TradeForm extends React.Component{
	constructor(props){
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e){
		let inVal = e.currentTarget.value;
		this.props.onChange(inVal);
	}

	handleSubmit(e){
		e.preventDefault();
		this.props.onSubmit();
	}

	render(){
		return(
			<div className={Style.mainCont} style={this.props.style}>
			<form onSubmit={this.handleSubmit}>
				<label>
					<div className={Style.label}>{this.props.action} shares:</div>
					<input type="number" value={this.props.inVal} onChange={this.handleChange} min="0" max={this.props.shares} />
				</label>
				<div>
					<input className={Style.btn} type="submit" value={this.props.action} />
					<div className={Style.btn} onClick={this.props.onCancel}> Cancel </div>
				</div>
				<div className={Style.error}>{this.props.error}</div>
			</form>
			</div>
		);
	}
}

export default TradeForm;