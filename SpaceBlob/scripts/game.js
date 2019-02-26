var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function Square(props) {
	return React.createElement(
		"button",
		{ className: "square", onClick: props.onClick },
		props.value
	);
}

var Board = function (_React$Component) {
	_inherits(Board, _React$Component);

	function Board(props) {
		_classCallCheck(this, Board);

		var _this = _possibleConstructorReturn(this, (Board.__proto__ || Object.getPrototypeOf(Board)).call(this, props));

		_this.universe1 = new Universe(UNIVERSEONEPLANETS);

		console.log(_this.universe1);
		_this.state = {
			squares: _this.initializeUniverse(_this.universe1)
		};
		return _this;
	}

	_createClass(Board, [{
		key: "initializeUniverse",
		value: function initializeUniverse(curVerse) {
			var universeSize = curVerse.getLocation(0);

			var newSquares = Array(universeSize.x * universeSize.y).fill(null);
			for (var i = 1; i < curVerse.getSize(); i++) {
				var loc = curVerse.getLocation(i);
				var arrIndex = loc.x + loc.y * universeSize.y;
				console.log(arrIndex);
				newSquares[arrIndex] = 10;
			}
			return newSquares;
		}
	}, {
		key: "handleClick",
		value: function handleClick(i) {
			var squares = this.state.squares.slice();
			squares[i] += 1;
			this.setState({ squares: squares });
		}
	}, {
		key: "renderSquare",
		value: function renderSquare(i) {
			var _this2 = this;

			return React.createElement(Square, { key: i,
				value: this.state.squares[i],
				onClick: function onClick() {
					return _this2.handleClick(i);
				}
			});
		}
	}, {
		key: "renderBoard",
		value: function renderBoard() {

			var board = [];
			var rows = 3;
			var cols = 3;
			for (var i = 0; i < rows; i++) {
				var curRow = [];
				for (var j = 0; j < cols; j++) {
					curRow[j] = this.renderSquare(j + cols * i);
				}
				board.push(React.createElement(
					"div",
					{ className: "newRow" },
					curRow
				));
			}
			return board;
		}
	}, {
		key: "updateTick",
		value: function updateTick() {}
	}, {
		key: "render",
		value: function render() {

			return React.createElement(
				"div",
				null,
				this.renderBoard()
			);
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			var _this3 = this;

			this.interval = setInterval(function () {
				_this3.handleClick(4);
			}, 1000);
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			clearInterval(this.interval);
		}
	}]);

	return Board;
}(React.Component);

var Game = function (_React$Component2) {
	_inherits(Game, _React$Component2);

	function Game() {
		_classCallCheck(this, Game);

		return _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).apply(this, arguments));
	}

	_createClass(Game, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ className: "game" },
				React.createElement(
					"div",
					{ className: "game-board" },
					React.createElement(Board, null)
				),
				React.createElement(
					"div",
					{ className: "game-info" },
					React.createElement("div", null),
					React.createElement("ol", null)
				)
			);
		}
	}]);

	return Game;
}(React.Component);

// ========================================

ReactDOM.render(React.createElement(Game, null), document.querySelector('#playSpace'));

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