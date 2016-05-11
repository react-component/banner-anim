webpackJsonp([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(198);


/***/ },

/***/ 198:
/***/ function(module, exports, __webpack_require__) {

	// use jsx to render html, do not modify simple.html
	
	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
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
	
	var _objectAssign = __webpack_require__(172);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	__webpack_require__(196);
	
	var animType = _rcBannerAnim2['default'].animType;
	var setAnimCompToTagComp = _rcBannerAnim2['default'].setAnimCompToTagComp;
	
	animType.custom = function (elem, type, direction, animData) {
	  console.log('custom animType, type:' + type);
	  var _y = undefined;
	  var props = (0, _objectAssign2['default'])({}, elem.props);
	  var children = props.children;
	  if (type === 'enter') {
	    _y = direction === 'next' ? '-100%' : '100%';
	  } else {
	    // 时间轴不同，导致中间有空隙， 等修复 twee-one,先加delay
	    _y = direction === 'next' ? '50%' : '-50%';
	    children = _react2['default'].Children.toArray(children).map(setAnimCompToTagComp);
	  }
	  return _react2['default'].cloneElement(elem, _extends({}, props, {
	    animation: _extends({}, animData, {
	      y: _y,
	      delay: type === 'enter' ? 0 : 50,
	      type: type === 'enter' ? 'from' : 'to'
	    })
	  }), children);
	};
	
	var Element = _rcBannerAnim2['default'].Element;
	
	var Demo = (function (_React$Component) {
	  _inherits(Demo, _React$Component);
	
	  function Demo() {
	    _classCallCheck(this, Demo);
	
	    _get(Object.getPrototypeOf(Demo.prototype), 'constructor', this).apply(this, arguments);
	  }
	
	  _createClass(Demo, [{
	    key: 'render',
	    value: function render() {
	      return _react2['default'].createElement(
	        _rcBannerAnim2['default'],
	        { type: 'custom' },
	        _react2['default'].createElement(
	          Element,
	          { key: 'aaa',
	            prefixCls: 'banner-user-elem',
	            img: 'https://os.alipayobjects.com/rmsportal/IhCNTqPpLeTNnwr.jpg'
	          },
	          _react2['default'].createElement(
	            _rcQueueAnim2['default'],
	            { name: 'QueueAnim' },
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
	            { animation: { y: 50, opacity: 0, type: 'from' }, name: 'TweenOne' },
	            'Ant Motion Demo.Ant Motion Demo'
	          )
	        ),
	        _react2['default'].createElement(
	          Element,
	          { key: 'bbb',
	            prefixCls: 'banner-user-elem',
	            img: 'https://os.alipayobjects.com/rmsportal/uaQVvDrCwryVlbb.jpg'
	          },
	          _react2['default'].createElement(
	            _rcQueueAnim2['default'],
	            { name: 'QueueAnim' },
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
	            { animation: { y: 50, opacity: 0, type: 'from' }, name: 'TweenOne' },
	            'Ant Motion Demo.Ant Motion Demo'
	          )
	        )
	      );
	    }
	  }]);
	
	  return Demo;
	})(_react2['default'].Component);
	
	_reactDom2['default'].render(_react2['default'].createElement(Demo, null), document.getElementById('__react-content'));

/***/ }

});
//# sourceMappingURL=customAnimType.js.map