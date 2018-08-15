import React from 'react';
import Style from '../scss/DataSmallDispComp.scss';

class DataSmallDispComp extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div className={Style.mainCont}>
				<div className={Style.headerDiv}>Date-specific Data</div>
				<div className={Style.explainDiv}>Click on a specific bar on the graph to see its data</div>
				<div className={Style.dataDiv}>Date/Time: {this.props.stockData.label}</div>
				<div className={Style.dataDiv}>Open: {this.props.stockData.open}</div>
				<div className={Style.dataDiv}>High: {this.props.stockData.high}</div>
				<div className={Style.dataDiv}>Low: {this.props.stockData.low} </div>
				<div className={Style.dataDiv}>Close: {this.props.stockData.close}</div>
			</div>
		);
	}
}

export default DataSmallDispComp;