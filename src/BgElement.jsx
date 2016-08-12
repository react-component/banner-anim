import React from 'react';
import ReactDOM from 'react-dom';
import {
  stylesToCss,
} from 'style-utils';
import {
  currentScrollTop,
  toArrayChildren,
} from './utils';
import animType from './anim';
import TweenOne from 'rc-tween-one';


export default class BgElement extends React.Component {
  constructor() {
    super(...arguments);
    this.isVideo = toArrayChildren(this.props.children).filter(item => item.type === 'video');
    if (this.isVideo.length) {
      // 如果是 video，删除 grid 系列，位置发生变化，重加载了 video;
      delete animType.grid;
      delete animType.gridBar;
    }
    this.state = {
      moment: null,
    };
    if (this.props.scrollParallax) {
      this.scrollParallaxDuration = this.props.scrollParallax.duration || 450;
    }
    this.video = null;
    this.videoLoad = false;
  }

  componentDidMount() {
    if (!this.videoLoad) {
      this.dom = ReactDOM.findDOMNode(this);
      this.video = ReactDOM.findDOMNode(this.refs.video);
      if (this.video && this.props.videoResize) {
        this.video.onloadeddata = this.videoLoadedData;
      }
    }
    if (this.props.scrollParallax) {
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
      this.componentDidMount();
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

    const domHeight = domRect.height;
    const offsetTop = domRect.top + scrollTop;
    // scale 在出屏出时是 1, scrollTop 为 0 时是 0;
    let scale = scrollTop / (domHeight + offsetTop);
    scale = scale || 0;
    scale = scale >= 1 ? 1 : scale;
    this.setState({
      moment: scale * this.scrollParallaxDuration,
    });
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
      'videoResize', 'scrollParallax', 'scrollParallaxDuration', 'show',
    ].forEach(key => delete props[key]);
    if (this.props.scrollParallax) {
      props.animation = {
        ease: 'linear', // 放前面是为了在外面设置了可覆盖。
        ...this.props.scrollParallax,
      };
      props.paused = true;
      props.moment = this.state.moment;
    }
    if (this.isVideo && this.props.videoResize) {
      props.children = toArrayChildren(props.children).map(item => {
        const ref = item.type === 'video' ? 'video' : null;
        return React.cloneElement(item, { ...item.props, ref });
      });
    }
    return React.createElement(TweenOne, props);
  }
}

BgElement.propTypes = {
  className: React.PropTypes.string,
  style: React.PropTypes.object,
  children: React.PropTypes.any,
  component: React.PropTypes.any,
  videoResize: React.PropTypes.bool,
  scrollParallax: React.PropTypes.object,
  show: React.PropTypes.bool,
};

BgElement.defaultProps = {
  component: 'div',
  videoResize: true,
};
