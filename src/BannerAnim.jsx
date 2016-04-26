import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import assign from 'object-assign';
import Arrow from './Arrow';
import Element from './Element';
import Thumb from './Thumb';
import TweenOne from 'rc-tween-one';
import { toArrayChildren, dataToArray } from './utils';
import animType from './anim';
import '../assets/index.less';

class BannerAnim extends Component {
  constructor() {
    super(...arguments);
    this.tweenBool = true;
    [
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
    ].forEach((method) => this[method] = this[method].bind(this));
    this.state = {
      wrapperHeight: null,
      elemWidth: null,
      currentShow: this.props.initShow,
      children: this.setCurrentChildren(this.props.children),
    };
    this.saveChildren(this.state.children);
  }

  componentDidMount() {
    const dom = ReactDOM.findDOMNode(this);
    const elemWidth = dom.getBoundingClientRect().width;
    // 获取宽度与定位，setState刷新；
    const wrapperHeight = this.getElementHeight();
    const children = this.getShowChildren(this.state.currentShow);
    window.addEventListener('resize', this.onResize);
    this.setState({
      wrapperHeight,
      elemWidth,
      children,
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize() {
    const dom = ReactDOM.findDOMNode(this);
    const elemWidth = dom.getBoundingClientRect().width;
    const currentChild = this.newChild || this.children.elemWrapper[this.state.currentShow];
    const props = assign({}, currentChild.props);
    props.width = elemWidth;
    const children = [
      React.cloneElement(currentChild, props),
    ].concat(this.children.arrowWrapper, this.children.thumbWrapper);
    this.setState({
      elemWidth,
      children,
    })
  }

  getAnimType(type) {
    const typeArray = type ? dataToArray(type) : Object.keys(animType);
    const random = Math.round(Math.random() * (typeArray.length - 1));
    return animType[typeArray[random]];
  }

  setChildrenPropsDelay(children) {
    return toArrayChildren(children).map((item, i) => {
      const props = assign({}, item.props);
      if (item.type === TweenOne) {
        props.animation.delay = props.animation.delay >= this.props.duration - 50 ?
          props.animation.delay : (props.animation.delay || 0) + this.props.duration - 50;
      } else {
        props.delay = this.props.delay >= this.props.duration - 50 ?
          this.props.delay : (props.delay || 0) + this.props.duration - 50;
      }
      props.key = i;
      return React.cloneElement(item, props);
    });
  }

  setThumbActive(newShow, item) {
    const props = assign({}, item.props);
    props.active = newShow;
    return React.cloneElement(item, props);
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
    // 挡截 newChild, 增加动画延时，与框架动画时间上冲突。导航看不到效果，增加标签上的动画时音作为延时。
    newProps.children = this.setChildrenPropsDelay(newProps.children);
    newProps.width = this.state.elemWidth;
    this.newChild = React.cloneElement(newChild, newProps);

    const thumbWrapper = this.children.thumbWrapper.map(this.setThumbActive.bind(this, newShow));

    const children = [
      React.cloneElement(currentChild, currentProps),
      this.newChild,
    ].concat(this.children.arrowWrapper, thumbWrapper);
    this.setState({
      children,
      currentShow: newShow,
    })
  }

  animEndSetState(type) {
    if (type === 'enter') {
      const thumbWrapper = this.children.thumbWrapper.map(
        this.setThumbActive.bind(this, this.state.currentShow)
      );
      const children = [
        this.newChild,
      ].concat(this.children.arrowWrapper, thumbWrapper);
      this.setState({
        children,
      }, () => {
        this.tweenBool = true;
      });
    }
  }

  next() {
    if (this.tweenBool) {
      this.tweenBool = false;
      let newShow = this.state.currentShow;
      newShow++;
      if (newShow >= this.children.elemWrapper.length) {
        newShow = 0;
      }
      this.animToCurrentShow(newShow, 'next');
    }
  }

  prev() {
    if (this.tweenBool) {
      this.tweenBool = false;
      let newShow = this.state.currentShow;
      newShow--;
      if (newShow < 0) {
        newShow = this.children.elemWrapper.length - 1;
      }
      this.animToCurrentShow(newShow, 'prev');
    }
  }

  thumbClick(i) {
    if (this.tweenBool) {
      this.tweenBool = false;
      if (i !== this.state.currentShow) {
        const type = i > this.state.currentShow ? 'next' : 'prev';
        this.animToCurrentShow(i, type);
      }
    }
  }

  getShowChildren(currentShow) {
    const elem = this.children.elemWrapper[currentShow];
    return [elem].concat(this.children.arrowWrapper, this.children.thumbWrapper);
  }

  saveChildren(children) {
    this.children = {
      elemWrapper: [],
      arrowWrapper: [],
      thumbWrapper: [],
    };
    toArrayChildren(children).forEach((item, i) => {
      switch (item.type) {
        case Element:
          this.children.elemWrapper.push(item);
          break;
        case Arrow:
          this.children.arrowWrapper.push(item);
          break;
        case Thumb:
          this.children.thumbWrapper.push(item);
          break;
        default:
          break
      }
    });
    if (this.props.arrow && !this.children.arrowWrapper.length) {
      this.children.arrowWrapper.push(
        <Arrow type="prev" key="arrowPrev" next={this.next} prev={this.prev} default />,
        <Arrow type="next" key="arrowNext" next={this.next} prev={this.prev} default />
      );
    }
    if (this.props.thumb && !this.children.thumbWrapper.length) {
      this.children.thumbWrapper.push(
        <Thumb length={this.children.elemWrapper.length} key='thumb'
          thumbClick={this.thumbClick}
          active={this.props.initShow}
          default
        />);
    }
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

  setCurrentChildren(children) {
    return toArrayChildren(children).map((item, i) => {
      const itemProps = assign({}, item.props);
      const type = item.type;
      switch (type) {
        case Element:
          itemProps.next = this.next;
          itemProps.prev = this.prev;
          itemProps.callBack = this.animEndSetState;
          itemProps.number = i;
          itemProps.ref = item.key;
          itemProps.style = {
            position: 'absolute',
            width: '100%',
          };
          break;
        case Arrow:
          itemProps.next = this.next;
          itemProps.prev = this.prev;
          break;
        case Thumb:
          itemProps.thumbClick = this.thumbClick;
          break;
        default:
          break;
      }
      return React.cloneElement(item, itemProps);
    });
  }

  render() {
    const prefixCls = this.props.prefixCls;
    const props = assign({}, this.props);
    props.className = `${props.className} ${prefixCls || ''}`.trim();
    props.style = props.style || {};
    props.style.height = this.state.wrapperHeight + 'px';
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

};
BannerAnim.defaultProps = {
  component: 'div',
  className: 'banner-anim',
  initShow: 0,
  duration: 550,
  ease: 'easeInOutQuad',
  arrow: true,
};
BannerAnim.Arrow = Arrow;
BannerAnim.Element = Element;
BannerAnim.Thumb = Thumb;
export default BannerAnim;