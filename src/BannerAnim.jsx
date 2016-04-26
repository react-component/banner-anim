import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import assign from 'object-assign';
import Arrow from './Arrow';
import Element from './Element';
import Thumb from './Thumb';
import TweenOne from 'rc-tween-one';
import requestAnimationFrame from 'raf';
import { toArrayChildren, dataToArray, setAnimCompToTagComp } from './utils';
import animType from './anim';
import '../assets/index.less';

let hidden;
let visibilityChange;
if (typeof document.hidden !== 'undefined') { // Opera 12.10 and Firefox 18 and later support
  hidden = 'hidden';
  visibilityChange = 'visibilitychange';
} else if (typeof document.mozHidden !== 'undefined') {
  hidden = 'mozHidden';
  visibilityChange = 'mozvisibilitychange';
} else if (typeof document.msHidden !== 'undefined') {
  hidden = 'msHidden';
  visibilityChange = 'msvisibilitychange';
} else if (typeof document.webkitHidden !== 'undefined') {
  hidden = 'webkitHidden';
  visibilityChange = 'webkitvisibilitychange';
}


class BannerAnim extends Component {
  constructor() {
    super(...arguments);
    this.tweenBool = false;
    [
      'replaceChildren',
      'setCurrentChildren',
      'next',
      'prev',
      'thumbClick',
      'getElementHeight',
      'saveChildren',
      'getShowChildren',
      'animToCurrentShow',
      'getAnimType',
      'setChildrenPropsDelay',
      'animEndSetState',
      'setThumbActive',
      'onResize',
      'handleVisibilityChange',
      'cancelRequestAnimationFrame',
      'timeoutRaf',
      'onMouseEnter',
      'onMouseLeave',
      'getDomDataSetToState',
    ].forEach((method) => this[method] = this[method].bind(this));
    this.state = {
      wrapperHeight: null,
      elemWidth: null,
      currentShow: this.props.initShow,
      children: this.setCurrentChildren(this.props.children),
    };
    this.children = this.saveChildren(this.state.children);
    this.timeoutRafID = -1;
  }

  componentDidMount() {
    this.getDomDataSetToState();
  }

  componentWillReceiveProps(nextProps) {
    this.children = this.saveChildren(nextProps.children);
    // 在动画时不刷新 children 会在结束后触发；
    if (!this.tweenBool) {
      const children = this.replaceChildren(this.state.children, this.children);
      this.setState({ children });
    }
  }

  componentWillUnmount() {
    if (window.addEventListener) {
      window.removeEventListener('resize', this.onResize);
    } else {
      window.detachEvent('onresize', this.onResize);
    }
    requestAnimationFrame.cancel(this.timeoutRafID);
    this.timeoutRafID = -1;
    document.removeEventListener(visibilityChange, this.handleVisibilityChange);
  }


  onMouseEnter() {
    this.cancelRequestAnimationFrame();
  }

  onMouseLeave() {
    this.startNow = Date.now() - this.moment;
    this.timeoutRafID = requestAnimationFrame(this.timeoutRaf);
  }

