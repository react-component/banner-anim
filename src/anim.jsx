import React, { cloneElement } from 'react';
import { toArrayChildren, switchChildren } from './utils';

export default {
  across(elem, type, direction, animData, elemOffset, leaveChildHide) {
    let _x;
    const props = { ...elem.props };
    let children = props.children;
    if (type === 'enter') {
      _x = direction === 'next' ? '100%' : '-100%';
    } else {
      // 时间轴不同，导致中间有空隙， 等修复 twee-one,先加delay
      _x = direction === 'next' ? '-100%' : '100%';
      children = toArrayChildren(children).map(switchChildren.bind(this, leaveChildHide));
    }
    return cloneElement(elem, {
      animation: {
        ...animData,
        x: _x,
        type: type === 'enter' ? 'from' : 'to',
      },
    }, children);
  },
  vertical(elem, type, direction, animData, elemOffset, leaveChildHide) {
    let _y;
    const props = { ...elem.props };
    let children = props.children;
    if (type === 'enter') {
      _y = direction === 'next' ? '-100%' : '100%';
    } else {
      // 时间轴不同，导致中间有空隙， 等修复 twee-one,先加delay
      _y = direction === 'next' ? '100%' : '-100%';
      children = toArrayChildren(children).map(switchChildren.bind(this, leaveChildHide));
    }
    return cloneElement(elem, {
      ...props,
      animation: {
        ...animData,
        y: _y,
        type: type === 'enter' ? 'from' : 'to',
      },
    }, children);
  },
  acrossOverlay(elem, type, direction, animData, elemOffset, leaveChildHide) {
    let _x;
    const props = { ...elem.props };
    let children = props.children;
    if (type === 'enter') {
      _x = direction === 'next' ? '100%' : '-100%';
    } else {
      _x = direction === 'next' ? '-20%' : '20%';
      children = toArrayChildren(children).map(switchChildren.bind(this, leaveChildHide));
    }
    return cloneElement(elem, {
      ...props,
      animation: {
        ...animData,
        x: _x,
        type: type === 'enter' ? 'from' : 'to',
      },
    }, children);
  },
  verticalOverlay(elem, type, direction, animData, elemOffset, leaveChildHide) {
    let _y;
    const props = { ...elem.props };
    let children = props.children;
    if (type === 'enter') {
      _y = direction === 'next' ? '-100%' : '100%';
    } else {
      _y = direction === 'next' ? '20%' : '-20%';
      children = toArrayChildren(children).map(switchChildren.bind(this, leaveChildHide));
    }
    return cloneElement(elem, {
      ...props,
      animation: {
        ...animData,
        y: _y,
        type: type === 'enter' ? 'from' : 'to',
      },
    }, children);
  },
  gridBar(elem, type, direction, animData, elemOffset, leaveChildHide, ratio, paused) {
    const props = { ...elem.props };
    const animChild = [];
    const gridNum = 10;
    const girdSize = 100 / gridNum;

    let _y;
    const children = props.children;
    if (type === 'enter') {
      _y = direction === 'next' ? '-100%' : '100%';
    } else {
      _y = direction === 'next' ? '100%' : '-100%';
    }
    const moment = ratio * (animData.duration + animData.delay + gridNum * 50 - (type === 'enter' ? 50 : 0)) || 0;
    for (let i = 0; i < gridNum; i++) {
      const style = { ...props.style };
      style.width = `${girdSize + 0.1}%`;
      style.left = `${i * girdSize}%`;
      style.position = 'absolute';
      style.overflow = 'hidden';
      const _style = { ...props.style };
      _style.width = `${elemOffset.width}px`;
      _style.height = `${elemOffset.height}px`;
      _style.float = 'left';
      _style.position = 'relative';
      _style.left = `${-i * girdSize / 100 * elemOffset.width}px`;
      _style.overflow = 'hidden';
      const animProps = { ...props };
      animProps.style = _style;
      const delay = (direction === 'next' ? i : gridNum - i) * 50 + (type === 'enter' ? 0 : 50) + (animData.delay || 0);
      animProps.animation = {
        ...animData,
        y: _y,
        type: type === 'enter' ? 'from' : 'to',
        key: type,
        direction,
        delay,
        i,
        onComplete: i === (direction === 'next' ? gridNum - 1 : 0) ?
          animData.onComplete : null,
      };
      animProps.paused = paused;
      animProps.moment = moment;
      const mask = (<div style={style} key={i}>
        {cloneElement(elem, animProps, children)}
      </div>);
      animChild.push(mask);
    }
    const animSlot = (<div style={{ width: '100%', position: 'absolute', top: 0 }}>
      {animChild}
    </div>);
    const _props = { ...elem.props };
    _props.children = animSlot;
    return cloneElement(elem, { ..._props, animation: { x: 0, y: 0, type: 'set' } });
  },
  grid(elem, type, direction, animData, elemOffset, leaveChildHide, ratio, paused) {
    const props = { ...elem.props };
    const animChild = [];
    const gridNum = 10;
    const gridWidth = elemOffset.width / gridNum;
    const gridNumH = Math.ceil(elemOffset.height / gridWidth);
    const _delay = (gridNum - 1) * 50 + (gridNumH - 1) * 50;
    if (type === 'leave') {
      props.animation = {
        ...animData,
        duration: _delay + animData.duration,
      };
      props.moment = ((animData.delay || 0) + _delay + animData.duration) * ratio || 0;
      props.paused = paused;
      return React.cloneElement(elem, props);
    }
    const moment = ratio * (animData.duration + animData.delay + _delay) || 0;
    for (let i = 0; i < gridNum * gridNumH; i++) {
      // mask样式
      const style = { ...props.style };
      style.position = 'absolute';
      style.overflow = 'hidden';
      style.width = `${gridWidth + 1}px`;
      style.height = `${gridWidth + 1}px`;
      style.left = i % gridNum * gridWidth;
      style.top = Math.floor(i / gridNum) * gridWidth;
      style.opacity = 0;
      // clone 的样式
      const _style = { ...props.style };
      _style.width = `${elemOffset.width}px`;
      _style.height = `${elemOffset.height}px`;
      _style.position = 'relative';
      _style.left = -i % gridNum * gridWidth;
      _style.top = -Math.floor(i / gridNum) * gridWidth;
      _style.overflow = 'hidden';
      props.style = _style;
      let delay = direction === 'next' ? i % gridNum * 50 + Math.floor(i / gridNum) * 50 :
        (gridNum - 1 - i % gridNum) * 50 + (gridNumH - 1 - Math.floor(i / gridNum)) * 50;
      delay += animData.delay || 0;
      const length = direction === 'next' ? gridNum * gridNumH - 1 : 0;
      const animation = {
        ...animData,
        opacity: 1,
        delay,
        onComplete: i === length ? animData.onComplete : null,
      };
      const mask = (
        <elem.type
          style={style}
          key={i}
          paused={paused}
          animation={animation}
          moment={moment}
        >
          {cloneElement(elem, props)}
        </elem.type>);
      animChild.push(mask);
    }
    const _props = { ...elem.props };
    _props.children = animChild;
    return cloneElement(elem, { ..._props, animation: { x: 0, y: 0, type: 'set' } });
  },
};
