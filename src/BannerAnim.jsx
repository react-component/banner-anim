import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { ticker } from 'rc-tween-one';
import Arrow from './Arrow';
import Thumb from './Thumb';
import { toArrayChildren, dataToArray } from './utils';
import animType from './anim';

class BannerAnim extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentShow: this.props.initShow,
      direction: null,
      wrapperHeight: 0,
      domRect: {},
    };
    this.tweenBool = false;
  }

  componentDidMount() {
    this.getDomDataSetToState();
    if (window.addEventListener) {
      window.addEventListener('resize', this.getDomDataSetToState);
    } else {
      window.attachEvent('onresize', this.getDomDataSetToState);
    }
    if (this.props.autoPlay) {
      this.autoPlay();
    }
  }

  componentWillReceiveProps() {
    this.tweenBool = false;
  }

  componentWillUnmount() {
    if (this.autoPlayId) {
      ticker.clear(this.autoPlayId);
      this.autoPlayId = 0;
    }
    if (window.addEventListener) {
      window.removeEventListener('touchend', this.onTouchEnd);
      window.removeEventListener('mouseup', this.onTouchEnd);
      window.removeEventListener('resize', this.getDomDataSetToState);
    } else {
      window.detachEvent('ontouchend', this.onTouchEnd);
      window.attachEvent('onmouseup', this.onTouchEnd);
      window.detachEvent('onresize', this.getDomDataSetToState);
    }
  }

  onMouseEnter = (e) => {
    this.props.onMouseEnter(e);
    if (this.props.autoPlay && this.props.autoPlayEffect) {
      ticker.clear(this.autoPlayId);
      this.autoPlayId = -1;
    }
  }

  onMouseLeave = (e) => {
    this.props.onMouseLeave(e);
    if (this.props.autoPlay && this.props.autoPlayEffect) {
      this.autoPlay();
    }
  }

  onTouchStart = (e) => {
    if (e.touches && e.touches.length > 1
      || this.elemWrapper.length <= 1
      || this.getDomIsArrowOrThumb(e)
      || e.button === 2 || this.tweenBool) {
      return;
    }
    if (this.props.autoPlay) {
      ticker.clear(this.autoPlayId);
      this.autoPlayId = -1;
    }
    this.animType = this.getAnimType(this.props.type);
    this.currentShow = this.state.currentShow;
    // this.mouseMoveType = 'start';
    this.mouseStartXY = {
      startX: e.touches === undefined ? e.clientX : e.touches[0].clientX,
      startY: e.touches === undefined ? e.clientY : e.touches[0].clientY,
    };
  }

  onTouchMove = (e) => {
    if (!this.mouseStartXY || e.touches && e.touches.length > 1 || this.tweenBool) {
      return;
    }
    const { differ, rectName } = this.getDiffer(e, e.touches);
    if (!differ) {
      return;
    }
    const ratio = differ / this.state.domRect[rectName] * 2;
    const ratioType = ratio < 0 ? '+' : '-';
    let currentShow = this.currentShow;
    this.mouseMoveType = 'update';
    if (this.ratioType !== ratioType) {
      this.ratioType = ratioType;
      this.mouseMoveType = 'reChild';
      this.setState({
        currentShow,
      });
      return;
    }
    if ((this.animType === animType.gridBar || this.animType === animType.grid) && e.touches) {
      return;
    }
    this.ratio = ratio;
    if (this.ratio) {
      let type;
      if (this.ratio < 0) {
        currentShow += 1;
        type = 'next';
      } else {
        currentShow -= 1;
        type = 'prev';
      }
      this.ratio = Math.abs(this.ratio);
      this.ratio = this.ratio > 0.99 ? 0.99 : this.ratio;
      currentShow = currentShow >= this.elemWrapper.length ? 0 : currentShow;
      currentShow = currentShow < 0 ? this.elemWrapper.length - 1 : currentShow;
      this.setState({
        currentShow,
        direction: type,
      });
    }
  }

  onTouchEnd = (e) => {
    if (!this.mouseStartXY ||
      e.changedTouches && e.changedTouches.length > 1 ||
      this.tweenBool
    ) {
      return;
    }
    if (this.props.autoPlay && this.autoPlayId === -1) {
      this.autoPlay();
    }
    const { differ, rectName } = this.getDiffer(e, e.changedTouches);
    delete this.mouseStartXY;
    this.mouseMoveType = 'end';
    if (!differ) {
      this.mouseMoveType = '';
      return
    }
    if ((this.animType === animType.gridBar || this.animType === animType.grid) && e.changedTouches) {
      let currentShow = this.currentShow;
      const ratio = differ / this.state.domRect[rectName] * 2;
      if (ratio < 0) {
        currentShow += 1;
      } else {
        currentShow -= 1;
      }
      currentShow = currentShow >= this.elemWrapper.length ? 0 : currentShow;
      currentShow = currentShow < 0 ? this.elemWrapper.length - 1 : currentShow;
      this.ratio = 0;
      this.mouseMoveType = '';
      this.slickGoTo(currentShow, true);
      this.tweenBool = true;
      return;
    }

    if (this.ratio > 0.3) {
      this.forceUpdate(() => {
        this.ratio = 0;
        this.mouseMoveType = '';
      });
    } else {
      this.setState({
        currentShow: this.currentShow,
        direction: this.ratioType === '+' ? 'prev' : 'next'
      }, () => {
        this.ratio = 0;
        this.mouseMoveType = '';
      });
    }
  }

  getDiffer = (e, touches) => {
    const currentX = touches === undefined ? e.clientX : touches[0].clientX;
    const currentY = touches === undefined ? e.clientY : touches[0].clientY;
    const differX = currentX - this.mouseStartXY.startX;
    const differY = currentY - this.mouseStartXY.startY;
    let differ = Math.max(Math.abs(differX), Math.abs(differY));
    differ = differ === Math.abs(differX) ? differX : differY;
    return {
      differ,
      rectName: differ === differX ? 'width' : 'height',
    };
  }

  getDomIsArrowOrThumb = (e) => {
    const arrowClassName = e.target.className;
    const thumbClassName = e.target.parentNode.className;
    if (
      arrowClassName.indexOf('banner-anim-arrow') >= 0 ||
      thumbClassName.indexOf('banner-anim-thumb') >= 0
    ) {
      return true;
    }
    return false;
  }

  getRenderChildren = (children) => {
    const elem = [];
    const arrow = [];
    let thumb;
    let elementKeyNum = 0;
    let thumbKeyNum = 0;

    toArrayChildren(children).forEach((item, i) => {
      if (!item) {
        return;
      }
      const itemProps = { ...item.props };
      if (item.type.isBannerAnimElement) {
        itemProps.key = item.key || `element-${elementKeyNum}`;
        elementKeyNum += 1;
        itemProps.callBack = this.animEnd;
        itemProps.show = this.state.currentShow === i;
        itemProps.animType = this.animType;
        itemProps.duration = this.props.duration;
        itemProps.delay = this.props.delay;
        itemProps.ease = this.props.ease;
        itemProps.sync = this.props.sync || itemProps.sync;
        itemProps.elemOffset = {
          top: this.state.domRect.top,
          width: this.state.domRect.width,
          height: this.state.wrapperHeight,
        };
        itemProps.direction = this.state.direction;
        itemProps.ratio = this.ratio;
        itemProps.mouseMoveType = this.mouseMoveType;
        elem.push(React.cloneElement(item, itemProps));
      } else if (item.type.isBannerAnimArrow) {
        itemProps.next = this.next;
        itemProps.prev = this.prev;
        itemProps.key = item.key || itemProps.arrowType;
        itemProps.elemHeight = this.state.wrapperHeight;
        arrow.push(React.cloneElement(item, itemProps));
      } else if (item.type.isBannerAnimThumb) {
        itemProps.key = item.key || `thumb-${thumbKeyNum}`;
        thumbKeyNum += 1;
        itemProps.thumbClick = this.slickGoTo;
        itemProps.active = this.state.currentShow;
        thumb = React.cloneElement(item, itemProps);
      }
    });
    if (elem.length > 1) {
      if (!arrow.length && this.props.arrow) {
        arrow.push(
          <Arrow arrowType="prev" key="arrowPrev" next={this.next} prev={this.prev} default />,
          <Arrow arrowType="next" key="arrowNext" next={this.next} prev={this.prev} default />
        );
      }
      if (!thumb && this.props.thumb) {
        thumb = (<Thumb length={elem.length} key="thumb"
          thumbClick={this.slickGoTo}
          active={this.state.currentShow}
          default
        />);
      }
    }
    this.elemWrapper = elem;
    return elem.concat(arrow, thumb);
  }

  getDomDataSetToState = () => {
    this.dom = ReactDOM.findDOMNode(this);
    const domRect = this.dom.getBoundingClientRect();
    // 获取宽度与定位，setState刷新；
    const wrapperHeight = this.getElementHeight(
      this.dom.getElementsByClassName('banner-anim-elem'));
    this.setState({
      wrapperHeight,
      domRect,
    });
    this.tweenBool = false;
  }

  getElementHeight = (children) => {
    let height = 0;
    for (let i = 0; i < children.length; i++) {
      const dom = children[i];
      const _height = dom.getBoundingClientRect().height;
      height = height > _height ? height : _height;
    }
    return height;
  }


  getAnimType = (type) => {
    const typeArray = type ? dataToArray(type) : Object.keys(animType);
    const random = Math.round(Math.random() * (typeArray.length - 1));
    return animType[typeArray[random]];
  }

  autoPlay = () => {
    this.autoPlayId = ticker.interval(this.next, this.props.autoPlaySpeed);
  }

  animTweenStart = (show, type, noGetAnimType) => {
    if (!noGetAnimType) {
      this.animType = this.getAnimType(this.props.type);
    }
    this.props.onChange('before', show);
    this.setState({
      currentShow: show,
      direction: type,
    });
  }

  animEnd = (type) => {
    if (type === 'enter') {
      this.tweenBool = false;
      this.props.onChange('after', this.state.currentShow);
    }
  }

  next = () => {
    if (!this.tweenBool) {
      this.tweenBool = true;
      let newShow = this.state.currentShow;
      newShow++;
      if (newShow >= this.elemWrapper.length) {
        newShow = 0;
      }
      this.animTweenStart(newShow, 'next');
    }
  }

  prev = () => {
    if (!this.tweenBool) {
      this.tweenBool = true;
      let newShow = this.state.currentShow;
      newShow--;
      if (newShow < 0) {
        newShow = this.elemWrapper.length - 1;
      }
      this.animTweenStart(newShow, 'prev');
    }
  }

  slickGoTo = (i, noGetAnimType) => {
    if (!this.tweenBool && i !== this.state.currentShow) {
      this.tweenBool = true;
      const type = i > this.state.currentShow ? 'next' : 'prev';
      this.animTweenStart(i, type, noGetAnimType);
    }
  }

  render() {
    const prefixCls = this.props.prefixCls;
    const props = { ...this.props };
    [
      'type',
      'prefixCls',
      'component',
      'initShow',
      'duration',
      'delay',
      'ease',
      'arrow',
      'thumb',
      'autoPlaySpeed',
      'autoPlay',
      'thumbFloat',
      'sync',
      'dragPlay',
      'autoPlayEffect',
    ].forEach(key => delete props[key]);
    const childrenToRender = this.getRenderChildren(props.children);
    props.className = `${props.className} ${prefixCls || ''}`.trim();
    props.style = { ...props.style };
    props.onMouseEnter = this.onMouseEnter;
    props.onMouseLeave = this.onMouseLeave;
    if (childrenToRender.length > 1 && this.props.dragPlay) {
      props.onTouchStart = this.onTouchStart;
      props.onMouseDown = this.onTouchStart;
      props.onTouchMove = this.onTouchMove;
      props.onMouseMove = this.onTouchMove;
      props.onTouchEnd = this.onTouchEnd;
      props.onMouseUp = this.onTouchEnd;
    }
    return React.createElement(this.props.component, props, childrenToRender);
  }
}
BannerAnim.propTypes = {
  children: PropTypes.any,
  style: PropTypes.object,
  className: PropTypes.string,
  prefixCls: PropTypes.string,
  component: PropTypes.any,
  arrow: PropTypes.bool,
  thumb: PropTypes.bool,
  initShow: PropTypes.number,
  type: PropTypes.any,
  duration: PropTypes.number,
  delay: PropTypes.number,
  ease: PropTypes.string,
  autoPlay: PropTypes.bool,
  autoPlaySpeed: PropTypes.number,
  autoPlayEffect: PropTypes.bool,
  onChange: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  sync: PropTypes.bool,
  dragPlay: PropTypes.bool,
};
BannerAnim.defaultProps = {
  component: 'div',
  className: 'banner-anim',
  initShow: 0,
  duration: 450,
  delay: 0,
  ease: 'easeInOutQuad',
  arrow: true,
  thumb: true,
  autoPlaySpeed: 5000,
  autoPlayEffect: true,
  dragPlay: true,
  onChange: () => {
  },
  onMouseEnter: () => {
  },
  onMouseLeave: () => {
  },
};
BannerAnim.isBannerAnim = true;
export default BannerAnim;
