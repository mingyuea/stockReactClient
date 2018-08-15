import React from 'react';
import Style from '../scss/GraphToggle.scss';

class GraphToggle extends React.Component {
	constructor(props){
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e){
		let timespan = e.currentTarget.id;

		this.props.onToggle(timespan);
	}

	render(){
		let btnArr = ["1d", "1m", "3m", "6m", "1y"];
		let selectStyle = {color: 'black', backgroundColor: 'rgba(229, 239, 255, 1)'};
		let rendArr = btnArr.map((item) => {
			if(item == this.props.selected){
				return <div style={selectStyle} className={Style.monthTab} id={item} onClick={this.handleClick}>{item}</div>
			}
			else{
				return <div className={Style.monthTab} id={item} onClick={this.handleClick}>{item}</div>
			}
		});

		return(
			<div className={Style.mainCont}>
				<div className={Style.symbolTitle}>{this.props.symbol}</div>
				<div className={Style.currPrice}>${this.props.currPrice}</div>
				<div className={Style.minorInfo}>Shares: {this.props.shares}</div>
				<div className={Style.minorInfo}>Available Cash: ${this.props.cash}</div>
				{rendArr}
			</div>
		)
	}
}

export default GraphToggle;