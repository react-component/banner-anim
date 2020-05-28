webpackJsonp([3],{

/***/ 481:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(482);


/***/ }),

/***/ 482:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rc_banner_anim__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rc_queue_anim__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rc_tween_one__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_dom__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__assets_index_less__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__assets_index_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__assets_index_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__assets_index_less__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__assets_index_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__assets_index_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__assets_bgParallax_less__ = __webpack_require__(483);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__assets_bgParallax_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__assets_bgParallax_less__);
// use jsx to render html, do not modify simple.html










var Element = __WEBPACK_IMPORTED_MODULE_0_rc_banner_anim__["a" /* default */].Element;

var BgElement = Element.BgElement;
function Demo() {
  return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_0_rc_banner_anim__["a" /* default */],
    { type: 'across' },
    __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
      Element,
      { key: 'aaa',
        prefixCls: 'banner-user-elem'
      },
      __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(BgElement, {
        key: 'bg',
        className: 'bg',
        style: {
          backgroundImage: 'url(https://os.alipayobjects.com/rmsportal/IhCNTqPpLeTNnwr.jpg)'
        },
        scrollParallax: { y: 100 }
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
          backgroundImage: 'url(https://os.alipayobjects.com/rmsportal/uaQVvDrCwryVlbb.jpg)'
        },
        scrollParallax: { y: 100 }
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

/***/ }),

/***/ 483:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[481]);
//# sourceMappingURL=bgParallax.js.map