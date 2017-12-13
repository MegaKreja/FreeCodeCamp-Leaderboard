var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var request = superagent;

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.handleClick = _this.handleClick.bind(_this);
    _this.state = {
      isAllTime: false,
      topThirty: [],
      topAllTime: []
    };
    return _this;
  }

  _createClass(App, [{
    key: 'handleClick',
    value: function handleClick() {
      this.setState(function (prevState) {
        return {
          isAllTime: !prevState.isAllTime
        };
      });
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      request.get('https://fcctop100.herokuapp.com/api/fccusers/top/recent').end(function (err, res) {
        _this2.setState({ topThirty: res.body });
      });

      request.get('https://fcctop100.herokuapp.com/api/fccusers/top/alltime').end(function (err, res) {
        _this2.setState({ topAllTime: res.body });
      });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      console.log(prevState);
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { id: 'container' },
        React.createElement(Header, null),
        React.createElement(Button, { onClick: this.handleClick, isAllTime: this.state.isAllTime }),
        React.createElement(Leaderboard, { isAllTime: this.state.isAllTime, topThirty: this.state.topThirty, topAllTime: this.state.topAllTime })
      );
    }
  }]);

  return App;
}(React.Component);

var Header = function Header(props) {
  return React.createElement(
    'div',
    { id: 'header' },
    React.createElement('img', { src: 'https://avatars0.githubusercontent.com/u/9892522?s=400&v=4' }),
    React.createElement(
      'h1',
      null,
      'freeCodeCamp'
    )
  );
};

var Button = function Button(props) {
  return React.createElement(
    'button',
    { id: 'btn', onClick: props.onClick },
    !props.isAllTime ? "Sort by all time" : "Sort by top 30 campers"
  );
};

var Leaderboard = function (_React$Component2) {
  _inherits(Leaderboard, _React$Component2);

  function Leaderboard() {
    _classCallCheck(this, Leaderboard);

    return _possibleConstructorReturn(this, (Leaderboard.__proto__ || Object.getPrototypeOf(Leaderboard)).apply(this, arguments));
  }

  _createClass(Leaderboard, [{
    key: 'render',
    value: function render() {
      var campersTopThirty = this.props.topThirty.map(function (camper, i) {
        return React.createElement(
          'tr',
          null,
          React.createElement(
            'td',
            null,
            i + 1 + "."
          ),
          React.createElement(
            'td',
            null,
            React.createElement('img', { src: camper.img }),
            camper.username
          ),
          React.createElement(
            'td',
            null,
            camper.recent
          ),
          React.createElement(
            'td',
            null,
            camper.alltime
          )
        );
      });
      var campersTopAllTime = this.props.topAllTime.map(function (camper, i) {
        return React.createElement(
          'tr',
          null,
          React.createElement(
            'td',
            null,
            i + 1 + "."
          ),
          React.createElement(
            'td',
            null,
            React.createElement('img', { src: camper.img }),
            camper.username
          ),
          React.createElement(
            'td',
            null,
            camper.recent
          ),
          React.createElement(
            'td',
            null,
            camper.alltime
          )
        );
      });

      return React.createElement(
        'table',
        { id: 'table' },
        React.createElement(
          'tr',
          null,
          React.createElement(
            'th',
            null,
            '#'
          ),
          React.createElement(
            'th',
            null,
            'Camper Name'
          ),
          React.createElement(
            'th',
            null,
            'Points in past 30 days'
          ),
          React.createElement(
            'th',
            null,
            'All time points'
          )
        ),
        !this.props.isAllTime ? campersTopThirty : campersTopAllTime
      );
    }
  }]);

  return Leaderboard;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById("app"));