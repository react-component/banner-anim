import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import assign from 'object-assign';
import Arrow from './Arrow';
import Element from './Element';
import Thumb from './Thumb';
import ticker from 'rc-tween-one/lib/ticker';
import { toArrayChildren, dataToArray, setAnimCompToTagComp } from './utils';
import animType from './anim';
import '../assets/index.css';


class BannerAnim extends Component {
  constructor() {
    super(...arguments);
    this.tweenBool = false;
    [
      'replaceChildren',
      'replaceChildrenArrowThumb',
      'next',
      'prev',
      'thumbClick',
      'getElementHeight',
      'saveChildren',
      'getShowChildren',
      'animToCurrentShow',
      'getAnimType',
      'autoPlay',
      'animEndSetState',
      'setThumbActive',
      'onResize',
      'cancelRequestAnimationFrame',
      'timeoutRaf',
      'onMouseEnter',
      'onMouseLeave',
      'onTouchStart',
      'onTouchMove',
      'onTouchEnd',
      'getDomDataSetToState',
    ].forEach((method) => this[method] = this[method].bind(this));
    this.state = {
      wrapperHeight: 0,
      thumbHeight: 0,
      elemWidth: null,
      currentShow: this.props.initShow,
      children: this.props.children,
    };
    this.thumbIsDefault = false;
    this.children = this.saveChildren(this.state.children);
    this.timeoutRafID = -1;
    this.startMoment = 0;
    this.startFrame = 0;
  }

  componentDidMount() {
    this.getDomDataSetToState();
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.children, 1)
    // 在动画时不刷新 children 会在结束后触发；
    const _children = this.saveChildren(nextProps.children, true);

