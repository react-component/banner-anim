import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import BgElement from './BgElement';
import TweenOne from 'rc-tween-one';
import ticker from 'rc-tween-one/lib/ticker';
import ease from 'tween-functions';
import {
  getUnit,
  getGsapType,
  isConvert,
  getValues,
  mergeStyle,
} from 'style-utils';
import {
  currentScrollTop,
  currentScrollLeft,
  dataToArray,
  toArrayChildren,
} from './utils';

function noop() {
}

class Element extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      show: this.props.show,
    };
    this.tickerId = -1;
    this.delayTimeout = null;
    this.show = this.state.show;
    [
      'getChildren',
      'animEnd',
      'animChildren',
    ].forEach((method) => this[method] = this[method].bind(this));
  }

  componentDidMount() {
    this.dom = ReactDOM.findDOMNode(this);
  }

  componentWillReceiveProps(nextProps) {
    const show = nextProps.show;
    this.setState({ show });
  }

  componentWillUnmount() {
    ticker.clear(this.timeoutID);
    ticker.clear(this.delayTimeout);
    this.delayTimeout = -1;
    this.timeoutID = -1;
  }


  onMouseEnter = () => {
    const domRect = this.dom.getBoundingClientRect();
    this.enterMouse = this.enterMouse || {
      x: domRect.width / 2,
      y: domRect.height / 2,
    };
  }

  onMouseMove = (e) => {
    const domRect = this.dom.getBoundingClientRect();
    const offsetTop = domRect.top + currentScrollTop();
    const offsetLeft = domRect.left + currentScrollLeft();
    const mouseXY = {
      x: e.pageX - offsetLeft,
      y: e.pageY - offsetTop,
    };
    const domWH = {
      w: domRect.width,
      h: domRect.height,
    };
    ticker.clear(this.tickerId);
    this.tickerId = `bannerElementTicker${Date.now() + Math.random()}`;
    const startFrame = ticker.frame;
    ticker.wake(this.tickerId, () => {
      const moment = (ticker.frame - startFrame) * ticker.perFrame;
      const start = typeof this.props.followParallax.minMove === 'number' ?
        this.props.followParallax.minMove : 0.08;
      const ratio = ease[this.props.followParallax.ease ||
      'easeInOutQuad'](moment, start, 1, 1000);
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
  };

  getFollowStyle = (type, data) => {
    let mouseData = this.state.mouseXY.x;
    let domData = this.state.domWH.w;
    const value = data.value;
    if ((type.indexOf('y') >= 0 || type.indexOf('Y') >= 0) && type !== 'opacity') {
      mouseData = this.state.mouseXY.y;
      domData = this.state.domWH.h;
    }
    const d = (mouseData - domData / 2) / (domData / 2) * value;
    const unit = isConvert(type) !== type ? getUnit(type, d) : '';
    const css = isConvert(type) !== type ? getValues(type, d, unit) : d;
    return type.indexOf('backgroundPosition') >= 0 ?
      `calc(${ data.bgPosition || '50%'} + ${css}px )` : css;
  }

  getFollowMouseMove = () => {
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
      return toArrayChildren(this.props.children).map(item => {
        if (item.type === BgElement) {
          return React.cloneElement(item, { show: this.state.show });
        }
        return item;
      });
    }
    const keys = this.props.followParallax.data.map(item => item.key);
    const child = toArrayChildren(this.props.children).map(item => {
      const num = keys.indexOf(item.key);
      if (num >= 0) {
        const props = { ...item.props };
        const style = { ...props.style };
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

  followAnalysisType = (data, _type) => {
    const type = getGsapType(_type);
    const cssName = isConvert(type);
    // 把 bgParallax 的合进来；
    const bgParallaxStyle = this.state.bgParallaxAnim || {};
    return {
      cssName,
      data: mergeStyle(bgParallaxStyle[cssName] || '',
        this.getFollowStyle(type, data)),
    };
  }

  animEnd() {
    const type = this.state.show ? 'enter' : 'leave';
    this.props.callBack(type);
    this.setState({ show: this.props.show });
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
    props.children = this.props.show ? bgElem : this.getChildren();
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
    const props = { ...this.props };
    const style = { ...props.style };
    style.display = props.show ? 'block' : 'none';
    style.position = 'absolute';
    style.width = '100%';
    props.style = style;
    props.className = `banner-anim-elem ${this.props.prefixCls || ''}`.trim();
    delete props.direction;
    delete props.show;
    const bgElem = toArrayChildren(this.props.children).filter(item => item.type === BgElement)
      .map(item => {
        return React.cloneElement(item, { show: this.state.show });
      });
    [
      `prefixCls`, `callBack`,
      `animType`, `duration`, `ease`,
      `elemOffset`, 'followParallax',
      'show', 'type',
    ].forEach(key => delete props[key]);
    if (this.show === this.state.show) {
      style.transform = null;
      if (!this.state.show) {
        return React.createElement(TweenOne, props, bgElem);
      }
      props.onMouseEnter = this.onMouseEnter;
      props.onMouseMove = this.getFollowMouseMove();
      return React.createElement(TweenOne, props, this.getChildren());
    }
    return this.animChildren(props, style, bgElem);
  }
}

Element.propTypes = {
  children: PropTypes.any,
  style: PropTypes.object,
  prefixCls: PropTypes.string,
  component: PropTypes.any,
  elemOffset: PropTypes.object,
  type: PropTypes.string,
  animType: PropTypes.func,
  ease: PropTypes.string,
  duration: PropTypes.number,
  direction: PropTypes.string,
  callBack: PropTypes.func,
  followParallax: PropTypes.object,
  show: PropTypes.bool,
};
Element.defaultProps = {
  component: 'div',
  callBack: noop,
};

Element.BgElement = BgElement;

export default Element;