  onResize() {
    if (!this.tweenBool) {
      const dom = ReactDOM.findDOMNode(this);
      const elemWidth = dom.getBoundingClientRect().width;
      const currentChild = this.children.elemWrapper[this.state.currentShow];
      const props = assign({}, currentChild.props);
      props.width = elemWidth;
      const thumbWrapper = this.children.thumbWrapper.map(
        this.setThumbActive.bind(this, this.state.currentShow)
      );
      const children = [
        React.cloneElement(currentChild, props),
      ].concat(this.children.arrowWrapper, thumbWrapper);
      this.setState({
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

  setChildrenPropsDelay(children) {
    return toArrayChildren(children).map((item, i) =>
      React.cloneElement(item, { ...item.props, key: i }, null)
    );
  }

  setThumbActive(newShow, item) {
    const props = assign({}, item.props);
    props.active = newShow;
    return React.cloneElement(item, props);
  }

  getElementHeight() {
    let height = 0;
    this.childrenHieght = {};
    Object.keys(this.refs).filter(key =>
      this.children.elemWrapper.filter(item => item.key === key).length
    ).forEach(key => {
      const dom = ReactDOM.findDOMNode(this.refs[key]);
      const _height = dom.getBoundingClientRect().height;
      this.childrenHieght[key] = _height;
      height = height > _height ? height : _height;
    });
    return height;
  }

  getShowChildren(currentShow) {
    const elem = this.children.elemWrapper[currentShow];
    return [elem].concat(this.children.arrowWrapper, this.children.thumbWrapper);
  }

  setCurrentChildren(children) {
    return toArrayChildren(children).map(item => {
      const itemProps = assign({}, item.props);
      const type = item.type;
      if (type === Element) {
        itemProps.ref = item.key;
        return React.cloneElement(item, itemProps);
      }
      return item;
    });
  }

  getDomDataSetToState() {
    const dom = ReactDOM.findDOMNode(this);
    const elemWidth = dom.getBoundingClientRect().width;
    // 获取宽度与定位，setState刷新；
    const wrapperHeight = this.getElementHeight();
    const children = this.getShowChildren(this.state.currentShow);
    this.setState({
      wrapperHeight,
      elemWidth,
      children,
    });

    if (window.addEventListener) {
      window.addEventListener('resize', this.onResize);
    } else {
      window.attachEvent('onresize', this.onResize);
    }

    if (this.props.autoPlay) {
      this.startNow = Date.now();
      this.timeoutRafID = requestAnimationFrame(this.timeoutRaf);
      document.addEventListener(visibilityChange, this.handleVisibilityChange, false);
    }
  }

  animEndSetState(type) {
    if (type === 'enter') {
      this.children = this.saveChildren(this.props.children);
      const thumbWrapper = this.children.thumbWrapper.map(
        this.setThumbActive.bind(this, this.state.currentShow)
      );
      // 动画结束后， 再次刷新时把动画组件转换成组件里的 component 属性
      const _child = this.children.elemWrapper[this.state.currentShow];
      const children = [
        _child,
      ].concat(this.children.arrowWrapper, thumbWrapper);
      this.props.onChange('after', this.state.currentShow);
      this.setState({
        children,
      }, () => {
        this.tweenBool = false;
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
    }
  }

  thumbClick(i) {
    if (!this.tweenBool) {
      this.tweenBool = true;
      if (i !== this.state.currentShow) {
        const type = i > this.state.currentShow ? 'next' : 'prev';
        this.animToCurrentShow(i, type);
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
          itemProps.next = this.next;
          itemProps.prev = this.prev;
          itemProps.callBack = this.animEndSetState;
          itemProps.style = {
            position: 'absolute',
            width: '100%',
          };
          _children.elemWrapper.push(React.cloneElement(item, itemProps));
          break;
        case Arrow:
          itemProps.next = this.next;
          itemProps.prev = this.prev;
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
    if (this.props.arrow && !_children.arrowWrapper.length) {
      _children.arrowWrapper.push(
        <Arrow arrowType="prev" key="arrowPrev" next={this.next} prev={this.prev} default />,
        <Arrow arrowType="next" key="arrowNext" next={this.next} prev={this.prev} default />
      );
    }
    if (this.props.thumb && !_children.thumbWrapper.length) {
      _children.thumbWrapper.push(
        <Thumb length={_children.elemWrapper.length} key="thumb"
          thumbClick={this.thumbClick}
          active={this.props.initShow}
          default
        />);
    }
    return _children;
  }

  animToCurrentShow(newShow, type) {
    const _animType = this.getAnimType(this.props.type);
    const currentChild = toArrayChildren(this.state.children)
      .filter(item => item.type === Element)[0];
    const newChild = this.children.elemWrapper[newShow];
    const currentProps = assign({}, currentChild.props);
    currentProps.type = 'leave';
    currentProps.direction = type;
    currentProps.animType = _animType;
    currentProps.duration = this.props.duration;
    currentProps.ease = this.props.ease;
    currentProps.width = this.state.elemWidth;
    const newProps = assign({}, newChild.props);
    newProps.type = 'enter';
    newProps.direction = type;
    newProps.animType = _animType;
    newProps.duration = this.props.duration;
    newProps.ease = this.props.ease;
    // 挡截 newChild, 动画的时候把子级全部去掉，只留 image
    newProps.children = this.setChildrenPropsDelay(newProps.children);
    newProps.width = this.state.elemWidth;
    this.children.elemWrapper[newShow] = React.cloneElement(newChild, newProps);
    const thumbWrapper = this.children.thumbWrapper.map(this.setThumbActive.bind(this, newShow));
    const children = [
      React.cloneElement(currentChild, currentProps),
      this.children.elemWrapper[newShow],
    ].concat(this.children.arrowWrapper, thumbWrapper);
    this.props.onChange('before', newShow);
    this.setState({
      children,
      currentShow: newShow,
    });
  }

  cancelRequestAnimationFrame() {
    requestAnimationFrame.cancel(this.timeoutRafID);
    this.timeoutRafID = -1;
  }

  timeoutRaf() {
    const now = Date.now();
    this.moment = now - this.startNow;
    if (this.moment >= this.props.autoPlaySpeed) {
      setTimeout(()=> {
        // 跟 tween-one 的 raf 冲突，会闪一下；加 setTimeout 为 raf 彻底结束后再执行。
        this.next();
        this.startNow = Date.now();
        this.timeoutRafID = requestAnimationFrame(this.timeoutRaf);
      });
    } else {
      this.timeoutRafID = requestAnimationFrame(this.timeoutRaf);
    }
  }

  handleVisibilityChange() {
    if (document[hidden] && this.timeoutRafID !== -1) {
      this.cancelRequestAnimationFrame();
      this.rafHide = true;
    } else if (this.timeoutRafID === -1 && this.rafHide) {
      this.startNow = Date.now() - this.moment;
      this.rafID = requestAnimationFrame(this.timeoutRaf);
      this.rafHide = false;
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

  render() {
    const prefixCls = this.props.prefixCls;
    const props = assign({}, this.props);
    props.className = `${props.className} ${prefixCls || ''}`.trim();
    props.style = props.style || {};
    props.style.height = this.state.wrapperHeight + 'px';
    props.onMouseEnter = this.onMouseEnter;
    props.onMouseLeave = this.onMouseLeave;
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
};
BannerAnim.defaultProps = {
  component: 'div',
  className: 'banner-anim',
  initShow: 0,
  duration: 550,
  ease: 'easeInOutQuad',
  arrow: true,
  thumb: true,
  autoPlaySpeed: 5000,
  onChange: ()=> {
  },
};
BannerAnim.Arrow = Arrow;
BannerAnim.Element = Element;
BannerAnim.Thumb = Thumb;
export default BannerAnim;
