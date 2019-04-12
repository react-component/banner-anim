webpackJsonp([2],{

/***/ 475:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(476);


/***/ }),

/***/ 476:
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__assets_arrow_less__ = __webpack_require__(477);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__assets_arrow_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__assets_arrow_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__assets_index_less__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__assets_index_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__assets_index_less__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// use jsx to render html, do not modify simple.html










var Element = __WEBPACK_IMPORTED_MODULE_0_rc_banner_anim__["a" /* default */].Element,
    Arrow = __WEBPACK_IMPORTED_MODULE_0_rc_banner_anim__["a" /* default */].Arrow;

var BgElement = Element.BgElement;

var Demo = function (_React$Component) {
  _inherits(Demo, _React$Component);

  function Demo(props) {
    _classCallCheck(this, Demo);

    var _this = _possibleConstructorReturn(this, (Demo.__proto__ || Object.getPrototypeOf(Demo)).call(this, props));

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

  _createClass(Demo, [{
    key: 'render',
    value: function render() {
      var intArray = this.getNextPrevNumber();
      return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_0_rc_banner_anim__["a" /* default */],
        { onChange: this.onChange },
        __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
          Element,
          { key: 'aaa',
            prefixCls: 'banner-user-elem'
          },
          __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(BgElement, {
            key: 'bg',
            className: 'bg',
            style: {
              backgroundImage: 'url(' + this.imgArray[0] + ')',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }
          }),
          __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_1_rc_queue_anim__["a" /* default */],
            { key: '1', name: 'QueueAnim' },
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
            {
              animation: { y: 50, opacity: 0, type: 'from', delay: 200 },
              key: '2',
              name: 'TweenOne'
            },
            'Ant Motion Demo.Ant Motion Demo'
          )
        ),
        __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
          Element,
          { key: 'bbb',
            prefixCls: 'banner-user-elem'
          },
          __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(BgElement, {
            key: 'bg',
            className: 'bg',
            style: {
              backgroundImage: 'url(' + this.imgArray[1] + ')',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }
          }),
          __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_1_rc_queue_anim__["a" /* default */],
            { key: '1', name: 'QueueAnim' },
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
            {
              animation: { y: 50, opacity: 0, type: 'from', delay: 200 },
              key: '2',
              name: 'TweenOne'
            },
            'Ant Motion Demo.Ant Motion Demo'
          )
        ),
        __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
          Arrow,
          { arrowType: 'prev', key: 'prev', prefixCls: 'user-arrow', component: __WEBPACK_IMPORTED_MODULE_2_rc_tween_one__["c" /* default */],
            onMouseEnter: this.prevEnter,
            onMouseLeave: this.prevLeave,
            animation: { left: this.state.prevEnter ? 0 : -120 }
          },
          __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement('div', { className: 'arrow' }),
          __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_rc_tween_one__["b" /* TweenOneGroup */],
            { enter: { opacity: 0, type: 'from' }, leave: { opacity: 0 },
              appear: false, className: 'img-wrapper', component: 'ul'
            },
            __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement('li', {
              style: { backgroundImage: 'url(' + this.imgArray[intArray[0]] + ')' },
              key: intArray[0]
            })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
          Arrow,
          { arrowType: 'next', key: 'next', prefixCls: 'user-arrow', component: __WEBPACK_IMPORTED_MODULE_2_rc_tween_one__["c" /* default */],
            onMouseEnter: this.nextEnter,
            onMouseLeave: this.nextLeave,
            animation: { right: this.state.nextEnter ? 0 : -120 }
          },
          __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement('div', { className: 'arrow' }),
          __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_rc_tween_one__["b" /* TweenOneGroup */],
            { enter: { opacity: 0, type: 'from', delay: 200 }, leave: { opacity: 0 },
              className: 'img-wrapper', component: 'ul'
            },
            __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement('li', {
              style: { backgroundImage: 'url(' + this.imgArray[intArray[1]] + ')' },
              key: intArray[1]
            })
          )
        )
      );
    }
  }]);

  return Demo;
}(__WEBPACK_IMPORTED_MODULE_3_react___default.a.Component);

__WEBPACK_IMPORTED_MODULE_4_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(Demo, null), document.getElementById('__react-content'));

/***/ }),

/***/ 477:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[475]);
//# sourceMappingURL=customArrow.js.map