webpackJsonp([9],{

/***/ 180:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(90);


/***/ }),

/***/ 90:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rc_banner_anim__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rc_queue_anim__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rc_tween_one__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_dom__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__assets_index_less__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__assets_index_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__assets_index_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__assets_index_less__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__assets_index_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__assets_index_less__);




// use jsx to render html, do not modify simple.html









var Element = __WEBPACK_IMPORTED_MODULE_4_rc_banner_anim__["a" /* default */].Element;

var BgElement = Element.BgElement;

var Demo = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(Demo, _React$Component);

  function Demo() {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Demo);

    var _this = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Demo.__proto__ || Object.getPrototypeOf(Demo)).apply(this, arguments));

    _this.state = {
      children: [__WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
        Element,
        { key: 'aaa',
          prefixCls: 'banner-user-elem'
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
          { name: 'QueueAnim' },
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
          __WEBPACK_IMPORTED_MODULE_6_rc_tween_one__["a" /* default */],
          { animation: { y: 50, opacity: 0, type: 'from', delay: 200 }, name: 'TweenOne1' },
          'Ant Motion Demo.Ant Motion Demo'
        )
      ), __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
        Element,
        { key: 'bbb',
          prefixCls: 'banner-user-elem'
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
          { name: 'QueueAnim' },
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
          __WEBPACK_IMPORTED_MODULE_6_rc_tween_one__["a" /* default */],
          { animation: { y: 50, opacity: 0, type: 'from', delay: 200 }, name: 'TweenOne2' },
          'Ant Motion Demo.Ant Motion Demo'
        )
      )]
    };
    [].forEach(function (method) {
      return _this[method] = _this[method].bind(_this);
    });
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Demo, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var children = this.state.children;

      setTimeout(function () {
        children.push(__WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
          Element,
          { key: 'ccc',
            prefixCls: 'banner-user-elem'
          },
          __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(BgElement, {
            key: 'bg',
            className: 'bg',
            style: {
              backgroundImage: 'url(https://os.alipayobjects.com/rmsportal/uaQVvDrCwryVlbb.jpg)',
              backgroundSize: 'cover'
            }
          }),
          __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_5_rc_queue_anim__["a" /* default */],
            { name: 'QueueAnim' },
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
            __WEBPACK_IMPORTED_MODULE_6_rc_tween_one__["a" /* default */],
            { animation: { y: 50, opacity: 0, type: 'from', delay: 200 }, name: 'TweenOne2' },
            'Ant Motion Demo.Ant Motion Demo'
          )
        ));
        _this2.setState({
          children: children
        });
      }, 2000);
    }
  }, {
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_4_rc_banner_anim__["a" /* default */],
        { type: 'grid' },
        this.state.children
      );
    }
  }]);

  return Demo;
}(__WEBPACK_IMPORTED_MODULE_7_react___default.a.Component);

__WEBPACK_IMPORTED_MODULE_8_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(Demo, null), document.getElementById('__react-content'));

/***/ })

},[180]);
//# sourceMappingURL=change.js.map