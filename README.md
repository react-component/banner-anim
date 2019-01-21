# rc-banner-anim
---

React BannerAnim Component


[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/rc-banner-anim.svg?style=flat-square
[npm-url]: http://npmjs.org/package/rc-banner-anim
[travis-image]: https://img.shields.io/travis/react-component/banner-anim.svg?style=flat-square
[travis-url]: https://travis-ci.org/react-component/banner-anim
[coveralls-image]: https://img.shields.io/coveralls/react-component/banner-anim.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/react-component/banner-anim?branch=master
[gemnasium-image]: http://img.shields.io/gemnasium/react-component/banner-anim.svg?style=flat-square
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/rc-banner-anim.svg?style=flat-square
[download-url]: https://npmjs.org/package/rc-banner-anim


## Browser Support

|![IE](https://github.com/alrra/browser-logos/blob/master/src/edge/edge_48x48.png?raw=true) | ![Chrome](https://github.com/alrra/browser-logos/blob/master/src/chrome/chrome_48x48.png?raw=true) | ![Firefox](https://github.com/alrra/browser-logos/blob/master/src/firefox/firefox_48x48.png?raw=true) | ![Opera](https://github.com/alrra/browser-logos/blob/master/src/opera/opera_48x48.png?raw=true) | ![Safari](https://github.com/alrra/browser-logos/blob/master/src/safari/safari_48x48.png?raw=true)|
| --- | --- | --- | --- | --- |
| IE 10+ ✔ | Chrome 31.0+ ✔ | Firefox 31.0+ ✔ | Opera 30.0+ ✔ | Safari 7.0+ ✔ |


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
const BgElement = Element.BgElement;
React.render(<BannerAnim>
  <Element key="a">
    <BGElement key="bg" style={{ background: 'url(img)' }}/>
    <TweenOne key='0'>test text</TweenOne>
  </Element>
  <Element key="b">
    <BGElement key="bg" style={{ background: 'url(img)' }}/>
    <TweenOne key='0'>test text</TweenOne>
  </Element>
</BannerAnim>, container);
```

## API

### BannerAnim

```
`ref` control jump: <BannerAnim ref={(c) => { this.banner = c; }}/>

prev: this.banner.prev();

next: this.banner.next();

jump: this.banner.slickGoTo(number); number from 0;
```

|   name   |      type       |   default    |        description    |
|----------|-----------------|--------------|-----------------------|
|   type   |  string / array | All animType | Provide `across`, `vertical`, `acrossOverlay`, `verticalOverlay`, (`gridBar`, `grid`) => duration is a single block of animation time, video bg no use |
| duration |      number     |      450     | Single switch time.   |
| delay    |     number      |      0       |    switch delay.      |
| ease     |      string     | `easeInOutQuad` | easing.            |
| initShow |      number     |    0         |  start show           |
| arrow    |      boolean    |      `true`    |  `Arrow` is children, this is null and void. else is default arrow |
| thumb    |      boolean    |      `true`    |  ^ |
| autoPlay |      boolean    |      `false`  | auto play |
| autoPlaySpeed |  number    |    5000       | auto play delay |
| autoPlayEffect |  boolean    |    `true`       | auto play when mouse leave |
| onChange |     func        |    -          | onChange(`before` or `after`, currentShowInt) |
| prefixCls |    string      |   -           |  user class |
| children |  react.component|   -           | `Element`(must), `Arrow`, `Thumb` |
| sync      |   boolean      |   false       | `Element` the children and `Element` the same time animation |
| dragPlay  | boolean        |   true        | drag play next or prev |
| component | string | 'div' | component tag        |

### Element

> children is `TweenOne`, animation type must `from`;

|   name   |      type       |   default    |        description    |
|----------|-----------------|--------------|-----------------------|
| leaveChildHide |   boolean |  false   | children leave switch animation. Replace the `hideProps`.|
| sync      |   boolean      |   false       | children and `Element` the same time animation |
| prefixCls |     string      |   -           |  user class |
| followParallax | object   |  null        | follow mouse anim  |
| component | string | 'div' | component tag        |
| componentProps | object     | null   | component is React.Element, component tag props, not add `style` |

#### followParallax is object
|   name   |      type       |   default    |        description    |
|----------|-----------------|--------------|-----------------------|
| delay    |     number      |  null        | open followParallax delay |
| data     | array           |  null        | content: { key: string, value: number, type: array or string, bgPosition: string }; key: children key; value: animation interval value, example: value is 20 => [left: -20, center: 0 , right: 20] ; type: style or `x` `y`, bgPosition: if type is backgroundPosition, this is bg default position, else is invalid. |
| ease | string        |  `easeOutQuad`   | animate ease. [refer](http://easings.net/en)    |
| minMove    |   number        |  null        | ease.easeInOutQuad(start, minMove, 1, end); The mouse to move once, the minimum point of moving graphics, a second to reach the position of the mouse. |

### Element.BgElement

|   name   |      type       |   default    |        description    |
|----------|-----------------|--------------|-----------------------|
| className | string         | -            | className             |
| scrollParallax | object | null | { y: 100 },  from bottom to top of browser, element leave display area y is 100 |
| videoResize | boolean | true | children is video, video follow window resize |
| component | string | 'div' | component tag        |
| componentProps | object     | null   | component is React.Element, component tag props, not add `style` |

### Arrow

|   name   |      type       |   default    |        description    |
|----------|-----------------|--------------|-----------------------|
| arrowType |    'prev' \| 'next' |  -       | arrow type  |
| prefixCls |     string      |   -           |  user class |
| component  | string / React.Element  | `div`   | component tag  |
| componentProps | object     | null   | component is React.Element, component tag props, not add `style` |

### Thumb

|   name   |      type       |   default    |        description    |
|----------|-----------------|--------------|-----------------------|
| children  |     React.Element    |      -       |  must                 |
| prefixCls |     string      |   -           |  user class |
| component  | string / React.Element  | `div`   | component tag  |
| componentProps | object     | null   | component is React.Element, component tag props, not add `style` |
