webpackJsonp([7],{

/***/ 493:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(494);


/***/ }),

/***/ 494:
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__assets_index_less__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__assets_index_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__assets_index_less__);




// use jsx to render html, do not modify simple.html









var Element = __WEBPACK_IMPORTED_MODULE_4_rc_banner_anim__["a" /* default */].Element;

var BgElement = Element.BgElement;

var Demo = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(Demo, _React$Component);

  function Demo(props) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Demo);

    var _this = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Demo.__proto__ || Object.getPrototypeOf(Demo)).call(this, props));

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
      _this.banner.slickGoTo(1);
    };

    _this.state = {
      delay: 0
    };
    _this.openSlide = false;
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Demo, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
          'a',
          { onClick: this.onClick },
          '\u70B9\u51FB\u8DF3\u5230\u7B2C\u4E8C\u5757'
        ),
        __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_4_rc_banner_anim__["a" /* default */],
          { prefixCls: 'banner-user', type: 'across',
            onChange: this.onChange,
            duration: 1000,
            ease: 'easeInOutExpo',
            sync: true,
            ref: function ref(c) {
              _this2.banner = c;
            }
          },
          __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
            Element,
            { key: 'aaa',
              prefixCls: 'banner-user-elem',
              leaveChildHide: true
            },
            __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(BgElement, {
              key: 'bg',
              className: 'bg',
              style: {
                backgroundImage: 'url(https://os.alipayobjects.com/rmsportal/IhCNTqPpLeTNnwr.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }
            }),
            __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_5_rc_queue_anim__["a" /* default */],
              { key: '1', name: 'QueueAnim', delay: [this.state.delay, 0] },
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
              { key: '2',
                animation: { y: 50, opacity: 0, type: 'from', delay: this.state.delay + 200 }
              },
              'Ant Motion Demo.Ant Motion Demo'
            )
          ),
          __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
            Element,
            { key: 'bbb',
              prefixCls: 'banner-user-elem',
              leaveChildHide: true
            },
            __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(BgElement, {
              key: 'bg',
              className: 'bg',
              style: {
                backgroundImage: 'url(https://os.alipayobjects.com/rmsportal/uaQVvDrCwryVlbb.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }
            }),
            __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_5_rc_queue_anim__["a" /* default */],
              { name: 'QueueAnim', key: '1', delay: [600, 0] },
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
              { animation: { y: 50, opacity: 0, type: 'from', delay: 800 }, key: '2' },
              'Ant Motion Demo.Ant Motion Demo'
            )
          )
        )
      );
    }
  }]);

  return Demo;
}(__WEBPACK_IMPORTED_MODULE_7_react___default.a.Component);

__WEBPACK_IMPORTED_MODULE_8_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(Demo, null), document.getElementById('__react-content'));

/***/ })

},[493]);
//# sourceMappingURL=leaveChildHide.js.map