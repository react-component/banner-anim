import React, { cloneElement } from 'react';
import assign from 'object-assign';
import { toArrayChildren, setAnimCompToTagComp } from './utils';
import ticker from 'rc-tween-one/lib/ticker';

export default {
  across(elem, type, direction, animData) {
    let _x;
    const props = assign({}, elem.props);
    let children = props.children;
    if (type === 'enter') {
      _x = direction === 'next' ? '100%' : '-100%';
    } else {
      // 时间轴不同，导致中间有空隙， 等修复 twee-one,先加delay
      _x = direction === 'next' ? '-100%' : '100%';
      children = toArrayChildren(children).map(setAnimCompToTagComp);
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
  vertical(elem, type, direction, animData) {
    let _y;
    const props = assign({}, elem.props);
    let children = props.children;
    if (type === 'enter') {
      _y = direction === 'next' ? '-100%' : '100%';
    } else {
      // 时间轴不同，导致中间有空隙， 等修复 twee-one,先加delay
      _y = direction === 'next' ? '100%' : '-100%';
      children = toArrayChildren(children).map(setAnimCompToTagComp);
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
  acrossOverlay(elem, type, direction, animData) {
    let _x;
    const props = assign({}, elem.props);
    let children = props.children;
    if (type === 'enter') {
      _x = direction === 'next' ? '100%' : '-100%';
    } else {
      _x = direction === 'next' ? '-20%' : '20%';
      children = toArrayChildren(children).map(setAnimCompToTagComp);
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
  verticalOverlay(elem, type, direction, animData) {
    let _y;
    const props = assign({}, elem.props);
    let children = props.children;
    if (type === 'enter') {
      _y = direction === 'next' ? '-100%' : '100%';
    } else {
      _y = direction === 'next' ? '20%' : '-20%';
      children = toArrayChildren(children).map(setAnimCompToTagComp);
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
  gridBar(elem, type, direction, animData, elemOffset) {
    const props = assign({}, elem.props);
    const animChild = [];
    const girdNum = 10;
    const girdSize = 100 / girdNum;

    let _y;
    let children = props.children;
    if (type === 'enter') {
      _y = direction === 'next' ? '-100%' : '100%';
    } else {
      _y = direction === 'next' ? '100%' : '-100%';
      children = toArrayChildren(children).map(setAnimCompToTagComp);
    }
    for (let i = 0; i < girdNum; i++) {
      const style = assign({}, props.style);
      style.width = `${girdSize}%`;
      style.left = `${i * girdSize + 0.01}%`;
      style.position = 'absolute';
      style.overflow = 'hidden';
      const _style = assign({}, props.style);
      _style.width = `${elemOffset.width}px`;
      _style.float = 'left';
      _style.position = 'relative';
      _style.left = `${-i * girdSize / 100 * elemOffset.width}px`;
      props.style = _style;
      props.animation = {
        ...animData,
        y: _y,
        type: type === 'enter' ? 'from' : 'to',
        delay: i * 50 + (type === 'enter' ? 0 : 50),
        onComplete: i === girdNum - 1 ? animData.onComplete : null,
      };

      const mask = (<div style={style} key={i}>
        {cloneElement(elem, props, children)}
      </div>);
      animChild.push(mask);
    }
    const animSlot = (<div style={{ width: '100%', position: 'absolute', top: 0 }}>
      {animChild}
    </div>);
    const _props = assign({}, elem.props);
    _props.children = animSlot;
    return cloneElement(elem, _props);
  },
  grid(elem, type, direction, animData, elemOffset) {
    const props = assign({}, elem.props);
    const animChild = [];
    const gridNum = 10;
    const gridWidth = elemOffset.width / gridNum;
    const gridNumH = Math.ceil(elemOffset.height / gridWidth);
    if (type === 'leave') {
      const _delay = (gridNum * gridNumH - 1) % gridNum * 50 +
        Math.floor((gridNum * gridNumH - 1) / gridNum) * 50;
      ticker.timeout(() => {
        animData.onComplete();
      }, _delay + animData.duration);
      props.children = toArrayChildren(props.children).map(setAnimCompToTagComp);
      return React.cloneElement(elem, props);
    }
    for (let i = 0; i < gridNum * gridNumH; i++) {
      // mask样式
      const style = assign({}, props.style);
      style.position = 'absolute';
      style.overflow = 'hidden';
      style.width = `${gridWidth + 1}px`;
      style.height = `${gridWidth + 1}px`;
      style.left = i % gridNum * gridWidth;
      style.top = Math.floor(i / gridNum) * gridWidth;
      // clone 的样式
      const _style = assign({}, props.style);
      _style.width = `${elemOffset.width}px`;
      _style.position = 'relative';
      _style.left = -i % gridNum * gridWidth;
      _style.top = -Math.floor(i / gridNum) * gridWidth;
      props.style = _style;
      const delay = direction === 'next' ? i % gridNum * 50 + Math.floor(i / gridNum) * 50 :
      (gridNum - i % gridNum) * 50 + (gridNumH - Math.floor(i / gridNum)) * 50;
      const length = direction === 'next' ? gridNum * gridNumH - 1 : 0;
      const animation = {
        ...animData,
        opacity: 0,
        type: 'from',
        delay,
        onComplete: i === length ? animData.onComplete : null,
      };
      const mask = (<elem.type style={style} key={ i } animation={animation}>
        { cloneElement(elem, props) }
      </elem.type>);
      animChild.push(mask);
    }
    const _props = assign({}, elem.props);
    _props.children = animChild;
    return cloneElement(elem, _props);
  },
};
