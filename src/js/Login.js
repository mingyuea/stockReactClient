import React from 'react';
import Styles from '../scss/Login.scss';

class Login extends React.Component{
	constructor(props){
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleUserChange = this.handleUserChange.bind(this);
		this.handlePassChange = this.handlePassChange.bind(this);
		this.handlePass2Change = this.handlePass2Change.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
	}

	handleSubmit(e){
		e.preventDefault();
		this.props.onSubmit();
	}

	handleUserChange(e){
		let input = e.target.value;
		this.props.onUChange(input);
	}

	handlePassChange(e){
		let input = e.target.value;
		this.props.onPChange(input);
	}

	handlePass2Change(e){
		let input = e.target.value;
		this.props.onP2Change(input);
	}

	handleCancel(){
		this.props.onCancel("loginStyle");
	}

	render(){
		let errMsg = "";
		let loadingMsg = "";
		let btnText = "Login";
		let signUpText;
		if(this.props.signup){
			btnText = "Submit";
			signUpText = <label className={Styles.textCont}><div className={Styles.textArea}>Retype Password: </div><input className={Styles.inputBox} type="password" value={this.props.password2} onChange={this.handlePass2Change} /></label>;
		}
		if(this.props.err){
			errMsg = this.props.err;
		}
		if(this.props.loading){
			loadingMsg = this.props.loading;
		}

		return(
			<div className={Styles.cont} style={this.props.style}>
			<form onSubmit={this.handleSubmit}>
				<label className={Styles.textCont}>
					<div className={Styles.textArea}>Username: </div>
					<input className={Styles.inputBox} type="text" value={this.props.username} onChange={this.handleUserChange} />
				</label>
				<label className={Styles.textCont}>
					<div className={Styles.textArea}>Password: </div>
					<input className={Styles.inputBox} type="password" value={this.props.password} onChange={this.handlePassChange} />
				</label>
				{signUpText}
				<div className={Styles.btnCont}>
					<label>
						<input className={Styles.btn} type="submit" value={btnText} />
					</label>
					<div className={Styles.btn} onClick={this.handleCancel}>Cancel</div>
				</div>
				<div className={Styles.loadingMsg}>{loadingMsg}</div>
				<div className={Styles.errMsg}>{errMsg}</div>
			</form>
			</div>
		);
	}
}

export default Login;