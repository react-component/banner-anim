webpackJsonp([9],{

/***/ 473:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(474);


/***/ }),

/***/ 474:
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
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// use jsx to render html, do not modify simple.html









var animType = __WEBPACK_IMPORTED_MODULE_0_rc_banner_anim__["a" /* default */].animType,
    setAnimCompToTagComp = __WEBPACK_IMPORTED_MODULE_0_rc_banner_anim__["a" /* default */].setAnimCompToTagComp;


animType.custom = function (elem, type, direction, animData) {
  console.log('custom animType, type:' + type); // eslint-disable-line no-console
  var _y = void 0;
  var props = _extends({}, elem.props);
  var children = props.children;
  if (type === 'enter') {
    _y = direction === 'next' ? '100%' : '-100%';
  } else {
    _y = direction === 'next' ? '-10%' : '10%';
    children = __WEBPACK_IMPORTED_MODULE_3_react___default.a.Children.toArray(children).map(setAnimCompToTagComp);
  }
  return __WEBPACK_IMPORTED_MODULE_3_react___default.a.cloneElement(elem, _extends({}, props, {
    animation: _extends({}, animData, {
      y: _y,
      type: type === 'enter' ? 'from' : 'to'
    })
  }), children);
};

var Element = __WEBPACK_IMPORTED_MODULE_0_rc_banner_anim__["a" /* default */].Element;

var BgElement = Element.BgElement;
function Demo() {
  return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_0_rc_banner_anim__["a" /* default */],
    { type: 'custom' },
    __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
      Element,
      { key: 'aaa',
        prefixCls: 'banner-user-elem'
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
        { name: 'QueueAnim' },
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
        { animation: { y: 50, opacity: 0, type: 'from', delay: 200 }, name: 'TweenOne' },
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
          backgroundImage: 'url(https://os.alipayobjects.com/rmsportal/uaQVvDrCwryVlbb.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }
      }),
      __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_1_rc_queue_anim__["a" /* default */],
        { name: 'QueueAnim' },
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
        { animation: { y: 50, opacity: 0, type: 'from', delay: 200 }, name: 'TweenOne' },
        'Ant Motion Demo.Ant Motion Demo'
      )
    )
  );
}

__WEBPACK_IMPORTED_MODULE_4_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(Demo, null), document.getElementById('__react-content'));

/***/ })

},[473]);
//# sourceMappingURL=customAnimType.js.map