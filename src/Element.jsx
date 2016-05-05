import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import TweenOne from 'rc-tween-one';
import ticker from 'rc-tween-one/lib/ticker';
import assign from 'object-assign';
import Css from 'style-utils';
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
    };
    this.isScroll = false;
    [
      'onScroll',
      'onResize',
      'onMouseMove',
      'getImgOrVideo',
      'videoLoadedData',
      'addScrollEvent',
      'getFollowStyle',
      'followAnalysisType',
      'getChildren',
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
    if (this.props.followParallax) {
      this.timeoutID = `followTicker${Date.now() + Math.random()}`;
      this.startFrame = ticker.frame;
      ticker.wake(this.timeoutID, () => {
        const moment = Math.round((ticker.frame - this.startFrame) * (1000 / 60));
        if (moment >= this.props.followParallax.delay || 0) {
          this.cancelRequestAnimationFrame();
          if (window.addEventListener) {
            this.dom.addEventListener('mousemove', this.onMouseMove);
          } else {
            this.dom.attachEvent('onmousemove', this.onMouseMove);
          }
        }
      });
    }
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
      this.dom.removeEventListener('mousemove', this.onMouseMove);
    } else {
      window.detachEvent('onresize', this.onResize);
      window.detachEvent('onscroll', this.onScroll);
      this.dom.detachEvent('onmousemove', this.onMouseMove);
    }
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

    this.setState({
      mouseXY,
      domWH,
    });
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
      videoRect.left = -(videoRect.width - domRect.width) / 2;
    }
    this.setState({
      videoRect,
    });
  }

  onScroll() {
    // const clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    const scrollTop = currentScrollTop();
    const domRect = this.dom.getBoundingClientRect();
    const domHeight = domRect.height;
    const offsetTop = domRect.top + scrollTop;
    // const elementShowHeight = scrollTop - offsetTop + clientHeight;
    // scale 在出屏出时是 1, scrollTop 为 0 时是 0;
    let scale = scrollTop / (domHeight + offsetTop);// elementShowHeight / (clientHeight + domHeight);
    scale = scale >= 1 ? 1 : scale;
    // scale = scale <=0 ? 0 : scale;
    const _css = {};
    Object.keys(this.props.bgParallax).forEach((_key)=> {
      const key = Css.getGsapType(_key);
      const item = this.props.bgParallax[_key];
      const cssName = Css.isTransform(key);
      if (!Array.isArray(item)) {
        _css[cssName] = item;
        return;
      }
      const cssData = item[0] - scale * (item[0] - item[1]);
      if (cssName === 'transform') {
        _css[cssName] = Css.mergeStyle(_css[cssName] || '', Css.getParam(key, cssData, cssData));
      } else if (cssName === 'filter') {
        _css[cssName] = Css.mergeStyle(_css[cssName] || '', Css.getFilterParam(key, cssData, cssData));
      } else {
        _css[cssName] = Css.getParam(key, cssData, cssData);
      }
    });
    this.setState({
      bgParallaxAnim: _css,
    });
  }

  getFollowStyle(type, value) {
    let mouseData = this.state.mouseXY.x;
    let domData = this.state.domWH.w;
    if ((type.indexOf('y') >= 0 || type.indexOf('Y') >= 0) && type !== 'opacity') {
      mouseData = this.state.mouseXY.y;
      domData = this.state.domWH.h;
    }
    let d = -(mouseData - domData / 2) * value;
    if (type === 'opacity') {
      // 如果是透明度，，变换为value的区间，，最左边为 1 - value; 最右边为 1;
      d = (mouseData / domData) * value + 1 - value;
    }
    const css = Css.getParam(type, d, d);
    return type.indexOf('backgroundPosition') >= 0 ? `calc(50% + ${css}px )` : css;
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
          dataToArray(item.type).map(this.followAnalysisType.bind(this, item.scale))
            .forEach(_item => {
              followObj[_item.cssName] = Css
                .mergeStyle(followObj[_item.cssName], _item.data);
            });
        }
      });
    }
    const className = `banner-anim-elem-background ${this.props.bgPrefixCls}`.trim();
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
        dataToArray(data.type).map(this.followAnalysisType.bind(this, data.scale))
          .forEach(_item => {
            style[_item.cssName] = Css.mergeStyle(style[_item.cssName], _item.data);
          });
        props.style = style;
        return React.cloneElement(item, props);
      }
      return item;
    });
    return child;
  }

  videoLoadedData() {
    this.onResize();
    if (window.addEventListener) {
      window.addEventListener('resize', this.onResize);
    } else {
      window.attachEvent('onresize', this.onResize);
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

  followAnalysisType(scale, _type) {
    const type = Css.getGsapType(_type);
    const cssName = Css.isTransform(type);
    // 把 bgParallax 的合进来；
    const bgParallaxStyle = this.state.bgParallaxAnim || {};
    return {
      cssName: cssName,
      data: Css.mergeStyle(bgParallaxStyle[cssName] || '',
        this.getFollowStyle(type, scale)),
    };
  }

  cancelRequestAnimationFrame() {
    ticker.clear(this.timeoutID);
    this.timeoutID = -1;
  }

  render() {
    const bgElem = this.props.bg || this.props.img ?
      this.getImgOrVideo() : null;
    const childrenToRender = (
      <TweenOne
        {...this.props}
        style={this.props.style}
        className={`banner-anim-elem ${this.props.prefixCls || ''}`.trim()}
        component={this.props.component}
      >
        {bgElem}
        {this.getChildren()}
      </TweenOne>
    );
    return (this.props.animType ?
      this.props.animType(childrenToRender,
        this.props.type,
        this.props.direction,
        {
          ease: this.props.ease,
          duration: this.props.duration,
          onComplete: this.props.callBack.bind(this, this.props.type),
        },
        this.props.elemOffset
      ) :
      childrenToRender);
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
};
Element.defaultProps = {
  component: 'div',
  bgType: 'img',
  callBack: noop,
};

export default Element;
