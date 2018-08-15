import React from 'react';
import Style from '../scss/GraphComp.scss';

class GraphComp extends React.Component{
	constructor(props){
		super(props);

		this.findXPos = this.findXPos.bind(this);
		this.calculateGraph = this.calculateGraph.bind(this);
	}

	calculateGraph(){
		let canvas = this.refs.canvas;
		let ctx = canvas.getContext("2d");
		let graphLo = this.props.minmax[0];
		let graphHi = this.props.minmax[1];
		let graphWidth = this.props.graphWidth;
		let graphHt = this.props.graphHt;
		/*let divWidth = document.getElementById("graphCont").offsetWidth;		
		
		if(divWidth - 10 > graphWidth){
			graphWidth = divWidth - 50;
			this.props.setWidth(divWidth - 10);
		}

		console.log(graphWidth);*/
		//let graphHt = 400;
		let yInterval = graphHi - graphLo;
		let pxlPD = Math.round(graphHt / (graphHi - graphLo));
		let arr1  = this.props.data;
		let arrLen = arr1.length;
		let startPxl = 55;
		

		ctx.beginPath();  //draw x and y axis
		ctx.strokeStyle = 'white';
		ctx.moveTo(50,0);
		ctx.lineTo(50, graphHt);
		ctx.moveTo(50, graphHt);
		ctx.lineTo(50 + graphWidth, graphHt);
		ctx.stroke();

	
		for(let j = 1; j < yInterval; j++){  //draw guiding horizontal reference lines
			let yVal = (graphHi - j);

			ctx.beginPath();
			ctx.strokeStyle = 'rgba(155, 135, 135, 0.3)';
			ctx.setLineDash([10, 5]);
			ctx.moveTo(50, j * pxlPD);
			ctx.lineTo(50 + graphWidth, j * pxlPD);
			ctx.fillStyle = "white";
			ctx.fillText(Math.round(yVal * 100)/100, 15, j * pxlPD, 50)
			ctx.stroke();
		}


		ctx.setLineDash([1,0]);
		ctx.lineWidth = 2;
		let xPosArr = [];

		for(let i = 0; i < arrLen; i++){  //draw individual bars
			if(arr1[i].change < 0){
				ctx.strokeStyle = 'rgb(224, 2, 2)'; //red
			}
			else{
				ctx.strokeStyle = 'rgb(2, 216, 0)';  //green
			}
			let opPixel = Math.round((graphHi - arr1[i].open) * pxlPD);
			let loPixel = Math.round((graphHi - arr1[i].low) * pxlPD);
			let hiPixel = Math.round((graphHi - arr1[i].high) * pxlPD);
			let clPixel =Math.round((graphHi - arr1[i].close) * pxlPD);
			
			ctx.beginPath();
			ctx.moveTo(startPxl, opPixel);  
			ctx.lineTo(startPxl + 8, opPixel);  //draw open
			ctx.moveTo(startPxl + 8, loPixel);			
			ctx.lineTo(startPxl + 8, hiPixel);  //draw high low
			ctx.moveTo(startPxl + 9, clPixel);
			ctx.lineTo(startPxl + 17, clPixel);  //draw close
			ctx.fillStyle = "white";
			ctx.fillText(arr1[i].label, startPxl+5, graphHt + 15, 30);  //draw date label
			ctx.stroke();

			xPosArr.push(startPxl);
			startPxl += 30;  //move to next position for next dataset
		}
	}

	findXPos(e){
		let canv = e.currentTarget;
		let dataLen = this.props.data.length;
		let canvOffsetX = canv.offsetLeft;
		let canvOffsetY = canv.offsetTop;
		let mouseX = e.pageX;
		let mouseY = e.pageY;
		let scrollX = canv.scrollLeft;
		let scrollY = canv.scrollTop;
		let hoverPosX = mouseX - canvOffsetX;
		let hoverPosY = mouseY - canvOffsetY + scrollY;		
		let graphPosX = hoverPosX + scrollX - 40;
		let indNum = Math.floor(graphPosX / 30);
		let dataset = this.props.data[indNum];
		let graphHt = this.props.graphHt;
		let pxlPD = graphHt / (this.props.minmax[1] - this.props.minmax[0]);
		let dollPos = this.props.minmax[1] - ( hoverPosY / pxlPD);

		if(indNum < dataLen && indNum > -1){
			if(dollPos > dataset.low && dollPos < dataset.high){
				this.props.onHover(indNum);
				//console.log(true, hoverPosY);
			}
			else{				
				console.log(false, dollPos, [dataset.low, dataset.high]);
			}
		}		
	}

	componentDidMount(){
		this.calculateGraph();
	}

	componentDidUpdate(){
		let canvas = this.refs.canvas;
		let ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		this.calculateGraph();
	}

	render(){		
		let mainContStyle = {
			maxWidth: this.props.graphWidth + 55
		};

		return(
			<div id="graphCont" style={mainContStyle} className={Style.mainCont} onClick={this.findXPos}>
				<canvas ref="canvas" width={this.props.graphWidth+50} height={this.props.graphHt+50}></canvas>
			</div>
		);
	}

}

export default GraphComp;