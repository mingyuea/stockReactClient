import React from 'react';
import Style from '../scss/TradingComp.scss';

class TradingComp extends React.Component{
	constructor(props){
		super(props);

		this.handleTrade = this.handleTrade.bind(this);
	}

	handleTrade(e){
		let action = e.currentTarget.id;

		this.props.onClick(action);
	}

	render(){
		return(
			<div className={Style.mainCont}>
				<div className={Style.btn} id="Buy" onClick={this.handleTrade}>Buy</div>
				<div className={Style.btn} id="Sell" onClick={this.handleTrade}>Sell</div>
			</div>
		)
	}
}

export default TradingComp;