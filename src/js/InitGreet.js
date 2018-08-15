import React from 'react';
import Styles from '../scss/InitGreet.scss';

class InitGreet extends React.Component {
	constructor(props){
		super(props);

		this.handleSelect = this.handleSelect.bind(this);
	}

	handleSelect(e){
		let choice = e.currentTarget.id;
		this.props.handleInitSel(choice);
	}

	render(){
		return(
				<div className={Styles.cont} style={this.props.style}>
					<div>Hello! You can either sign up, login, or use anonymously. 
						If signing up, please note that this site is not professionally protected.
						It is merely a personal project, with source code publicly available, so take care 
						NOT to use an important username/password combination.
						Do NOT rely on this application for actual trading purposes.
						If using anonymously, please note that none of your data will be saved upon exit.
					</div>
					<div>
						<div className={Styles.btn} id="signup" onClick={this.handleSelect}>Sign Up</div>
						<div className={Styles.btn} id="login" onClick={this.handleSelect}>Login</div>
						<div className={Styles.btn} id="anon" onClick={this.handleSelect}>Anonymous</div>
					</div>
				</div>
		);
	}
}

export default InitGreet;