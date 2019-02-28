

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
	this.universe1 = new Universe(UNIVERSEONEPLANETS);
	

    this.state = {
      squares: this.initializeUniverse(this.universe1),

    };
	console.log(this.state.squares.length);
  }

  initializeUniverse(curVerse){
	let universeSize = curVerse.getLocation(0);

	let newSquares = Array(universeSize.x*universeSize.y).fill(null);
	for (let i=1;i<curVerse.getSize();i++) {
		let loc = curVerse.getLocation(i);
		let arrIndex = loc.x +(loc.y * universeSize.x);
		newSquares[arrIndex] = 10;
	}
	return newSquares;
  }
  
  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] += 1;
    this.setState({squares: squares});
  }

  renderSquare(i) {
    return (
      <Square key={i}
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }
	
	renderBoard(curVerse) {
		let universeSize = curVerse.getLocation(0);
		let board = [];
		for (let i = 0;i<universeSize.y;i++) {
			let curRow = [];
			for (let j = 0;j<universeSize.x;j++){
				curRow[j] = this.renderSquare(j+universeSize.x*i);
			}
			board.push(<div className="newRow">{curRow}</div>);
		}
		return board;
	}
	updateTick (){
		
	}
  render() {

    return (
		<div>
			{this.renderBoard(this.universe1)}
		</div>
    );
  }
  
  componentDidMount() {
		this.interval = setInterval(() => {
			this.handleClick(4);
		}, 1000);
	}
  
  componentWillUnmount() {
    clearInterval(this.interval);
  }
}

class Game extends React.Component {

	
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.querySelector('#playSpace')
);



/*
function Square(props) {

    return cE('button', {className: 'square'},props.value)
}

function newRow(props) {

    return cE('button', {className: 'square'})
}

class gameMap extends React.Component {
	renderSquare(i) {
		return cE('Square',{value:{i}},null);
//		return cE('Square',{value:{this.state.board[i]}, onClick:{() => this.handleClick(i)}});
	}
	constructor() {
		super();
		this.rows = HEIGHT / CELL_SIZE;
		this.cols = WIDTH / CELL_SIZE;
		this.state.board = this.makeEmptyBoard();
  }
  state = {
    board: [],
  }
  
  makeEmptyRow(curRow) {
	let row = [];
	for (let i = 0; i < this.cols; i++) {
		row[i] = this.renderSquare(curRow,i);
	}
	return row;
  }
  
  // Create an empty board
	makeEmptyBoard() {
    let board = [];
    for (let y = 0; y < this.rows; y++) {
      board[y] = cE('div',{className: 'newRow', style:{top: CELL_SIZE*y}},this.makeEmptyRow(y));
    }
    return board;
  }
		
	render() {
	//return (cE('div',null,cE('div',{className: "Board", style: {width: WIDTH,height: HEIGHT,backgroundSize: CELL_SIZE + "px " + CELL_SIZE + "px" }})));
	return this.state.board;
	}
	
	onClick(props) {
		this.handleClick(props);
	}
	
	handleClick (props) {
		//this.setState(
	}
}

class Node extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: null,
		};
//		let classification=props.classification;
	}
}

class Generator extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			value: null,
		};
		//let perTick = 1;
	}
	
}
*/
//const domContainer = document.querySelector('#playSpace');
//let test = cE(gameMap);
//ReactDOM.render(test, domContainer);
//setInterval(function(){ test.setSt; }, 3000);