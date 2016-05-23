import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import TweenOne from 'rc-tween-one';
import ticker from 'rc-tween-one/lib/ticker';
import assign from 'object-assign';
import ease from 'tween-functions';
import {
  getUnit,
  getGsapType,
  isConvert,
  getValues,
  mergeStyle,
  checkStyleName,
} from 'style-utils';
import animType from './anim';
import {
  currentScrollTop,
  dataToArray,
  toArrayChildren,
} from './utils';

function noop() {
}

class Element extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      bgParallaxAnim: null,
      videoRect: {
        width: 'auto',
        height: 'auto',
        display: 'block',
      },
      mouseXY: null,
      domWH: null,
      onMouseMove: null,
      show: this.props.show,
    };
    this.tickerId = -1;
    this.isScroll = false;
    this.delayTimeout = null;
    this.tweenBool = false;
    this.show = this.state.show;
    [
      'onScroll',
      'onResize',
      'onMouseMove',
      'onMouseEnter',
      'getImgOrVideo',
      'videoLoadedData',
      'addScrollEvent',
      'getFollowStyle',
      'followAnalysisType',
      'getFollowMouseMove',
      'getChildren',
      'animEnd',
      'animChildren',
    ].forEach((method) => this[method] = this[method].bind(this));
  }

  componentDidMount() {
    this.dom = ReactDOM.findDOMNode(this);
    this.componentDidUpdate();
    if (this.props.bgType.indexOf('video') >= 0) {
      // 如果是 video，删除 grid 系列，位置发生变化，重加载了 video;
      delete animType.grid;
      delete animType.gridBar;
      this.video = this.dom.children[0].children[0];
    }
  }

  componentWillReceiveProps(nextProps) {
    const show = nextProps.show;
    this.setState({ show });
  }

  componentDidUpdate() {
    if (this.props.bgParallax && !this.isScroll) {
      this.addScrollEvent(this.props);
    }
  }

  componentWillUnmount() {
    this.isScroll = false;
    this.cancelRequestAnimationFrame();
    if (window.addEventListener) {
      window.removeEventListener('resize', this.onResize);
      window.removeEventListener('scroll', this.onScroll);
    } else {
      window.detachEvent('onresize', this.onResize);
      window.detachEvent('onscroll', this.onScroll);
    }
  }

  onMouseEnter(e) {
    const domRect = this.dom.getBoundingClientRect();
    const scrollTop = currentScrollTop();
    const offsetTop = domRect.top + scrollTop;
    this.enterMouse = {
      x: e.pageX - domRect.left,
      y: e.pageY - offsetTop,
    };
  }

  onMouseMove(e) {
    const domRect = this.dom.getBoundingClientRect();
    const scrollTop = currentScrollTop();
    const offsetTop = domRect.top + scrollTop;
    const mouseXY = {
      x: e.pageX - domRect.left,
      y: e.pageY - offsetTop,
    };
    const domWH = {
      w: domRect.width,
      h: domRect.height,
    };

    if (this.props.followParallax && this.props.followParallax.ease) {
      ticker.clear(this.tickerId);
      this.tickerId = `bannerElementTicker${Date.now() + Math.random()}`;
      const startFrame = ticker.frame;
      ticker.wake(this.tickerId, ()=> {
        const moment = (ticker.frame - startFrame) * ticker.perFrame;
        const start = typeof this.props.followParallax.minMove === 'number' ?
          this.props.followParallax.minMove : 0.08;
        const ratio = ease[this.props.followParallax.ease === true ? 'easeInOutQuad'
          : this.props.followParallax.ease](moment, start, 1, 1000);
        this.enterMouse.x = this.enterMouse.x + (mouseXY.x - this.enterMouse.x) * ratio;
        this.enterMouse.y = this.enterMouse.y + (mouseXY.y - this.enterMouse.y) * ratio;
        this.setState({
          mouseXY: this.enterMouse,
          domWH,
        });
        if (moment >= 1000) {
          ticker.clear(this.tickerId);
        }
      });
    } else {
      this.setState({
        mouseXY,
        domWH,
      });
    }
  }

  onResize() {
    const domRect = this.dom.getBoundingClientRect();
    const videoDomRect = this.video.getBoundingClientRect();
    let scale;
    const videoRect = {
      display: 'block',
      position: 'relative',
      top: 0,
      left: 0,
    };
    if (domRect.width / domRect.height > videoDomRect.width / videoDomRect.height) {
      scale = domRect.width / videoDomRect.width;
      videoRect.width = domRect.width;
      videoRect.height = videoDomRect.height * scale;
      videoRect.top = -(videoRect.height - domRect.height) / 2;
    } else {
      scale = domRect.height / videoDomRect.height;
      videoRect.height = domRect.height;
      videoRect.width = videoDomRect.width * scale;
      videoRect.left = -(videoDomRect.width - domRect.width) / 2;
    }
    this.setState({
      videoRect,
    });
  }

  onScroll() {
    // const clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    const scrollTop = currentScrollTop();
    const domHeight = this.props.elemOffset.height;
    const offsetTop = this.props.elemOffset.top;
    // const elementShowHeight = scrollTop - offsetTop + clientHeight;
    // scale 在出屏出时是 1, scrollTop 为 0 时是 0;
    let scale = scrollTop / (domHeight + offsetTop);// elementShowHeight / (clientHeight + domHeight);
    scale = scale >= 1 ? 1 : scale;
    // scale = scale <=0 ? 0 : scale;
    const _css = {};
    Object.keys(this.props.bgParallax).forEach((_key)=> {
      const key = getGsapType(_key);
      const item = this.props.bgParallax[_key];
      const cssName = isConvert(key);
      if (!Array.isArray(item)) {
        _css[cssName] = item;
        return;
      }
      const cssData = item[0] - scale * (item[0] - item[1]);
      const unit = getUnit(key, cssData);
      if (cssName === 'transform') {
        _css[cssName] = mergeStyle(_css[cssName] || '', getValues(key, cssData, unit));
      } else if (cssName === 'filter') {
        _css[checkStyleName(cssName)] = mergeStyle(_css[cssName] || '', getValues(key, cssData, unit));
      } else {
        _css[cssName] = cssData;
      }
    });
    this.setState({
      bgParallaxAnim: _css,
    });
  }

  getFollowStyle(type, data) {
    let mouseData = this.state.mouseXY.x;
    let domData = this.state.domWH.w;
    const value = data.scale;
    if ((type.indexOf('y') >= 0 || type.indexOf('Y') >= 0) && type !== 'opacity') {
      mouseData = this.state.mouseXY.y;
      domData = this.state.domWH.h;
    }
    let d = -(mouseData - domData / 2) * value;
    if (type === 'opacity') {
      // 如果是透明度，，变换为value的区间，，最左边为 1 - value; 最右边为 1;
      d = (mouseData / domData) * value + 1 - value;
    }
    const unit = isConvert(type) !== type ? getUnit(type, d) : '';
    const css = isConvert(type) !== type ? getValues(type, d, unit) : d;
    return type.indexOf('backgroundPosition') >= 0 ?
      `calc(${ data.bgPosition || '50%'} + ${css}px )` : css;
  }

  getImgOrVideo() {
    const followObj = {};
    if (this.props.followParallax) {
      followObj.transition = this.props.followParallax.transition;
    }
    if (this.props.followParallax && this.state.domWH && this.state.mouseXY) {
      this.props.followParallax.data.forEach(item => {
        if (!item.key) {
          return;
        }
        if (item.key === 'bgElem' || item.key === 'bannerBgElem') {
          dataToArray(item.type).map(this.followAnalysisType.bind(this, item))
            .forEach(_item =>
              followObj[_item.cssName] = mergeStyle(followObj[_item.cssName], _item.data)
            );
        }
      });
    }
    const className = `banner-anim-elem-background ${this.props.bgPrefixCls || ''}`.trim();
    const dom = this.props.bgType.indexOf('video') >= 0 ?
      (<div className={className}
        style={{ ...this.state.bgParallaxAnim, ...followObj }}
        key="bgElem"
      >
        <video loop autoPlay
          style={this.state.videoRect}
          onLoadedData={this.videoLoadedData}
        >
          <source src={this.props.bg || this.props.img} type={this.props.bgType} />
        </video>
      </div>) :
      (<div
        className={className}
        style={{
          backgroundImage: `url(${this.props.bg || this.props.img})`,
          ...this.state.bgParallaxAnim,
          ...followObj,
        }}
        key="bgElem"
      ></div>);
    return dom;
  }

  getFollowMouseMove() {
    let onMouseMove;
    if (this.props.followParallax) {
      if (this.props.followParallax.delay) {
        onMouseMove = !this.delayTimeout ? null : this.state.onMouseMove;
        this.delayTimeout = this.delayTimeout ||
          ticker.timeout(() => {
            this.setState({
              onMouseMove: this.onMouseMove,
            });
          }, this.props.followParallax.delay);
      } else {
        onMouseMove = this.onMouseMove;
      }
    }
    return onMouseMove;
  }

  getChildren() {
    if (!(this.props.followParallax && this.state.domWH && this.state.mouseXY)) {
      return this.props.children;
    }
    const keys = this.props.followParallax.data.map(item => item.key);
    const child = toArrayChildren(this.props.children).map(item => {
      const num = keys.indexOf(item.key);
      if (num >= 0) {
        const props = assign({}, item.props);
        const style = assign({}, props.style);
        const data = this.props.followParallax.data[num];
        if (this.props.followParallax.transition) {
          style.transition = this.props.followParallax.transition;
        }
        dataToArray(data.type).map(this.followAnalysisType.bind(this, data))
          .forEach(_item =>
            style[_item.cssName] = mergeStyle(style[_item.cssName], _item.data)
          );
        props.style = style;
        return React.cloneElement(item, props);
      }
      return item;
    });
    return child;
  }

  animEnd() {
    const type = this.state.show ? 'enter' : 'leave';
    this.props.callBack(type);
    this.setState({ show: this.props.show });
  }

  videoLoadedData() {
    if (this.state.show) {
      this.onResize();
      if (window.addEventListener) {
        window.addEventListener('resize', this.onResize);
      } else {
        window.attachEvent('onresize', this.onResize);
      }
    } else {
      if (window.addEventListener) {
        window.removeEventListener('resize', this.onResize);
      } else {
        window.detachEvent('onresize', this.onResize);
      }
    }
  }

  addScrollEvent() {
    this.onScroll();
    this.isScroll = true;
    if (window.addEventListener) {
      window.addEventListener('scroll', this.onScroll);
    } else {
      window.attachEvent('onscroll', this.onScroll);
    }
  }

  followAnalysisType(data, _type) {
    const type = getGsapType(_type);
    const cssName = isConvert(type);
    // 把 bgParallax 的合进来；
    const bgParallaxStyle = this.state.bgParallaxAnim || {};
    return {
      cssName: cssName,
      data: mergeStyle(bgParallaxStyle[cssName] || '',
        this.getFollowStyle(type, data)),
    };
  }

  cancelRequestAnimationFrame() {
    ticker.clear(this.timeoutID);
    ticker.clear(this.delayTimeout);
    this.delayTimeout = -1;
    this.timeoutID = -1;
  }

  animChildren(props, style, bgElem) {
    if (this.tickerId) {
      ticker.clear(this.tickerId);
    }
    if (this.delayTimeout) {
      ticker.clear(this.delayTimeout);
      this.delayTimeout = null;
    }
    style.display = 'block';
    props.component = this.props.component;
    this.show = this.state.show;
    style.zIndex = this.state.show ? 1 : 0;
    props.children = this.props.show ? bgElem : [bgElem, this.getChildren()];

    const childrenToRender = React.createElement(TweenOne, props);
    const type = this.state.show ? 'enter' : 'leave';
    return this.props.animType(childrenToRender,
      type,
      this.props.direction,
      {
        ease: this.props.ease,
        duration: this.props.duration,
        onComplete: this.animEnd,
      },
      this.props.elemOffset
    );
  }

  render() {
    const props = assign({}, this.props);
    const style = assign({}, props.style);
    style.display = props.show ? 'block' : 'none';
    style.position = 'absolute';
    style.width = '100%';
    props.style = style;
    props.className = `banner-anim-elem ${this.props.prefixCls || ''}`.trim();
    delete props.direction;
    delete props.show;
    const bgElem = this.props.bg || this.props.img ?
      this.getImgOrVideo() : null;
    if (this.show === this.state.show) {
      style.transform = null;
      if (!this.state.show) {
        return React.createElement(TweenOne, props, bgElem);
      }
      props.onMouseEnter = this.onMouseEnter;
      props.onMouseMove = this.getFollowMouseMove();
      return React.createElement(TweenOne, props, [bgElem, this.getChildren()]);
    }
    return this.animChildren(props, style, bgElem);
  }
}

Element.propTypes = {
  children: PropTypes.any,
  style: PropTypes.object,
  prefixCls: PropTypes.string,
  bgPrefixCls: PropTypes.string,
  component: PropTypes.any,
  elemOffset: PropTypes.object,
  type: PropTypes.string,
  animType: PropTypes.func,
  img: PropTypes.string,
  bg: PropTypes.string,
  bgType: PropTypes.string,
  ease: PropTypes.string,
  duration: PropTypes.number,
  direction: PropTypes.string,
  callBack: PropTypes.func,
  bgParallax: PropTypes.object,
  followParallax: PropTypes.object,
  show: PropTypes.string,
};
Element.defaultProps = {
  component: 'div',
  bgType: 'img',
  callBack: noop,
};

export default Element;
