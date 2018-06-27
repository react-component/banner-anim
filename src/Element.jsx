import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import TweenOne from 'rc-tween-one';
import ticker from 'rc-tween-one/lib/ticker';
import easeTween from 'tween-functions';
import {
  getGsapType,
  isConvert,
  stylesToCss,
  checkStyleName,
} from 'style-utils';

import BgElement from './BgElement';
import {
  currentScrollTop,
  currentScrollLeft,
  dataToArray,
  toArrayChildren,
} from './utils';

function noop() {
}

class Element extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: this.props.show,
    };
    this.tickerId = -1;
    this.enterMouse = null;
    this.delayTimeout = null;
    this.show = this.state.show;
    this.followParallax = this.props.followParallax;
    this.transform = checkStyleName('transform');
  }

  componentDidMount() {
    this.dom = ReactDOM.findDOMNode(this);
  }

  componentWillReceiveProps(nextProps) {
    const show = nextProps.show;
    if (this.tickerId !== -1) {
      ticker.clear(this.tickerId);
      this.tickerId = -1;
    }
    const followParallax = nextProps.followParallax;
    if (this.followParallax && !followParallax) {
      this.reFollowParallax();
    } else {
      this.followParallax = followParallax;
    }
    this.setState({ show, mouseMoveType: nextProps.mouseMoveType });
  }

  componentDidUpdate() {
    if (this.followParallax) {
      this.doms = this.followParallax.data.map(item => {
        return document.getElementById(item.id);
      });
    }
  }

  componentWillUnmount() {
    ticker.clear(this.timeoutID);
    ticker.clear(this.delayTimeout);
    this.delayTimeout = -1;
    this.timeoutID = -1;
  }

  onMouseMove = (e) => {
    this.domRect = this.dom.getBoundingClientRect();
    this.enterMouse = this.enterMouse ||
      { x: this.domRect.width / 2, y: this.domRect.height / 2 };
    this.domWH = {
      w: this.domRect.width,
      h: this.domRect.height,
    };
    this.offsetTop = this.domRect.top + currentScrollTop();
    this.offsetLeft = this.domRect.left + currentScrollLeft();
    const mouseXY = {
      x: e.pageX - this.offsetLeft,
      y: e.pageY - this.offsetTop,
    };
    this.setTicker(this.followParallax, mouseXY);
  };

  setTicker = (followParallax, mouseXY, callback = noop) => {
    ticker.clear(this.tickerId);
    this.tickerId = `bannerElementTicker${Date.now() + Math.random()}`;
    const startFrame = ticker.frame;
    const startX = this.enterMouse.x;
    const startY = this.enterMouse.y;
    const duration = followParallax.duration || 450;
    const easeFunc = easeTween[followParallax.ease ||
      'easeOutQuad'];
    const start = typeof followParallax.minMove === 'number' ?
      followParallax.minMove : 0.08;
    ticker.wake(this.tickerId, () => {
      const moment = (ticker.frame - startFrame) * ticker.perFrame;
      const ratio = easeFunc(moment, start, 1, duration);
      this.enterMouse.x = startX + (mouseXY.x - startX) * ratio;
      this.enterMouse.y = startY + (mouseXY.y - startY) * ratio;
      this.setFollowStyle(this.domWH);
      if (moment >= duration) {
        ticker.clear(this.tickerId);
        callback();
      }
    });
  }

  getFollowMouseMove = () => {
    let onMouseMove;
    if (this.followParallax) {
      if (this.followParallax.delay) {
        onMouseMove = !this.delayTimeout ? null : this.state.onMouseMove;
        this.delayTimeout = this.delayTimeout ||
          ticker.timeout(() => {
            this.setState({
              onMouseMove: this.onMouseMove,
            });
          }, this.followParallax.delay);
      } else {
        onMouseMove = this.onMouseMove;
      }
    }
    return onMouseMove;
  }

  getFollowStyle = (data, domWH) => {
    const style = {};
    dataToArray(data.type).forEach(type => {
      let mouseData = this.enterMouse.x;
      let domData = domWH.w;
      const value = data.value;
      if ((type.indexOf('y') >= 0 || type.indexOf('Y') >= 0) && type !== 'opacity') {
        mouseData = this.enterMouse.y;
        domData = domWH.h;
      }
      const d = (mouseData - domData / 2) / (domData / 2) * value;
      const _type = getGsapType(type);
      const cssName = isConvert(_type);
      if (cssName === 'transform') {
        const transform = checkStyleName('transform');
        style[transform] = style[transform] || {};
        style[transform][_type] = stylesToCss(_type, d).trim();
      } else if (cssName === 'filter') {
        const filter = checkStyleName('filter');
        style[filter] = style[filter] || {};
        style[filter][_type] = stylesToCss(_type, d).trim();
      } else {
        style[cssName] = stylesToCss(_type, d).trim();
      }
    });
    return style;
  }

  setFollowStyle = (domWH) => {
    this.doms.forEach((item, i) => {
      if (!item) {
        return;
      }
      const data = this.followParallax.data[i];
      const style = this.getFollowStyle(data, domWH);
      Object.keys(style).forEach(key => {
        if (typeof style[key] === 'object') {
          let styleStr = '';
          Object.keys(style[key]).forEach(_key => {
            styleStr += ` ${_key}(${style[key][_key]})`.trim();
          });
          item.style[key] = styleStr;
          return;
        }
        item.style[key] = key.indexOf('backgroundPosition') >= 0 ?
          `calc(${data.bgPosition || '0%'} + ${style[key]} )` : style[key];
      });
    });
  };

  getChildren = () => {
    return toArrayChildren(this.props.children).map(item => {
      if (item.type === BgElement) {
        return React.cloneElement(item, { show: this.state.show });
      }
      return item;
    });
  }

  reFollowParallax = () => {
    this.setTicker(this.followParallax, {
      x: this.domRect.width / 2 - this.offsetLeft,
      y: this.domRect.height / 2 - this.offsetTop,
    }, () => {
      this.followParallax = null;
    });
  }

  animEnd = () => {
    const type = this.state.show ? 'enter' : 'leave';
    this.props.callBack(type);
    this.setState({ show: this.props.show, mouseMoveType: null });
  }

  animChildren = (props, style, bgElem) => {
    const { elemOffset, leaveChildHide, ratio, animType, direction, mouseMoveType,
      ease, duration, delay, show, sync, component } = this.props;
    if (this.tickerId) {
      ticker.clear(this.tickerId);
    }
    if (this.delayTimeout) {
      ticker.clear(this.delayTimeout);
      this.delayTimeout = null;
    }
    style.display = 'block';

    props.component = component;
    this.show = this.state.show;
    style.zIndex = this.state.show ? 1 : 0;
    props.children = show && !sync ? bgElem : this.getChildren();
    const childrenToRender = React.createElement(TweenOne, props);
    const type = this.state.show ? 'enter' : 'leave';
    const $ratio = mouseMoveType === 'end' && ratio <= 0.3 ? 1 - ratio : ratio;
    const tag = animType(childrenToRender,
      type,
      direction,
      {
        ease,
        duration,
        delay,
        onComplete: this.animEnd,
      },
      elemOffset,
      leaveChildHide,
      $ratio,
      this.state.mouseMoveType === 'update',
    );
    const { ...tagProps } = tag.props;
    if (tagProps.animation) {
      tagProps.moment = (tagProps.animation.duration + tagProps.animation.delay) * $ratio || 0;
      tagProps.paused = this.state.mouseMoveType === 'update';
    }
    return React.cloneElement(tag, tagProps);
  }

  render() {
    const props = { ...this.props };
    const style = { ...props.style };
    style.display = props.show ? 'block' : 'none';
    style.position = 'absolute';
    style.width = '100%';
    if (this.props.mouseMoveType !== 'end') {
      style[this.transform] = '';
    }
    props.style = style;
    props.className = `banner-anim-elem ${this.props.prefixCls || ''}`.trim();
    const bgElem = toArrayChildren(this.props.children).filter(item =>
      item.type.isBannerAnimBgElement)
      .map(item => {
        return React.cloneElement(item, { show: this.state.show });
      });
    [
      `prefixCls`, `callBack`,
      `animType`, `duration`, `delay`, `ease`,
      `elemOffset`, 'followParallax',
      'show', 'type', 'direction', 'leaveChildHide', 'sync',
      'ratio', 'mouseMoveType'
    ].forEach(key => delete props[key]);
    if (this.show === this.state.show && !this.state.mouseMoveType ||
      this.state.mouseMoveType === 'reChild') {
      if (!this.state.show) {
        this.enterMouse = null;
        return React.createElement(TweenOne, props, bgElem);
      }
      if (this.props.followParallax) {
        props.onMouseMove = this.getFollowMouseMove();
      }
      return React.createElement(TweenOne, props,
        this.props.mouseMoveType === 'update' ? bgElem : this.getChildren());
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
  delay: PropTypes.number,
  direction: PropTypes.string,
  callBack: PropTypes.func,
  followParallax: PropTypes.any,
  show: PropTypes.bool,
  leaveChildHide: PropTypes.bool,
  sync: PropTypes.bool,
  ratio: PropTypes.number,
  mouseMoveType: PropTypes.string,
};
Element.defaultProps = {
  component: 'div',
  callBack: noop,
  delay: 0,
};

Element.BgElement = BgElement;
Element.isBannerAnimElement = true;
export default Element;
