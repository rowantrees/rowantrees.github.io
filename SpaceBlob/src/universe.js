class Universe extends React.Component {
	constructor(props) {
		super(props);
		this.state = {planets: props};
	}
	getLocation(i){
		return ({x:this.state.planets[i].x,y:this.state.planets[i].y});
	}
	getType(i) {
		return this.state.planets[i].planetType;
	}
	getSize(){
		return this.state.planets.length;
	}
	render(){
		
	}
}