# rc-banner-anim
---

React BannerAnim Component


[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![gemnasium deps][gemnasium-image]][gemnasium-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/rc-banner-anim.svg?style=flat-square
[npm-url]: http://npmjs.org/package/rc-banner-anim
[travis-image]: https://img.shields.io/travis/react-component/banner-anim.svg?style=flat-square
[travis-url]: https://travis-ci.org/react-component/banner-anim
[coveralls-image]: https://img.shields.io/coveralls/react-component/banner-anim.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/react-component/banner-anim?branch=master
[gemnasium-image]: http://img.shields.io/gemnasium/react-component/banner-anim.svg?style=flat-square
[gemnasium-url]: https://gemnasium.com/react-component/banner-anim
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/rc-banner-anim.svg?style=flat-square
[download-url]: https://npmjs.org/package/rc-banner-anim


## Browser Support

|![IE](https://raw.github.com/alrra/browser-logos/master/internet-explorer/internet-explorer_48x48.png) | ![Chrome](https://raw.github.com/alrra/browser-logos/master/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/firefox/firefox_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/safari/safari_48x48.png)|
| --- | --- | --- | --- | --- |
| IE 8+ ✔ | Chrome 31.0+ ✔ | Firefox 31.0+ ✔ | Opera 30.0+ ✔ | Safari 7.0+ ✔ |


## Development

```
npm install
npm start
```

## Example

http://localhost:8012/examples/


online example: http://react-component.github.io/banner-anim/


## install


[![rc-banner-anim](https://nodei.co/npm/rc-banner-anim.png)](https://npmjs.org/package/rc-banner-anim)


## Usage

```js
var BannerAnim = require('rc-banner-anim');
var React = require('react');
const { Element } = BannerAnim;
React.render(<BannerAnim>
  <Element img="img" key="a">
    <TweenOne key='0'>test text</TweenOne>
  </Element>
  <Element img="img" key="b">
    <TweenOne key='0'>test text</TweenOne>
  </Element>
</BannerAnim>, container);
```

## API

### BannerAnim

|   name   |      type       |   default    |        description    |
|----------|-----------------|--------------|-----------------------|
|   type   |  string / array | All animType | Provide `across`, `vertical`, `acrossOverlay`, `verticalOverlay`, (`gridBar`, `grid`) => duration is a single block of animation time, video bg no use |
| duration |      number     |      450     | Single switch time.   |
| ease     |      string     | `easeInOutQuad` | easing.            |
| initShow |      number     |    0         |  start show           |
| arrow    |      boolean    |      `true`    |  `Arrow` is children, this is null and void. else is default arrow |
| thumb    |      boolean    |      `true`    |  ^ |
| autoPlay |      boolean    |      `false`  | auto play |
| autoPlaySpeed |  number    |    5000       | auto play delay |
| onChange |     func        |    -          | onChange(`before` or `after`, currentShowInt) |
| thumbFloat |   boolean     |   `true`      | `false` banner height and thumb height addition. |
| bgParallaxAll |  object    |   null        |  with `bgParallax`, All Element `bgParallax`  |
| prefixCls |    string      |   -           |  user class |
| children |  react.component|   -           | `Element`(must), `Arrow`, `Thumb` |

### Element 

|   name   |      type       |   default    |        description    |
|----------|-----------------|--------------|-----------------------|
| key      |     string      |      -       |  must                 |
| prefixCls |     string      |   -           |  user class |
| bg      |     string      |    null      |  bg image or video src           |
| bgType  |      string     |    `img`     |  img or video/xxx     |
| bgParallax |  object      |   null       |   { y: [0, 300] },  [ scrollTop is 0, page to top ] |
| bgPrefixCls | string      |   -          | bg user class |
| followParallax | object   |  null        | follow mouse anim  |

#### followParallax is object
|   name   |      type       |   default    |        description    |
|----------|-----------------|--------------|-----------------------|
| delay    |   number        |  null        | must, Delayed opening, best after the animation to open |
| data     | array           |  null        | content: { key: string, scale: number, type: array or string }; key: dom key, banner bg key is `bgElem`, scale: Animation value = banner.width / 2 ＊ scale, type: style or `x` `y` |
| transition | string        | null         | style transition  |


### Arrow or Thumb

|   name   |      type       |   default    |        description    |
|----------|-----------------|--------------|-----------------------|
| key      |     string      |      -       |  must                 |
| prefixCls |     string      |   -           |  user class |
