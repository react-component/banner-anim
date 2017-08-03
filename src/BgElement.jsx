import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {
  stylesToCss,
} from 'style-utils';
import {
  currentScrollTop,
  toArrayChildren,
  windowHeight,
} from './utils';
import animType from './anim';
import Tween from 'rc-tween-one/lib/Tween';

export default class BgElement extends React.Component {
  constructor() {
    super(...arguments);
    this.isVideo = toArrayChildren(this.props.children).filter(item => item.type === 'video');
    if (this.isVideo.length) {
      // 如果是 video，删除 grid 系列，位置发生变化，重加载了 video;
      delete animType.grid;
      delete animType.gridBar;
    }
    if (this.props.scrollParallax) {
      this.scrollParallaxDuration = this.props.scrollParallax.duration || 450;
    }
    this.video = null;
    this.videoLoad = false;
  }

  componentDidMount() {
    this.dom = ReactDOM.findDOMNode(this);
    if (!this.videoLoad) {
      this.video = ReactDOM.findDOMNode(this.refs.video);
      if (this.video && this.props.videoResize) {
        this.video.onloadeddata = this.videoLoadedData;
      }
    }
    if (this.props.scrollParallax) {
      this.tween = new Tween(this.dom, [{
        ease: 'linear', // 放前面是为了在外面设置了可覆盖。
        ...this.props.scrollParallax,
      }], { attr: 'style' });
      this.tween.frame(0);
      this.onScroll();
      if (window.addEventListener) {
        window.addEventListener('scroll', this.onScroll);
      } else {
        window.attachEvent('onscroll', this.onScroll);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show) {
      if (this.video && this.props.videoResize && this.videoLoad) {
        this.videoLoadedData();
      }
      if (this.props.scrollParallax) {
        this.onScroll();
      }
    } else {
      this.componentWillUnmount();
    }
  }

  componentWillUnmount() {
    if (window.addEventListener) {
      window.removeEventListener('resize', this.onResize);
      window.removeEventListener('scroll', this.onScroll);
    } else {
      window.detachEvent('onresize', this.onResize);
      window.detachEvent('onscroll', this.onScroll);
    }
  }

  onScroll = () => {
    const scrollTop = currentScrollTop();
    const domRect = this.dom.parentNode.getBoundingClientRect();
    const offsetTop = domRect.top + scrollTop;
    const height = Math.max(domRect.height, windowHeight());
    const elementShowHeight = scrollTop - offsetTop + height;
    let scale = elementShowHeight / (height + domRect.height);
    scale = scale || 0;
    scale = scale >= 1 ? 1 : scale;
    this.tween.frame(scale * this.scrollParallaxDuration);
  };

  onResize = () => {
    const domRect = this.dom.getBoundingClientRect();
    const videoDomRect = this.video.getBoundingClientRect();
    this.videoLoad = true;
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
    Object.keys(videoRect).forEach(key => {
      this.video.style[key] = stylesToCss(key, videoRect[key]);
    });
  };

  videoLoadedData = () => {
    this.onResize();
    if (window.addEventListener) {
      window.addEventListener('resize', this.onResize);
    } else {
      window.attachEvent('onresize', this.onResize);
    }
  };

  render() {
    const props = { ...this.props };
    [
      'videoResize',
      'scrollParallax',
      'scrollParallaxDuration',
      'show',
      'component',
    ].forEach(key => delete props[key]);
    if (this.isVideo && this.props.videoResize) {
      props.children = toArrayChildren(props.children).map(item => {
        const ref = item.type === 'video' ? 'video' : null;
        return React.cloneElement(item, { ...item.props, ref });
      });
    }
    return React.createElement(this.props.component, props);
  }
}

BgElement.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.any,
  component: PropTypes.any,
  videoResize: PropTypes.bool,
  scrollParallax: PropTypes.object,
  show: PropTypes.bool,
};

BgElement.defaultProps = {
  component: 'div',
  videoResize: true,
};

BgElement.isBannerAnimBaElement = true;
