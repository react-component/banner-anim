webpackJsonp([4],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(299);


/***/ },

/***/ 299:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _classCallCheck2 = __webpack_require__(2);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(3);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(72);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _rcBannerAnim = __webpack_require__(80);
	
	var _rcBannerAnim2 = _interopRequireDefault(_rcBannerAnim);
	
	var _rcQueueAnim = __webpack_require__(286);
	
	var _rcQueueAnim2 = _interopRequireDefault(_rcQueueAnim);
	
	var _rcTweenOne = __webpack_require__(282);
	
	var _rcTweenOne2 = _interopRequireDefault(_rcTweenOne);
	
	var _react = __webpack_require__(88);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(119);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	__webpack_require__(293);
	
	__webpack_require__(300);
	
	__webpack_require__(294);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// use jsx to render html, do not modify simple.html
	
	var Element = _rcBannerAnim2.default.Element,
	    Arrow = _rcBannerAnim2.default.Arrow;
	
	var BgElement = Element.BgElement;
	
	var Demo = function (_React$Component) {
	  (0, _inherits3.default)(Demo, _React$Component);
	
	  function Demo() {
	    (0, _classCallCheck3.default)(this, Demo);
	
	    var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.apply(this, arguments));
	
	    _this.imgArray = ['https://os.alipayobjects.com/rmsportal/IhCNTqPpLeTNnwr.jpg', 'https://os.alipayobjects.com/rmsportal/uaQVvDrCwryVlbb.jpg'];
	    _this.state = {
	      intShow: 0,
	      prevEnter: false,
	      nextEnter: false
	    };
	    ['onChange', 'prevEnter', 'prevLeave', 'nextEnter', 'nextLeave'].forEach(function (method) {
	      return _this[method] = _this[method].bind(_this);
	    });
	    return _this;
	  }
	
	  Demo.prototype.onChange = function onChange(type, int) {
	    if (type === 'before') {
	      this.setState({
	        intShow: int
	      });
	    }
	  };
	
	  Demo.prototype.getNextPrevNumber = function getNextPrevNumber() {
	    var nextInt = this.state.intShow + 1;
	    var prevInt = this.state.intShow - 1;
	    if (nextInt >= this.imgArray.length) {
	      nextInt = 0;
	    }
	    if (prevInt < 0) {
	      prevInt = this.imgArray.length - 1;
	    }
	
	    return [prevInt, nextInt];
	  };
	
	  Demo.prototype.prevEnter = function prevEnter() {
	    this.setState({
	      prevEnter: true
	    });
	  };
	
	  Demo.prototype.prevLeave = function prevLeave() {
	    this.setState({
	      prevEnter: false
	    });
	  };
	
	  Demo.prototype.nextEnter = function nextEnter() {
	    this.setState({
	      nextEnter: true
	    });
	  };
	
	  Demo.prototype.nextLeave = function nextLeave() {
	    this.setState({
	      nextEnter: false
	    });
	  };
	
	  Demo.prototype.render = function render() {
	    var intArray = this.getNextPrevNumber();
	    return _react2.default.createElement(
	      _rcBannerAnim2.default,
	      { onChange: this.onChange },
	      _react2.default.createElement(
	        Element,
	        { key: 'aaa',
	          prefixCls: 'banner-user-elem'
	        },
	        _react2.default.createElement(BgElement, {
	          key: 'bg',
	          className: 'bg',
	          style: {
	            backgroundImage: 'url(' + this.imgArray[0] + ')',
	            backgroundSize: 'cover',
	            backgroundPosition: 'center'
	          }
	        }),
	        _react2.default.createElement(
	          _rcQueueAnim2.default,
	          { key: '1', name: 'QueueAnim' },
	          _react2.default.createElement(
	            'h1',
	            { key: 'h1' },
	            'Ant Motion Demo'
	          ),
	          _react2.default.createElement(
	            'p',
	            { key: 'p' },
	            'Ant Motion Demo.Ant Motion Demo.Ant Motion Demo.Ant Motion Demo'
	          )
	        ),
	        _react2.default.createElement(
	          _rcTweenOne2.default,
	          {
	            animation: { y: 50, opacity: 0, type: 'from', delay: 200 },
	            key: '2',
	            name: 'TweenOne'
	          },
	          'Ant Motion Demo.Ant Motion Demo'
	        )
	      ),
	      _react2.default.createElement(
	        Element,
	        { key: 'bbb',
	          prefixCls: 'banner-user-elem'
	        },
	        _react2.default.createElement(BgElement, {
	          key: 'bg',
	          className: 'bg',
	          style: {
	            backgroundImage: 'url(' + this.imgArray[1] + ')',
	            backgroundSize: 'cover',
	            backgroundPosition: 'center'
	          }
	        }),
	        _react2.default.createElement(
	          _rcQueueAnim2.default,
	          { key: '1', name: 'QueueAnim' },
	          _react2.default.createElement(
	            'h1',
	            { key: 'h1' },
	            'Ant Motion Demo'
	          ),
	          _react2.default.createElement(
	            'p',
	            { key: 'p' },
	            'Ant Motion Demo.Ant Motion Demo.Ant Motion Demo.Ant Motion Demo'
	          )
	        ),
	        _react2.default.createElement(
	          _rcTweenOne2.default,
	          {
	            animation: { y: 50, opacity: 0, type: 'from', delay: 200 },
	            key: '2',
	            name: 'TweenOne'
	          },
	          'Ant Motion Demo.Ant Motion Demo'
	        )
	      ),
	      _react2.default.createElement(
	        Arrow,
	        { arrowType: 'prev', key: 'prev', prefixCls: 'user-arrow', component: _rcTweenOne2.default,
	          onMouseEnter: this.prevEnter,
	          onMouseLeave: this.prevLeave,
	          animation: { left: this.state.prevEnter ? 0 : -120 }
	        },
	        _react2.default.createElement('div', { className: 'arrow' }),
	        _react2.default.createElement(
	          _rcTweenOne.TweenOneGroup,
	          { enter: { opacity: 0, type: 'from' }, leave: { opacity: 0 },
	            appear: false, className: 'img-wrapper', component: 'ul'
	          },
	          _react2.default.createElement('li', {
	            style: { backgroundImage: 'url(' + this.imgArray[intArray[0]] + ')' },
	            key: intArray[0]
	          })
	        )
	      ),
	      _react2.default.createElement(
	        Arrow,
	        { arrowType: 'next', key: 'next', prefixCls: 'user-arrow', component: _rcTweenOne2.default,
	          onMouseEnter: this.nextEnter,
	          onMouseLeave: this.nextLeave,
	          animation: { right: this.state.nextEnter ? 0 : -120 }
	        },
	        _react2.default.createElement('div', { className: 'arrow' }),
	        _react2.default.createElement(
	          _rcTweenOne.TweenOneGroup,
	          { enter: { opacity: 0, type: 'from', delay: 200 }, leave: { opacity: 0 },
	            className: 'img-wrapper', component: 'ul'
	          },
	          _react2.default.createElement('li', {
	            style: { backgroundImage: 'url(' + this.imgArray[intArray[1]] + ')' },
	            key: intArray[1]
	          })
	        )
	      )
	    );
	  };
	
	  return Demo;
	}(_react2.default.Component);
	
	_reactDom2.default.render(_react2.default.createElement(Demo, null), document.getElementById('__react-content'));

/***/ },

/***/ 300:
293

});
//# sourceMappingURL=customArrow.js.map