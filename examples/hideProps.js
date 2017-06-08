webpackJsonp([7],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(318);


/***/ }),

/***/ 318:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _classCallCheck2 = __webpack_require__(2);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(3);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(72);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _rcBannerAnim = __webpack_require__(80);
	
	var _rcBannerAnim2 = _interopRequireDefault(_rcBannerAnim);
	
	var _rcQueueAnim = __webpack_require__(292);
	
	var _rcQueueAnim2 = _interopRequireDefault(_rcQueueAnim);
	
	var _rcTweenOne = __webpack_require__(288);
	
	var _rcTweenOne2 = _interopRequireDefault(_rcTweenOne);
	
	var _react = __webpack_require__(88);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(123);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	__webpack_require__(307);
	
	__webpack_require__(308);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Element = _rcBannerAnim2.default.Element; // use jsx to render html, do not modify simple.html
	
	var BgElement = Element.BgElement;
	
	var Demo = function (_React$Component) {
	  (0, _inherits3.default)(Demo, _React$Component);
	
	  function Demo() {
	    (0, _classCallCheck3.default)(this, Demo);
	
	    var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.apply(this, arguments));
	
	    _this.onChange = function (e, int) {
	      // 在切换到下一个后把延时改掉。
	      if (int === 1 && e === 'after' && !_this.openSlide) {
	        _this.setState({
	          delay: 600
	        });
	        _this.openSlide = true;
	      }
	    };
	
	    _this.onClick = function () {
	      _this.refs.banner.slickGoTo(1);
	    };
	
	    _this.state = {
	      delay: 0
	    };
	    _this.openSlide = false;
	    return _this;
	  }
	
	  Demo.prototype.render = function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'a',
	        { onClick: this.onClick },
	        '\u70B9\u51FB\u8DF3\u5230\u7B2C\u4E8C\u5757'
	      ),
	      _react2.default.createElement(
	        _rcBannerAnim2.default,
	        { prefixCls: 'banner-user', type: 'across',
	          onChange: this.onChange,
	          duration: 1000,
	          ease: 'easeInOutExpo',
	          sync: true,
	          ref: 'banner'
	        },
	        _react2.default.createElement(
	          Element,
	          { key: 'aaa',
	            prefixCls: 'banner-user-elem',
	            hideProps: { 2: { reverse: true } }
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
	            { key: '1', name: 'QueueAnim', delay: [this.state.delay, 0] },
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
	            { key: '2',
	              animation: { y: 50, opacity: 0, type: 'from', delay: this.state.delay + 200 }
	            },
	            'Ant Motion Demo.Ant Motion Demo'
	          )
	        ),
	        _react2.default.createElement(
	          Element,
	          { key: 'bbb',
	            prefixCls: 'banner-user-elem',
	            hideProps: { 2: { reverse: true } }
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
	            { name: 'QueueAnim', key: '1', delay: [600, 0] },
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
	            { animation: { y: 50, opacity: 0, type: 'from', delay: 800 }, key: '2' },
	            'Ant Motion Demo.Ant Motion Demo'
	          )
	        )
	      )
	    );
	  };
	
	  return Demo;
	}(_react2.default.Component);
	
	_reactDom2.default.render(_react2.default.createElement(Demo, null), document.getElementById('__react-content'));

/***/ })

});
//# sourceMappingURL=hideProps.js.map