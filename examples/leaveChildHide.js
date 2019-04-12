webpackJsonp([7],{

/***/ 483:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(484);


/***/ }),

/***/ 484:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rc_banner_anim__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rc_queue_anim__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rc_tween_one__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_dom__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__assets_index_less__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__assets_index_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__assets_index_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__assets_index_less__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__assets_index_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__assets_index_less__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// use jsx to render html, do not modify simple.html









var Element = __WEBPACK_IMPORTED_MODULE_0_rc_banner_anim__["a" /* default */].Element;

var BgElement = Element.BgElement;

var Demo = function (_React$Component) {
  _inherits(Demo, _React$Component);

  function Demo(props) {
    _classCallCheck(this, Demo);

    var _this = _possibleConstructorReturn(this, (Demo.__proto__ || Object.getPrototypeOf(Demo)).call(this, props));

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

  _createClass(Demo, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
          'a',
          { onClick: this.onClick },
          '\u70B9\u51FB\u8DF3\u5230\u7B2C\u4E8C\u5757'
        ),
        __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_0_rc_banner_anim__["a" /* default */],
          { prefixCls: 'banner-user', type: 'across',
            onChange: this.onChange,
            duration: 1000,
            ease: 'easeInOutExpo',
            sync: true,
            ref: function ref(c) {
              _this2.banner = c;
            }
          },
          __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
            Element,
            { key: 'aaa',
              prefixCls: 'banner-user-elem',
              leaveChildHide: true
            },
            __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(BgElement, {
              key: 'bg',
              className: 'bg',
              style: {
                backgroundImage: 'url(https://os.alipayobjects.com/rmsportal/IhCNTqPpLeTNnwr.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }
            }),
            __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_1_rc_queue_anim__["a" /* default */],
              { key: '1', name: 'QueueAnim', delay: [this.state.delay, 0] },
              __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
                'h1',
                { key: 'h1' },
                'Ant Motion Demo'
              ),
              __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
                'p',
                { key: 'p' },
                'Ant Motion Demo.Ant Motion Demo.Ant Motion Demo.Ant Motion Demo'
              )
            ),
            __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_rc_tween_one__["c" /* default */],
              { key: '2',
                animation: { y: 50, opacity: 0, type: 'from', delay: this.state.delay + 200 }
              },
              'Ant Motion Demo.Ant Motion Demo'
            )
          ),
          __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
            Element,
            { key: 'bbb',
              prefixCls: 'banner-user-elem',
              leaveChildHide: true
            },
            __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(BgElement, {
              key: 'bg',
              className: 'bg',
              style: {
                backgroundImage: 'url(https://os.alipayobjects.com/rmsportal/uaQVvDrCwryVlbb.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }
            }),
            __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_1_rc_queue_anim__["a" /* default */],
              { name: 'QueueAnim', key: '1', delay: [600, 0] },
              __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
                'h1',
                { key: 'h1' },
                'Ant Motion Demo'
              ),
              __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
                'p',
                { key: 'p' },
                'Ant Motion Demo.Ant Motion Demo.Ant Motion Demo.Ant Motion Demo'
              )
            ),
            __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_rc_tween_one__["c" /* default */],
              { animation: { y: 50, opacity: 0, type: 'from', delay: 800 }, key: '2' },
              'Ant Motion Demo.Ant Motion Demo'
            )
          )
        )
      );
    }
  }]);

  return Demo;
}(__WEBPACK_IMPORTED_MODULE_3_react___default.a.Component);

__WEBPACK_IMPORTED_MODULE_4_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(Demo, null), document.getElementById('__react-content'));

/***/ })

},[483]);
//# sourceMappingURL=leaveChildHide.js.map