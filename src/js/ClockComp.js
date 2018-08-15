import React from 'react';

class ClockComp extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div>
				<div>{this.props.timeNum}</div>
				<div>{this.props.timePost}</div>
			</div>
		);
	}
}

export default ClockComp;