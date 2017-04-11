webpackJsonp([3],{

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
	
	var _extends2 = __webpack_require__(83);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
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
	
	var _objectAssign = __webpack_require__(91);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	__webpack_require__(294);
	
	__webpack_require__(295);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// use jsx to render html, do not modify simple.html
	
	var animType = _rcBannerAnim2.default.animType,
	    setAnimCompToTagComp = _rcBannerAnim2.default.setAnimCompToTagComp;
	
	
	animType.custom = function (elem, type, direction, animData) {
	  console.log('custom animType, type:' + type); // eslint-disable-line no-console
	  var _y = void 0;
	  var props = (0, _objectAssign2.default)({}, elem.props);
	  var children = props.children;
	  if (type === 'enter') {
	    _y = direction === 'next' ? '-100%' : '100%';
	  } else {
	    _y = direction === 'next' ? '50%' : '-50%';
	    children = _react2.default.Children.toArray(children).map(setAnimCompToTagComp);
	  }
	  return _react2.default.cloneElement(elem, (0, _extends3.default)({}, props, {
	    animation: (0, _extends3.default)({}, animData, {
	      y: _y,
	      delay: type === 'enter' ? 0 : 50,
	      type: type === 'enter' ? 'from' : 'to'
	    })
	  }), children);
	};
	
	var Element = _rcBannerAnim2.default.Element;
	
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
	      { type: 'custom' },
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
//# sourceMappingURL=customAnimType.js.map