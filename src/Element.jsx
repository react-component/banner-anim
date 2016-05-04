import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import TweenOne from 'rc-tween-one';
import Css from 'style-utils';
import animType from './anim';
import {
  currentScrollTop,
} from './utils';

function noop() {
}

class Element extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      bgAnim: null,
      videoRect: {
        width: 'auto',
        height: 'auto',
        display: 'block',
      },
    };
    this.isScroll = false;
    [
      'onScroll',
      'onResize',
      'getImgOrVideo',
      'videoLoadedData',
      'addScrollEvent',
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

  componentDidUpdate() {
    if (this.props.bgParallax && !this.isScroll) {
      this.addScrollEvent(this.props);
    }
  }

  componentWillUnmount() {
    this.isScroll = false;
    if (window.addEventListener) {
      window.removeEventListener('resize', this.onResize);
      window.removeEventListener('scroll', this.onScroll);
    } else {
      window.detachEvent('onresize', this.onResize);
      window.detachEvent('onscroll', this.onScroll);
    }
  }

  addScrollEvent(props) {
    this.onScroll();
    this.isScroll = true;
    if (window.addEventListener) {
      window.addEventListener('scroll', this.onScroll);
    } else {
      window.attachEvent('onscroll', this.onScroll);
    }
  }

  videoLoadedData() {
    this.onResize();
    if (window.addEventListener) {
      window.addEventListener('resize', this.onResize);
    } else {
      window.attachEvent('onresize', this.onResize);
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
        return _css[cssName] = item;
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
      bgAnim: _css,
    });
  }

  getImgOrVideo() {
    const dom = this.props.bgType.indexOf('video') >= 0 ?
      (<div className={`banner-anim-elem-background`} style={this.state.bgAnim} key="bgElem">
        <video loop autoPlay
          style={this.state.videoRect}
          onLoadedData={this.videoLoadedData}
        >
          <source src={this.props.bg || this.props.img} type={this.props.bgType} />
        </video>
      </div>) :
      (<div
        className={`banner-anim-elem-background`}
        style={{ backgroundImage: `url(${this.props.bg || this.props.img})`, ...this.state.bgAnim }}
        key="bgElem"
      ></div>);
    return dom;
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
        {this.props.children}
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
};
Element.defaultProps = {
  component: 'div',
  bgType: 'img',
  callBack: noop,
};

export default Element;
