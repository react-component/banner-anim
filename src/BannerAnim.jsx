import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Arrow from './Arrow';
import Element from './Element';
import Thumb from './Thumb';
import ticker from 'rc-tween-one/lib/ticker';
import { toArrayChildren, dataToArray, setAnimCompToTagComp, switchChildren } from './utils';
import animType from './anim';

class BannerAnim extends Component {
  constructor() {
    super(...arguments);
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
    }
    if (window.addEventListener) {
      window.removeEventListener('resize', this.getDomDataSetToState);
    } else {
      window.detachEvent('onresize', this.getDomDataSetToState);
    }
  }

  onMouseEnter = () => {
    this.props.onMouseEnter();
    if (this.props.autoPlay) {
      ticker.clear(this.autoPlayId);
    }
  }

  onMouseLeave = () => {
    this.props.onMouseLeave();
    if (this.props.autoPlay) {
      this.autoPlay();
    }
  }

  onTouchStart = (e) => {
    this.mouseXY = {
      startX: e.touches === undefined ? e.clientX : e.touches[0].clientX,
      startY: e.touches === undefined ? e.clientY : e.touches[0].clientY,
    };
  }

  onTouchMove = (e) => {
    if (!this.mouseXY) {
      return;
    }
    this.mouseXY.currentX = e.touches === undefined ? e.clientX : e.touches[0].clientX;
    this.mouseXY.currentY = e.touches === undefined ? e.clientY : e.touches[0].clientY;
  }

  onTouchEnd = () => {
    if (!this.mouseXY) {
      return;
    }
    const differX = this.mouseXY.currentX - this.mouseXY.startX;
    const differY = this.mouseXY.currentY - this.mouseXY.startY;
    const r = Math.atan2(differY, differX);
    let angle = Math.round(r * 180 / Math.PI);
    angle = angle < 0 ? 360 - Math.abs(angle) : angle;
    if ((angle >= 0 && angle <= 45 || angle >= 315) && differX > this.state.domRect.width * 0.1) {
      this.prev();
    } else if (angle >= 135 && angle <= 225 && differX < -this.state.domRect.width * 0.1) {
      this.next();
    }
    delete this.mouseXY;
  }

  getRenderChildren = (children) => {
    const elem = [];
    const arrow = [];
    let thumb;

    const _animType = this.getAnimType(this.props.type);
    toArrayChildren(children).forEach((item, i) => {
      if (!item.key) {
        throw new Error('Please add key, key is required');
      }
      const itemProps = { ...item.props };
      switch (item.type) {
        case Element:
          itemProps.key = item.key;
          itemProps.callBack = this.animEnd;
          itemProps.show = this.state.currentShow === i;
          itemProps.animType = _animType;
          itemProps.duration = this.props.duration;
          itemProps.delay = this.props.delay;
          itemProps.ease = this.props.ease;
          itemProps.sync = this.props.sync;
          itemProps.elemOffset = {
            top: this.state.domRect.top,
            width: this.state.domRect.width,
            height: this.state.wrapperHeight,
          };
          itemProps.direction = this.state.direction;
          elem.push(React.cloneElement(item, itemProps));
          break;
        case Arrow:
          itemProps.next = this.next;
          itemProps.prev = this.prev;
          itemProps.elemHeight = this.state.wrapperHeight;
          arrow.push(React.cloneElement(item, itemProps));
          break;
        case Thumb:
          itemProps.thumbClick = this.slickGoTo;
          itemProps.active = this.state.currentShow;
          thumb = React.cloneElement(item, itemProps);
          break;
        default:
          break;
      }
    });
    if (elem.length > 1) {
      if (!arrow.length && this.props.arrow) {
        arrow.push(
          <Arrow arrowType="prev" key="arrowPrev" next={this.next} prev={this.prev} default
            elemHeight={this.state.wrapperHeight}
          />,
          <Arrow arrowType="next" key="arrowNext" next={this.next} prev={this.prev} default
            elemHeight={this.state.wrapperHeight}
          />
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

  animTweenStart = (show, type) => {
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

  slickGoTo = (i) => {
    if (!this.tweenBool && i !== this.state.currentShow) {
      this.tweenBool = true;
      const type = i > this.state.currentShow ? 'next' : 'prev';
      this.animTweenStart(i, type);
    }
  }

  render() {
    const prefixCls = this.props.prefixCls;
    const props = { ...this.props };
    [
      `prefixCls`,
      `component`,
      `initShow`,
      `duration`,
      `delay`,
      `ease`,
      `arrow`,
      `thumb`,
      `autoPlaySpeed`,
      'autoPlay',
      'thumbFloat',
      'sync',
      'dragPlay',
    ].forEach(key => delete props[key]);
    const childrenToRender = this.getRenderChildren(props.children);
    props.className = `${props.className} ${prefixCls || ''}`.trim();
    props.style = { ...props.style };
    if (childrenToRender.length > 1 && this.props.dragPlay) {
      props.onMouseEnter = this.onMouseEnter;
      props.onMouseLeave = this.onMouseLeave;
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
const stringOrArray = PropTypes.oneOfType([PropTypes.array, PropTypes.string]);
BannerAnim.propTypes = {
  children: PropTypes.any,
  style: PropTypes.object,
  className: PropTypes.string,
  prefixCls: PropTypes.string,
  component: PropTypes.any,
  arrow: PropTypes.bool,
  thumb: PropTypes.bool,
  initShow: PropTypes.number,
  type: stringOrArray,
  duration: PropTypes.number,
  delay: PropTypes.number,
  ease: PropTypes.string,
  autoPlay: PropTypes.bool,
  autoPlaySpeed: PropTypes.number,
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
  dragPlay: true,
  onChange: () => {
  },
  onMouseEnter: () => {
  },
  onMouseLeave: () => {
  },
};
BannerAnim.Arrow = Arrow;
BannerAnim.Element = Element;
BannerAnim.Thumb = Thumb;
BannerAnim.animType = animType;
BannerAnim.setAnimCompToTagComp = setAnimCompToTagComp;
BannerAnim.switchChildren = switchChildren;
BannerAnim.isBannerAnim = true;
export default BannerAnim;
