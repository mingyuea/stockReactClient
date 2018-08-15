import React from 'react';
import Style from '../scss/StockListComp.scss';

class StockListComp extends React.Component{
	constructor(props){
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e){
		let ind = e.currentTarget.id;
		let symbol = e.currentTarget.textContent;
		this.props.onClick(symbol, ind,'1m');
	}	

	render(){
		let selectStyle = {color: 'black', backgroundColor: 'rgba(229, 239, 255, 1)'};		
		let rendArr = this.props.list.map((item, ind) => {
			if(ind == this.props.currInd){
				return <div style={selectStyle} className={Style.tabs} id={ind} onClick={this.handleClick}>{item["symbol"]}</div>
			}
			else{
				return <div className={Style.tabs} id={ind} onClick={this.handleClick}>{item["symbol"]}</div>
			}
		});
		return(
			<div className={Style.mainCont}>
				<div className={Style.title}>Your Portfolio</div>
				{rendArr}
			</div>
		);
	}
}

export default StockListComp;