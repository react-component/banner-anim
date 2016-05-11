webpackJsonp([3],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(199);


/***/ },

/***/ 199:
/***/ function(module, exports, __webpack_require__) {

	// use jsx to render html, do not modify simple.html
	
	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _rcBannerAnim = __webpack_require__(2);
	
	var _rcBannerAnim2 = _interopRequireDefault(_rcBannerAnim);
	
	var _rcQueueAnim = __webpack_require__(190);
	
	var _rcQueueAnim2 = _interopRequireDefault(_rcQueueAnim);
	
	var _rcTweenOne = __webpack_require__(175);
	
	var _rcTweenOne2 = _interopRequireDefault(_rcTweenOne);
	
	var _react = __webpack_require__(5);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(37);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	__webpack_require__(196);
	
	__webpack_require__(200);
	
	var Element = _rcBannerAnim2['default'].Element;
	var Arrow = _rcBannerAnim2['default'].Arrow;
	
	var Demo = (function (_React$Component) {
	  _inherits(Demo, _React$Component);
	
	  function Demo() {
	    var _this = this;
	
	    _classCallCheck(this, Demo);
	
	    _get(Object.getPrototypeOf(Demo.prototype), 'constructor', this).apply(this, arguments);
	    this.imgArray = ['https://os.alipayobjects.com/rmsportal/IhCNTqPpLeTNnwr.jpg', 'https://os.alipayobjects.com/rmsportal/uaQVvDrCwryVlbb.jpg'];
	    this.state = {
	      intShow: 0,
	      prevEnter: false,
	      nextEnter: false
	    };
	    ['onChange', 'prevEnter', 'prevLeave', 'nextEnter', 'nextLeave'].forEach(function (method) {
	      return _this[method] = _this[method].bind(_this);
	    });
	  }
	
	  _createClass(Demo, [{
	    key: 'onChange',
	    value: function onChange(type, int) {
	      if (type === 'before') {
	        this.setState({
	          intShow: int
	        });
	      }
	    }
	  }, {
	    key: 'getNextPrevNumber',
	    value: function getNextPrevNumber() {
	      var nextInt = this.state.intShow + 1;
	      var prevInt = this.state.intShow - 1;
	      if (nextInt >= this.imgArray.length) {
	        nextInt = 0;
	      }
	      if (prevInt < 0) {
	        prevInt = this.imgArray.length - 1;
	      }
	
	      return [prevInt, nextInt];
	    }
	  }, {
	    key: 'prevEnter',
	    value: function prevEnter() {
	      this.setState({
	        prevEnter: true
	      });
	    }
	  }, {
	    key: 'prevLeave',
	    value: function prevLeave() {
	      this.setState({
	        prevEnter: false
	      });
	    }
	  }, {
	    key: 'nextEnter',
	    value: function nextEnter() {
	      this.setState({
	        nextEnter: true
	      });
	    }
	  }, {
	    key: 'nextLeave',
	    value: function nextLeave() {
	      this.setState({
	        nextEnter: false
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var intArray = this.getNextPrevNumber();
	      return _react2['default'].createElement(
	        _rcBannerAnim2['default'],
	        { onChange: this.onChange },
	        _react2['default'].createElement(
	          Element,
	          { key: 'aaa',
	            prefixCls: 'banner-user-elem',
	            img: this.imgArray[0]
	          },
	          _react2['default'].createElement(
	            _rcQueueAnim2['default'],
	            { key: '1', name: 'QueueAnim' },
	            _react2['default'].createElement(
	              'h1',
	              { key: 'h1' },
	              'Ant Motion Demo'
	            ),
	            _react2['default'].createElement(
	              'p',
	              { key: 'p' },
	              'Ant Motion Demo.Ant Motion Demo.Ant Motion Demo.Ant Motion Demo'
	            )
	          ),
	          _react2['default'].createElement(
	            _rcTweenOne2['default'],
	            { animation: { y: 50, opacity: 0, type: 'from' }, key: '2', name: 'TweenOne' },
	            'Ant Motion Demo.Ant Motion Demo'
	          )
	        ),
	        _react2['default'].createElement(
	          Element,
	          { key: 'bbb',
	            prefixCls: 'banner-user-elem',
	            img: this.imgArray[1]
	          },
	          _react2['default'].createElement(
	            _rcQueueAnim2['default'],
	            { key: '1', name: 'QueueAnim' },
	            _react2['default'].createElement(
	              'h1',
	              { key: 'h1' },
	              'Ant Motion Demo'
	            ),
	            _react2['default'].createElement(
	              'p',
	              { key: 'p' },
	              'Ant Motion Demo.Ant Motion Demo.Ant Motion Demo.Ant Motion Demo'
	            )
	          ),
	          _react2['default'].createElement(
	            _rcTweenOne2['default'],
	            { animation: { y: 50, opacity: 0, type: 'from' }, key: '2', name: 'TweenOne' },
	            'Ant Motion Demo.Ant Motion Demo'
	          )
	        ),
	        _react2['default'].createElement(
	          Arrow,
	          { arrowType: 'prev', key: 'prev', prefixCls: 'user-arrow', component: _rcTweenOne2['default'],
	            onMouseEnter: this.prevEnter,
	            onMouseLeave: this.prevLeave,
	            animation: { left: this.state.prevEnter ? 0 : -120 }
	          },
	          _react2['default'].createElement('div', { className: 'arrow' }),
	          _react2['default'].createElement(
	            _rcTweenOne.TweenOneGroup,
	            { enter: { opacity: 0, type: 'from' }, leave: { opacity: 0 }, appear: false, className: 'img-wrapper', component: 'ul' },
	            _react2['default'].createElement('li', { style: { backgroundImage: 'url(' + this.imgArray[intArray[0]] + ')' }, key: intArray[0] })
	          )
	        ),
	        _react2['default'].createElement(
	          Arrow,
	          { arrowType: 'next', key: 'next', prefixCls: 'user-arrow', component: _rcTweenOne2['default'],
	            onMouseEnter: this.nextEnter,
	            onMouseLeave: this.nextLeave,
	            animation: { right: this.state.nextEnter ? 0 : -120 }
	          },
	          _react2['default'].createElement('div', { className: 'arrow' }),
	          _react2['default'].createElement(
	            _rcTweenOne.TweenOneGroup,
	            { enter: { opacity: 0, type: 'from' }, leave: { opacity: 0 }, appear: false, className: 'img-wrapper', component: 'ul' },
	            _react2['default'].createElement('li', { style: { backgroundImage: 'url(' + this.imgArray[intArray[1]] + ')' }, key: intArray[1] })
	          )
	        )
	      );
	    }
	  }]);
	
	  return Demo;
	})(_react2['default'].Component);
	
	_reactDom2['default'].render(_react2['default'].createElement(Demo, null), document.getElementById('__react-content'));

/***/ },

/***/ 200:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

});
//# sourceMappingURL=customArrow.js.map