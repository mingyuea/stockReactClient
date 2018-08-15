import React from 'react';
import ReactDOM from 'react-dom';
import InitGreet from './InitGreet';
import Login from './Login';
import GraphComp from './GraphComp.js';
import DataSmallDispComp from './DataSmallDispComp.js';
import StockListComp from './StockListComp.js';
import TradingComp from './TradingComp.js';
import TradeForm from './TradeForm.js';
import GraphToggle from './GraphToggle.js';
import StockSearch from './StockSearch.js';
import Style from '../scss/RootComponent.scss';

class RootComponent extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			"renderPhase": 0,
			"initStyle": {display: 'block'},
			"loginStyle": {display: 'none'},
			"loginErr": null,
			"uInput": "",
			"pInput": "",
			"p2Input": "",
			"isSignUp": false,
			"loadingMsg": null,
			"headerStocks": [],
			"fetchUrl": "http://localhost:5005",
			"currName": "anonymous",
			"dispName": "Your",
			"stockList": [
				{
					"symbol": "AAPL",
					"shares": 100,
				},
				{
					"symbol": "GS",
					"shares": 100,
				}, 
				{
					"symbol": "ARNC",
					"shares": 100,
				}, 
				{
					"symbol": "JNJ",
					"shares": 100,
				}
				],
			"currStockData": [
			{"open":186.29,"high":187.19,"low":182.91,"close":185.11, "change":-0.39, "label":"29"},
			{"open":183.82,"high":187.3,"low":183.42,"close":187.18, "change":2.07, "label":"Jul 2"},
			{"open":187.79,"high":187.95,"low":183.54,"close":183.92, "change":-3.26, "label":"3"},
			{"open":185.26,"high":186.41,"low":184.28,"close":185.4, "change":1.48, "label":"5"}
			],
			"graphYMinMax": [182, 195],
			"searchInput": "",
			"currPrice": 0,
			"accountCash": 10000,
			"canvWidth": 400,
			"canvHt": 400,
			"currView": "",
			"currViewInd": 0,
			"tradeDisp": {display: 'none'},
			"tradeAction": "",
			"tradeAmt": 0,
			"searchError": "",
			"tradeError": "",
			"currTimespan": '1m',
			"graphXPosArr": [],
			"graphHoverInd": 0, 
		}

		this.handleInitSel = this.handleInitSel.bind(this);
		this.handleUserChange = this.handleUserChange.bind(this);
		this.handlePassChange = this.handlePassChange.bind(this);
		this.handlePass2Change = this.handlePass2Change.bind(this);
		this.handleInitCancel = this.handleInitCancel.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		this.handleListSel = this.handleListSel.bind(this);
		this.handleGraphHover = this.handleGraphHover.bind(this);
		this.handleGraphToggle = this.handleGraphToggle.bind(this);
		this.handleSetCanvasWidth = this.handleSetCanvasWidth.bind(this);
		this.handleTradeAction = this.handleTradeAction.bind(this);
		this.handleTradeSubmit = this.handleTradeSubmit.bind(this);
		this.handleTradeCancel = this.handleTradeCancel.bind(this);
		this.handleFormChange = this.handleFormChange.bind(this);
		this.handleSearchChange = this.handleSearchChange.bind(this);
		this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
	}

	handleInitSel(choice){  //handles choice of login/signup/anon
		this.setState({
			initStyle: {display: 'none'}
		});

		if(choice == "login"){
			this.setState({
				"loginStyle": {display: 'block'}
			});
		}
		else if(choice == "signup"){
			this.setState({
				"loginStyle": {display: 'block'},
				"isSignUp": true
			});
		}
		else{    //anonymous usage
			this.setState({
				"dispName": "Your",
				"initContStyle": {display: 'none'},
				"schedDisp": {display: 'block'},
				"renderPhase": 1,
				"currView": "AAPL"
			});

			this.handleListSel("AAPL", 0, '1m');
		}
	}

	handleUserChange(input){ //handles username input
		this.setState({
			"uInput": input
		});
	}

	handlePassChange(input){ //handles password input
		this.setState({
			"pInput": input
		});
	}

	handlePass2Change(input){ //handles password confirmation input
		this.setState({
			"p2Input": input
		});
	}

	handleInitCancel(whichStyle){  //handles cancel on the login/signup page
		let stateObj = {
			"initStyle": {display: 'block'},
			"loginStyle": {display: 'none'},
			"loginErr": null,
			"loadingMsg": null,
			"uInput": "",
			"pInput": "",
			"p2Input": "",
			"isSignUp": false
		};

		this.setState(stateObj);
	}

	handleLogin(){
		if(this.state.isSignUp){ //filters out signup issues
			if(this.state.pInput != this.state.p2Input){
				this.setState({
					"loginErr": "Passwords must match"
				});
			}
			else if(this.state.uInput.length == 0){
				this.setState({
					"loginErr": "You must have a username"
				});
			}
			else if(this.state.pInput.length == 0){
				this.setState({
					"loginErr": "Password cannot be empty"
				});
			}
			else if(this.state.pInput.length < 6){
				this.setState({
					"loginErr": "Password must be at least 6 characters long"
				});
			}
			else{  //this controls the signup function if no prev problems
				let url = this.state.fetchUrl + '/signup';
				let signupObj = {
					'username': this.state.uInput,
					'password': this.state.pInput,
					'stockList': this.state.stockList,
					'accountCash': this.state.accountCash
				};

				this.setState({  //displays loading while fetching
					"loadingMsg": "Loading...",
					"loginErr": ""
				});

				fetch(url, {
					method: 'POST',
					body: JSON.stringify(signupObj),
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.then(res => res.json())
				.then(data => {
					if(data.openName){
						return true;
					}
					else{
						this.setState({
							"loginErr": "Username taken",
							"loadingMsg": ""
						});
						return false;
					}
				})
				.then(result => {
					if(result){
						let dispName = this.state.uInput + '\'s';
						this.setState({
							"renderPhase": 1,
							"pInput": "",
							"p2Input": "",
							"isSignUp": false,
							"currName": this.state.uInput,
							"dispName": dispName,
							"currView": "AAPL"
						});
					}
				})
				.then(() => {
					this.handleListSel("AAPL", 0, '1m');
				});
			}
		}
		else{ //this controls the login function
			let url = this.state.fetchUrl + '/login';
			let loginObj = {
				'username': this.state.uInput,
				'password': this.state.pInput,
			};

			this.setState({  //displays loading while fetching
				"loadingMsg": "Loading...",
				"loginErr": ""
			});

			fetch(url, {
				method: 'POST',
				body: JSON.stringify(loginObj),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then(res => res.json())
			.then(resObj => {
				if(resObj.login){
					let dispName = this.state.uInput + '\'s';
					this.setState({
						"stockList": resObj.stockList,
						"accountCash": resObj.accountCash,
						"renderPhase": 1,
						"pInput": "",
						"p2Input": "",
						"isSignUp": false,
						"currView": resObj.stockList[0].symbol,
						"currName": this.state.uInput,
						"dispName": dispName,
						"loadingMsg": null
					});

					return resObj.stockList[0].symbol;
				}
				else{
					this.setState({
						"loginErr": "Username/Password incorrect",
						"loadingMsg": null
					});

					return false;
				}
			})
			.then(setBool => {
				if(setBool){
					this.handleListSel(setBool, 0, '1m');
				}
			});

		}
	}

	handleListSel(symbol, ind, timespan){  //this handles getting data when a symobl is selected
		let url = this.state.fetchUrl + '/update';
		let bodyData = {
			'symbol': symbol,
			'timespan': timespan
		}
		fetch(url, {
			method: 'POST',
			body: JSON.stringify(bodyData),
			headers: {
				'Content-type': 'application/json'
			}
		})
		.then(res => res.json())
		.then(data => {
			if(Array.isArray(data)){
				let tmpWidth = 400;
				let tmpHt = 400;
				let arrLen = data[1].length;
				let span = data[0][1] - data[0][0];

				if((data[1].length * 30 + 50)> tmpWidth){
					tmpWidth = arrLen * 30;
				}

				if(span * 10 + 50 > tmpHt){
					tmpHt = span * 10;
				}

				let currPrice = data[1][arrLen - 1].close;

				this.setState({
					"graphYMinMax": data[0],
					"currStockData": data[1],
					"canvWidth": tmpWidth,
					"canvHt": tmpHt,
					"currView": symbol,
					"currViewInd": ind,
					"currPrice": currPrice,
					"currTimespan": timespan,
					"searchError": ""
				});
			}
			else{
				this.setState({
					"searchError": "Symbol not found"
				});
			}
		});

	}

	handleGraphToggle(timespan){  //handles toggling of the timespan for graph
		if(timespan != this.state.currTimespan){
			this.setState({
				"currTimespan": timespan
			}, this.handleListSel(this.state.currView, this.state.currViewInd, timespan));
		}
	}

	handleGraphHover(indNum){  //handles clicking of the bars on the graph
		this.setState({
			"graphHoverInd": indNum
		});
	}

	handleSetCanvasWidth(width){
		this.setState({
			"canvWidth": width
		});
	}

	handleFormChange(inVal){
		this.setState({
			"tradeAmt": Number(inVal)
		});
	}

	handleTradeAction(action){
		this.setState({
			"tradeAction": action,
			"tradeDisp": {display: 'block'}
		});
	}

	handleTradeSubmit(){  //this handles buy/sell operations, and posts the data to server
		let listInd = this.state.currViewInd;
		let currPrice = Number(this.state.currPrice);
		let shareAmt = Number(this.state.tradeAmt);
		let currShare;
		let currView = this.state.currView;

		if(listInd < 0){
			currShare = 0;
		}
		else{
			currShare = Number(this.state.stockList[listInd].shares);
		}
		let cost = Number(currPrice * shareAmt);
		let url = this.state.fetchUrl + '/userData';
		let newStockObj = {};
		let newCash;
		let newShares;
		let newStocklistArr;

		if(this.state.tradeAction == 'Buy'){	//handles 'buy' action
			if(cost > this.state.accountCash){
				this.setState({
					"tradeError": "Not enough cash"
				});
				return;
			}
			else{
				newCash = this.state.accountCash - cost;
				newShares =  currShare + shareAmt;				
			}
		}
		else if(this.state.tradeAction == 'Sell'){  //handles 'sell'
			if(shareAmt > currShare){
				this.setState({
					"tradeError": "Not enough shares"
				});
				return
			}
			else{
				newCash = this.state.accountCash + cost;
				newShares = currShare - shareAmt;
			}		
		}

		newCash = Math.round(newCash * 100) / 100;
		newStockObj["symbol"] = this.state.currView;
		newStockObj["shares"] = newShares;
		newStocklistArr = this.state.stockList.map(item => {
				return item;
		});

		if(listInd > -1){
			newStocklistArr.splice(this.state.currViewInd, 1, newStockObj);
		}
		else{
			newStocklistArr.push(newStockObj);
			listInd = newStocklistArr.length - 1;
			currView = this.state.searchInput.toUpperCase();
		}

		if(newShares == 0){
			newStocklistArr.splice(this.state.currViewInd, 1);
			listInd = 0;
			currView = newStocklistArr[0].symbol;
		}
		

		this.setState({
			"accountCash": newCash,
			"stockList": newStocklistArr,
			"tradeAction": "",
			"tradeDisp": {display: 'none'},
			"tradeAmt": 0,
			"tradeError": "",
			"currViewInd": listInd,
			"currView": currView,
			"searchInput": ""
		});

		if(this.state.currName != 'anonymous'){  //if signed in, update db
			let url = this.state.fetchUrl + '/trade';
			let postBody = {
				"username": this.state.currName,
				"updateObj": newStocklistArr,
				"accountCash": newCash
			};
					
			fetch(url, {    //makes post call to server/db
				method: 'POST',
				body: JSON.stringify(postBody),
				headers: {
					'Content-type': 'application/json'
				}
			});
		}
	}

	handleTradeCancel(){
		this.setState({
			"tradeAction": "",
			"tradeDisp": {display: 'none'},
			"tradeAmt": 0,
			"tradeError": ""
		});
	}

	handleSearchChange(inVal){
		this.setState({
			"searchInput": inVal
		});
	}

	handleSearchSubmit(){
		let searchSym = this.state.searchInput.toUpperCase();
		let listInd = this.state.stockList.findIndex(stockObj=> searchSym == stockObj.symbol);

		this.handleListSel(searchSym, listInd, '1m');
	}


	render(){
		let renderView;
		if(this.state.renderPhase == 0){
			renderView = <div className={Style.initCont} style={this.state.initContStyle}>
					<InitGreet style={this.state.initStyle} handleInitSel={this.handleInitSel} />
					<Login style={this.state.loginStyle} username={this.state.uInput} password={this.state.pInput} onUChange={this.handleUserChange} onPChange={this.handlePassChange} onP2Change={this.handlePass2Change} onCancel={this.handleInitCancel} onSubmit={this.handleLogin} signup={this.state.isSignUp} loading={this.state.loadingMsg} err={this.state.loginErr} />
				</div>;
		}
		else{
			let currShares;
			if(this.state.currViewInd < 0){
				currShares = 0;
			}
			else{
				currShares = this.state.stockList[this.state.currViewInd].shares;
			}
			renderView = <div>
				<StockSearch input={this.state.searchInput} err={this.state.searchError} onChange={this.handleSearchChange} onSearch={this.handleSearchSubmit} />
				<StockListComp list={this.state.stockList} currInd={this.state.currViewInd} onClick={this.handleListSel} />
				<DataSmallDispComp stockData={this.state.currStockData[this.state.graphHoverInd]} />
				<GraphToggle symbol={this.state.currView} currPrice={this.state.currPrice} selected={this.state.currTimespan} shares={currShares} cash={this.state.accountCash} onToggle={this.handleGraphToggle} />
				<GraphComp data={this.state.currStockData} onHover={this.handleGraphHover} minmax={this.state.graphYMinMax} graphWidth={this.state.canvWidth} graphHt={this.state.canvHt} setWidth={this.handleSetCanvasWidth} />
				<TradingComp onClick={this.handleTradeAction} />
				<TradeForm style={this.state.tradeDisp} action={this.state.tradeAction} onChange={this.handleFormChange} onSubmit={this.handleTradeSubmit} inVal={this.state.tradeAmt} onCancel={this.handleTradeCancel} error={this.state.tradeError} />
			</div>;
		}
		return(
			<div className={Style.block}>
				{renderView}				
			</div>
		);
	}
}

export default RootComponent;

const wrapper = document.getElementById("app");

wrapper ? ReactDOM.render(<RootComponent />, wrapper) : false;