    let children;
    if (!this.tweenBool) {
      // 元素在动画结束后再刷新
      children = this.replaceChildren(this.state.children, _children);
      this.children = _children;
    } else {
      children = this.replaceChildrenArrowThumb(this.children, _children);
      console.log(this.children.elemWrapper, children)
    }
    this.setState({ children });
  }

  componentWillUnmount() {
    if (window.addEventListener) {
      window.removeEventListener('resize', this.onResize);
    } else {
      window.detachEvent('onresize', this.onResize);
    }
    this.cancelRequestAnimationFrame();
  }


  onMouseEnter() {
    this.props.onMouseEnter();
    if (this.props.autoPlay) {
      this.startMoment = this.moment;
      this.cancelRequestAnimationFrame();
    }
  }

  onMouseLeave() {
    this.props.onMouseLeave();
    if (this.props.autoPlay) {
      this.autoPlay();
    }
  }

  onTouchStart(e) {
    this.mouseXY = {
      startX: e.touches === undefined ? e.clientX : e.touches[0].clientX,
      startY: e.touches === undefined ? e.clientY : e.touches[0].clientY,
    };
  }

  onTouchMove(e) {
    if (!this.mouseXY) {
      return;
    }
    this.mouseXY.currentX = e.touches === undefined ? e.clientX : e.touches[0].clientX;
    this.mouseXY.currentY = e.touches === undefined ? e.clientY : e.touches[0].clientY;
  }

  onTouchEnd() {
    const differX = this.mouseXY.currentX - this.mouseXY.startX;
    const differY = this.mouseXY.currentY - this.mouseXY.startY;
    const r = Math.atan2(differY, differX);
    let angle = Math.round(r * 180 / Math.PI);
    angle = angle < 0 ? 360 - Math.abs(angle) : angle;
    if ((angle >= 0 && angle <= 45 || angle >= 315) && differX > this.state.elemWidth * 0.1) {
      this.next();
    } else if (angle >= 135 && angle <= 225 && differX < -this.state.elemWidth * 0.1) {
      this.prev();
    }
    delete this.mouseXY;
  }

  onResize() {
    if (!this.tweenBool) {
      const dom = ReactDOM.findDOMNode(this);
      const elemWidth = dom.getBoundingClientRect().width;
      const wrapperHeight = this.getElementHeight(this.dom.getElementsByClassName('banner-anim-elem'));
      const _tHeight = this.thumbIsDefault ? 40 : this.getElementHeight(this.dom.getElementsByClassName('banner-anim-thumb'));
      const thumbHeight = this.props.thumbFloat ? 0 : _tHeight;
      const children = this.getShowChildren(this.state.currentShow);
      this.setState({
        wrapperHeight,
        thumbHeight,
        elemWidth,
        children,
      });
    }
  }

  getAnimType(type) {
    const typeArray = type ? dataToArray(type) : Object.keys(animType);
    const random = Math.round(Math.random() * (typeArray.length - 1));
    return animType[typeArray[random]];
  }

  setThumbActive(newShow, item) {
    const props = assign({}, item.props);
    props.active = newShow;
    return React.cloneElement(item, props);
  }

  getElementHeight(children) {
    let height = 0;
    for (let i = 0; i < children.length; i++) {
      const dom = children[i];
      const _height = dom.getBoundingClientRect().height;
      height = height > _height ? height : _height;
    }
    return height;
  }

  getShowChildren(currentShow) {
    // video 时重复加载，所以把子级归位，加 none;
    const elem = this.children.elemWrapper.map((item, i) => {
      const props = assign({}, item.props);
      const style = assign({}, props.style);
      style.zIndex = null;
      // 预防预设了 transform 的值；
      style.transform = style.transform || null;
      if (i !== currentShow) {
        style.display = 'none';
        props.style = style;
        return React.cloneElement(item, props, null);
      }
      delete style.display;
      props.style = style;
      return React.cloneElement(item, props);
    });
    const thumbWrapper = this.children.thumbWrapper.map(
      this.setThumbActive.bind(this, currentShow)
    );
    return elem.concat(this.children.arrowWrapper, thumbWrapper);
  }

  getDomDataSetToState() {
    this.dom = ReactDOM.findDOMNode(this);
    const elemWidth = this.dom.getBoundingClientRect().width;
    // 获取宽度与定位，setState刷新；
    const wrapperHeight = this.getElementHeight(this.dom.getElementsByClassName('banner-anim-elem'));
    const _tHeight = this.thumbIsDefault ? 40 :
      this.getElementHeight(this.dom.getElementsByClassName('banner-anim-thumb'));
    const thumbHeight = this.props.thumbFloat ? 0 : _tHeight;
    // 更新 arrow 里的 elemHeight;
    this.children.arrowWrapper = this.children.arrowWrapper.map(item => {
      const props = assign({}, props);
      props.elemHeight = wrapperHeight;
      return React.cloneElement(item, props);
    });
    const children = this.getShowChildren(this.state.currentShow);

    this.setState({
      wrapperHeight,
      thumbHeight,
      elemWidth,
      children,
    });

    if (window.addEventListener) {
      window.addEventListener('resize', this.onResize);
    } else {
      window.attachEvent('onresize', this.onResize);
    }

    if (this.props.autoPlay && this.children.elemWrapper.length > 1) {
      this.autoPlay();
    }
  }

  autoPlay() {
    this.timeoutRafID = `bannerTicker${Date.now() + Math.random()}`;
    this.startFrame = ticker.frame;
    ticker.wake(this.timeoutRafID, this.timeoutRaf);
  }

  animEndSetState(type) {
    if (type === 'enter') {
      this.children = this.saveChildren(this.props.children);
      const children = this.getShowChildren(this.state.currentShow);
      this.props.onChange('after', this.state.currentShow);
      this.tweenBool = false;
      this.setState({
        children,
      });
    }
  }

  next() {
    if (!this.tweenBool) {
      this.tweenBool = true;
      let newShow = this.state.currentShow;
      newShow++;
      if (newShow >= this.children.elemWrapper.length) {
        newShow = 0;
      }
      this.animToCurrentShow(newShow, 'next');
      if (this.props.autoPlay) {
        this.startMoment = 0;
      }
    }
  }

  prev() {
    if (!this.tweenBool) {
      this.tweenBool = true;
      let newShow = this.state.currentShow;
      newShow--;
      if (newShow < 0) {
        newShow = this.children.elemWrapper.length - 1;
      }
      this.animToCurrentShow(newShow, 'prev');
      if (this.props.autoPlay) {
        this.startMoment = 0;
      }
    }
  }

  thumbClick(i) {
    if (!this.tweenBool) {
      this.tweenBool = true;
      if (i !== this.state.currentShow) {
        const type = i > this.state.currentShow ? 'next' : 'prev';
        this.animToCurrentShow(i, type);
      }
      if (this.props.autoPlay) {
        this.startMoment = 0;
      }
    }
  }

  saveChildren(children) {
    const _children = {
      elemWrapper: [],
      arrowWrapper: [],
      thumbWrapper: [],
    };
    toArrayChildren(children).forEach(item => {
      if (!item.key) {
        throw new Error('Please add key, key is required');
      }
      const itemProps = assign({}, item.props);
      switch (item.type) {
        case Element:
          itemProps.callBack = this.animEndSetState;
          itemProps.style = {
            position: 'absolute',
            width: '100%',
          };
          if (this.props.bgParallaxAll) {
            itemProps.bgParallax = this.props.bgParallaxAll;
          }
          _children.elemWrapper.push(React.cloneElement(item, itemProps));
          break;
        case Arrow:
          itemProps.next = this.next;
          itemProps.prev = this.prev;
          itemProps.elemHeight = this.state.wrapperHeight;
          _children.arrowWrapper.push(React.cloneElement(item, itemProps));
          break;
        case Thumb:
          itemProps.thumbClick = this.thumbClick;
          _children.thumbWrapper.push(React.cloneElement(item, itemProps));
          break;
        default:
          break;
      }
    });
    if (_children.elemWrapper.length > 1) {
      _children.thumbWrapper = _children.thumbWrapper.length ?
        _children.thumbWrapper.map(item =>
          React.cloneElement(item, {
            ...item.props,
            length: _children.elemWrapper.length,
            active: this.props.initShow,
          })
        ) : _children.thumbWrapper;
      if (this.props.arrow && !_children.arrowWrapper.length) {
        _children.arrowWrapper.push(
          <Arrow arrowType="prev" key="arrowPrev" next={this.next} prev={this.prev} default
            elemHeight={this.state.wrapperHeight} />,
          <Arrow arrowType="next" key="arrowNext" next={this.next} prev={this.prev} default
            elemHeight={this.state.wrapperHeight} />
        );
      }
      if (this.props.thumb && !_children.thumbWrapper.length) {
        this.thumbIsDefault = true;
        _children.thumbWrapper.push(
          <Thumb length={_children.elemWrapper.length} key="thumb"
            thumbClick={this.thumbClick}
            default
          />);
      }
    }
    return _children;
  }

  animToCurrentShow(newShow, type) {
    const _animType = this.getAnimType(this.props.type);
    this.children.thumbWrapper = this.children.thumbWrapper.map(this.setThumbActive.bind(this, newShow));
    this.children.elemWrapper = this.children.elemWrapper.map((item, i) => {
      if (i !== this.state.currentShow && i !== newShow) {
        return item;
      }
      const props = assign({}, item.props);
      props.type = i === newShow ? 'enter' : 'leave';
      props.direction = type;
      props.animType = _animType;
      props.duration = this.props.duration;
      props.ease = this.props.ease;
      props.elemOffset = { width: this.state.elemWidth, height: this.state.wrapperHeight };
      // 挡截 newChild, 动画的时候把子级全部去掉，只留 image, currentChild 的子级去除动画效果
      props.children = i === newShow ? null :
        toArrayChildren(props.children).map(setAnimCompToTagComp);
      if (i === newShow) {
        const newStyle = assign({}, props.style);
        newStyle.display = null;
        newStyle.zIndex = 1;
        props.style = newStyle;
      }
      return React.cloneElement(item, props);
    });
    const children = this.children.elemWrapper.concat(this.children.arrowWrapper,
      this.children.thumbWrapper);
    this.props.onChange('before', newShow);
    this.setState({
      children,
      currentShow: newShow,
    });
  }

  cancelRequestAnimationFrame() {
    ticker.clear(this.timeoutRafID);
    this.timeoutRafID = -1;
  }

  timeoutRaf() {
    this.moment = Math.round((ticker.frame - this.startFrame) * (1000 / 60)) + this.startMoment;
    if (this.moment >= this.props.autoPlaySpeed) {
      setTimeout(() => {
        this.next();
        this.startMoment = 0;
        this.startFrame = ticker.frame;
      });
    }
  }

  replaceChildren(currentChildren, newChildren) {
    return toArrayChildren(currentChildren).map(item => {
      let _item;
      switch (item.type) {
        case Element:
          _item = newChildren.elemWrapper.filter(elemItem => elemItem.key === item.key)[0];
          const props = assign({}, _item.props);
          // 这里避免再次触发动画，把动画组件转换成组件里的 component 属性
          props.children = toArrayChildren(props.children).map(setAnimCompToTagComp);
          _item = React.cloneElement(item, props);
          break;
        case Arrow:
          _item = newChildren.arrowWrapper.filter(arrowItem => arrowItem.key === item.key)[0];
          break;
        case Thumb:
          _item = newChildren.thumbWrapper.filter(thumbItem => thumbItem.key === item.key)[0];
          _item = this.setThumbActive(this.state.currentShow, _item);
          break;
        default:
          _item = item;
          break;
      }
      return _item;
    });
  }

  replaceChildrenArrowThumb(currentChild, nextChild) {
    // 在动画时只更新箭头与缩略图
    const children = nextChild;
    children.arrowWrapper = children.arrowWrapper.map(item => {
      const _item = currentChild.arrowWrapper.filter(arrowItem => arrowItem.key === item.key)[0];
      return React.cloneElement(item, { ..._item.props, ...item.props });
    });
    children.thumbWrapper = children.thumbWrapper.map(item => {
      let _item = currentChild.thumbWrapper.filter(arrowItem => arrowItem.key === item.key)[0];
      return React.cloneElement(item, { ..._item.props, ...item.props });
    });
    return currentChild.elemWrapper.concat(children.arrowWrapper, children.thumbWrapper);
  }

  render() {
    const prefixCls = this.props.prefixCls;
    const props = assign({}, this.props);
    props.className = `${props.className} ${prefixCls || ''}`.trim();
    props.style = assign({}, props.style);
    props.style.height = this.state.wrapperHeight + this.state.thumbHeight + 'px';
    if (this.children.elemWrapper.length > 1) {
      props.onMouseEnter = this.onMouseEnter;
      props.onMouseLeave = this.onMouseLeave;
      props.onTouchStart = this.onTouchStart;
      props.onMouseDown = this.onTouchStart;
      props.onTouchMove = this.onTouchMove;
      props.onMouseMove = this.onTouchMove;
      props.onTouchEnd = this.onTouchEnd;
      props.onMouseUp = this.onTouchEnd;
    }
    return (React.createElement(this.props.component, props, this.state.children));
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
  ease: PropTypes.string,
  autoPlay: PropTypes.bool,
  autoPlaySpeed: PropTypes.number,
  onChange: PropTypes.func,
  thumbFloat: PropTypes.bool,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  bgParallaxAll: PropTypes.object,
};
BannerAnim.defaultProps = {
  component: 'div',
  className: 'banner-anim',
  initShow: 0,
  duration: 450,
  ease: 'easeInOutQuad',
  arrow: true,
  thumb: true,
  thumbFloat: true,
  autoPlaySpeed: 5000,
  onChange: ()=> {
  },
  onMouseEnter: ()=> {
  },
  onMouseLeave: ()=> {
  },
};
BannerAnim.Arrow = Arrow;
BannerAnim.Element = Element;
BannerAnim.Thumb = Thumb;
BannerAnim.animType = animType;
BannerAnim.setAnimCompToTagComp = setAnimCompToTagComp;
export default BannerAnim;
