webpackJsonp([9],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(306);


/***/ },

/***/ 306:
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
	
	__webpack_require__(294);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Element = _rcBannerAnim2.default.Element; // use jsx to render html, do not modify simple.html
	
	var BgElement = Element.BgElement;
	
	var Demo = function (_React$Component) {
	  (0, _inherits3.default)(Demo, _React$Component);
	
	  function Demo() {
	    (0, _classCallCheck3.default)(this, Demo);
	    return (0, _possibleConstructorReturn3.default)(this, _React$Component.apply(this, arguments));
	  }
	
	  Demo.prototype.render = function render() {
	    return _react2.default.createElement(
	      _rcBannerAnim2.default,
	      { thumbFloat: false, prefixCls: 'banner-thumb-bottom' },
	      _react2.default.createElement(
	        Element,
	        { key: 'aaa',
	          prefixCls: 'banner-user-elem'
	        },
	        _react2.default.createElement(BgElement, {
	          key: 'bg',
	          className: 'bg',
	          style: {
	            backgroundImage: 'url(https://os.alipayobjects.com/rmsportal/IhCNTqPpLeTNnwr.jpg)',
	            backgroundSize: 'cover',
	            backgroundPosition: 'center'
	          }
	        }),
	        _react2.default.createElement(
	          _rcQueueAnim2.default,
	          { name: 'QueueAnim' },
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
	          { animation: { y: 50, opacity: 0, type: 'from', delay: 200 }, name: 'TweenOne' },
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
	            backgroundImage: 'url(https://os.alipayobjects.com/rmsportal/uaQVvDrCwryVlbb.jpg)',
	            backgroundSize: 'cover',
	            backgroundPosition: 'center'
	          }
	        }),
	        _react2.default.createElement(
	          _rcQueueAnim2.default,
	          { name: 'QueueAnim' },
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
	          { animation: { y: 50, opacity: 0, type: 'from', delay: 200 }, name: 'TweenOne' },
	          'Ant Motion Demo.Ant Motion Demo'
	        )
	      )
	    );
	  };
	
	  return Demo;
	}(_react2.default.Component);
	
	_reactDom2.default.render(_react2.default.createElement(Demo, null), document.getElementById('__react-content'));

/***/ }

});
//# sourceMappingURL=thumbBottom.js.map