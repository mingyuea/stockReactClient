import React from 'react';
import Style from '../scss/StockSearch.scss';

class StockSearch extends React.Component {
	constructor(props){
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e){
		let inVal = e.currentTarget.value;
		this.props.onChange(inVal);
	}

	handleSubmit(e){
		e.preventDefault();
		this.props.onSearch();
	}

	render(){
		return(
			<div className={Style.mainCont}>
				<form onSubmit={this.handleSubmit}>
					<label>
						<div className={Style.textDiv}>Search (by symbol)</div>
						<input className={Style.input} onChange={this.handleChange} type="text" value={this.props.input} />
					</label>
					<div>
						<input className={Style.btn} type="submit" value="Search" />
					</div>
					<div className={Style.err}>{this.props.err}</div>
				</form>
			</div>
		);
	}
}

export default StockSearch;