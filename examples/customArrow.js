webpackJsonp([2],{

/***/ 485:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(486);


/***/ }),

/***/ 486:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rc_banner_anim__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rc_queue_anim__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rc_tween_one__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_dom__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__assets_index_less__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__assets_index_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__assets_index_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__assets_arrow_less__ = __webpack_require__(487);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__assets_arrow_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__assets_arrow_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__assets_index_less__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__assets_index_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__assets_index_less__);




// use jsx to render html, do not modify simple.html










var Element = __WEBPACK_IMPORTED_MODULE_4_rc_banner_anim__["a" /* default */].Element,
    Arrow = __WEBPACK_IMPORTED_MODULE_4_rc_banner_anim__["a" /* default */].Arrow;

var BgElement = Element.BgElement;

var Demo = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(Demo, _React$Component);

  function Demo(props) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Demo);

    var _this = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Demo.__proto__ || Object.getPrototypeOf(Demo)).call(this, props));

    _this.onChange = function (type, int) {
      if (type === 'before') {
        _this.setState({
          intShow: int
        });
      }
    };

    _this.getNextPrevNumber = function () {
      var nextInt = _this.state.intShow + 1;
      var prevInt = _this.state.intShow - 1;
      if (nextInt >= _this.imgArray.length) {
        nextInt = 0;
      }
      if (prevInt < 0) {
        prevInt = _this.imgArray.length - 1;
      }

      return [prevInt, nextInt];
    };

    _this.prevEnter = function () {
      _this.setState({
        prevEnter: true
      });
    };

    _this.prevLeave = function () {
      _this.setState({
        prevEnter: false
      });
    };

    _this.nextEnter = function () {
      _this.setState({
        nextEnter: true
      });
    };

    _this.nextLeave = function () {
      _this.setState({
        nextEnter: false
      });
    };

    _this.imgArray = ['https://os.alipayobjects.com/rmsportal/IhCNTqPpLeTNnwr.jpg', 'https://os.alipayobjects.com/rmsportal/uaQVvDrCwryVlbb.jpg'];
    _this.state = {
      intShow: 0,
      prevEnter: false,
      nextEnter: false
    };
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Demo, [{
    key: 'render',
    value: function render() {
      var intArray = this.getNextPrevNumber();
      return __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_4_rc_banner_anim__["a" /* default */],
        { onChange: this.onChange },
        __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
          Element,
          { key: 'aaa',
            prefixCls: 'banner-user-elem'
          },
          __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(BgElement, {
            key: 'bg',
            className: 'bg',
            style: {
              backgroundImage: 'url(' + this.imgArray[0] + ')',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }
          }),
          __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_5_rc_queue_anim__["a" /* default */],
            { key: '1', name: 'QueueAnim' },
            __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
              'h1',
              { key: 'h1' },
              'Ant Motion Demo'
            ),
            __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
              'p',
              { key: 'p' },
              'Ant Motion Demo.Ant Motion Demo.Ant Motion Demo.Ant Motion Demo'
            )
          ),
          __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_6_rc_tween_one__["c" /* default */],
            {
              animation: { y: 50, opacity: 0, type: 'from', delay: 200 },
              key: '2',
              name: 'TweenOne'
            },
            'Ant Motion Demo.Ant Motion Demo'
          )
        ),
        __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
          Element,
          { key: 'bbb',
            prefixCls: 'banner-user-elem'
          },
          __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(BgElement, {
            key: 'bg',
            className: 'bg',
            style: {
              backgroundImage: 'url(' + this.imgArray[1] + ')',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }
          }),
          __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_5_rc_queue_anim__["a" /* default */],
            { key: '1', name: 'QueueAnim' },
            __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
              'h1',
              { key: 'h1' },
              'Ant Motion Demo'
            ),
            __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
              'p',
              { key: 'p' },
              'Ant Motion Demo.Ant Motion Demo.Ant Motion Demo.Ant Motion Demo'
            )
          ),
          __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_6_rc_tween_one__["c" /* default */],
            {
              animation: { y: 50, opacity: 0, type: 'from', delay: 200 },
              key: '2',
              name: 'TweenOne'
            },
            'Ant Motion Demo.Ant Motion Demo'
          )
        ),
        __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
          Arrow,
          { arrowType: 'prev', key: 'prev', prefixCls: 'user-arrow', component: __WEBPACK_IMPORTED_MODULE_6_rc_tween_one__["c" /* default */],
            onMouseEnter: this.prevEnter,
            onMouseLeave: this.prevLeave,
            animation: { left: this.state.prevEnter ? 0 : -120 }
          },
          __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement('div', { className: 'arrow' }),
          __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_6_rc_tween_one__["b" /* TweenOneGroup */],
            { enter: { opacity: 0, type: 'from' }, leave: { opacity: 0 },
              appear: false, className: 'img-wrapper', component: 'ul'
            },
            __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement('li', {
              style: { backgroundImage: 'url(' + this.imgArray[intArray[0]] + ')' },
              key: intArray[0]
            })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
          Arrow,
          { arrowType: 'next', key: 'next', prefixCls: 'user-arrow', component: __WEBPACK_IMPORTED_MODULE_6_rc_tween_one__["c" /* default */],
            onMouseEnter: this.nextEnter,
            onMouseLeave: this.nextLeave,
            animation: { right: this.state.nextEnter ? 0 : -120 }
          },
          __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement('div', { className: 'arrow' }),
          __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_6_rc_tween_one__["b" /* TweenOneGroup */],
            { enter: { opacity: 0, type: 'from', delay: 200 }, leave: { opacity: 0 },
              className: 'img-wrapper', component: 'ul'
            },
            __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement('li', {
              style: { backgroundImage: 'url(' + this.imgArray[intArray[1]] + ')' },
              key: intArray[1]
            })
          )
        )
      );
    }
  }]);

  return Demo;
}(__WEBPACK_IMPORTED_MODULE_7_react___default.a.Component);

__WEBPACK_IMPORTED_MODULE_8_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(Demo, null), document.getElementById('__react-content'));

/***/ }),

/***/ 487:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[485]);
//# sourceMappingURL=customArrow.js.map