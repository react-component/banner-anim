import React, { cloneElement, createElement } from 'react';
import assign from 'object-assign';
import TweenOne from 'rc-tween-one';
import { toArrayChildren } from './utils';

const setAnimPaused = (item, i)=> {
  const props = assign({}, item.props);
  props.key = item.key || i;
  // 压缩后名称不一样了。
  const propTypes = item.type.propTypes;
  if (propTypes && (propTypes.animConfig && propTypes.animatingClassName && propTypes.leaveReverse &&
      propTypes.delay && propTypes.ease && propTypes.interval && propTypes.duration
      || item.type === TweenOne
      || propTypes.showProp && propTypes.exclusive && propTypes.transitionName &&
      propTypes.transitionAppear && propTypes.transitionEnter && propTypes.transitionLeave &&
      propTypes.onEnd && propTypes.animation
    )) {
    // queueAnim or tweeOne or animate;
    const style = assign({}, props.style);
    style.position = 'relative';
    props.style = style;
    return React.createElement(props.component, props);
  }
  return cloneElement(item, props, item.props.children);
};

export default {
  move(elem, type, direction, animData){
    let _x;
    const props = assign({}, elem.props);
    let children = props.children;
    if (type === 'enter') {
      _x = direction === 'next' ? '100%' : '-100%';
    } else {
      _x = direction === 'next' ? '-80%' : '80%';
      children = toArrayChildren(children).map(setAnimPaused);
    }
    return cloneElement(elem, {
      ...props,
      animation: {
        ...animData,
        x: _x,
        type: type === 'enter' ? 'from' : 'to',
      }
    }, children);
  },
  moveOverlay(elem, type, direction, animData){
    let _x;
    const props = assign({}, elem.props);
    let children = props.children;
    if (type === 'enter') {
      _x = direction === 'next' ? '100%' : '-100%';
    } else {
      _x = direction === 'next' ? '-10%' : '10%';
      children = toArrayChildren(children).map(setAnimPaused);
    }
    return cloneElement(elem, {
      ...props,
      animation: {
        ...animData,
        x: _x,
        type: type === 'enter' ? 'from' : 'to',
      }
    }, children);
  },
  grid(elem, type, direction, animData, width){
    const props = assign({}, elem.props);
    const animChild = [];
    const girdNum = 10;
    const girdSize = 100 / girdNum;
    let _y;
    let children = props.children;
    if (type === 'enter') {
      _y = direction === 'next' ? '-100%' : '100%';
    } else {
      _y = direction === 'next' ? '60%' : '-60%';
      children = toArrayChildren(children).map(setAnimPaused);
    }
    for (let i = 0; i < girdNum; i++) {
      const style = assign({}, props.style);
      style.width = `${girdSize}%`;
      style.left = `${i * girdSize}%`;
      style.position = 'absolute';
      style.overflow = 'hidden';
      const _style = assign({}, props.style);
      _style.width = `${width}px`;
      _style.float = 'left';
      _style.position = 'relative';
      _style.left = `${-i * girdSize / 100 * width}px`;
      props.style = _style;
      props.animation = {
        ...animData,
        y: _y,
        type: type === 'enter' ? 'from' : 'to',
        delay: i * 50 + (type === 'enter' ? 0 : 100),
        onComplete: i === girdNum - 1 ? animData.onComplete : null,
      };

      const mask = <div style={style} key={i}>
        {cloneElement(elem, props, children)}
      </div>;
      animChild.push(mask);
    }
    const animSlot = <div style={{ width: '100%', position: 'absolute', top: 0 }}>
      {animChild}
    </div>;
    const _props = assign({}, elem.props);
    _props.children = animSlot;
    return cloneElement(elem, _props);
  }
};
