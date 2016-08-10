import React from 'react';
import TweenOne from 'rc-tween-one';

export function toArrayChildren(children) {
  const ret = [];
  React.Children.forEach(children, c => {
    ret.push(c);
  });
  return ret;
}

export function dataToArray(vars) {
  if (!vars && vars !== 0) {
    return [];
  }
  if (Array.isArray(vars)) {
    return vars;
  }
  return [vars];
}

export function setAnimCompToTagComp(item, i) {
  if (!item) {
    return null;
  }
  const props = { ...item.props };
  props.key = item.key || i;
  // 压缩后名称不一样了。
  const propTypes = item.type.propTypes;
  if (propTypes && (propTypes.animConfig &&
      propTypes.animatingClassName && propTypes.leaveReverse &&
      propTypes.delay && propTypes.ease && propTypes.interval && propTypes.duration
      || item.type === TweenOne
      || propTypes.showProp && propTypes.exclusive && propTypes.transitionName &&
      propTypes.transitionAppear && propTypes.transitionEnter && propTypes.transitionLeave &&
      propTypes.onEnd && propTypes.animation
      || props.name === 'QueueAnim'
      || props.name === 'TweenOne'
      || props.name === 'Animate'
    )) {
    // queueAnim or tweeOne or animate;
    const style = { ...props.style };
    style.position = 'relative';
    props.style = style;
    const component = props.component;
    [
      `component`,
      `interval`,
      `duration`,
      `delay`,
      `animConfig`,
      `ease`,
      `leaveReverse`,
      `animatingClassName`,
      `animation`,
      `reverseDelay`,
      `attr`,
      `showProp`,
      `exclusive`,
      `transitionName`,
      `transitionAppear`,
      `transitionEnter`,
      `transitionLeave`,
      `onEnd`,
    ].forEach(key => delete props[key]);
    return React.createElement(component, props);
  }
  return item;
}
setAnimCompToTagComp.propTypes = {
  key: React.PropTypes.string,
  style: React.PropTypes.object,
  component: React.PropTypes.any,
  name: React.PropTypes.string,
};

export function currentScrollTop() {
  const supportPageOffset = window.pageXOffset !== undefined;
  const isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat');
  const isCSS1ScrollTop = isCSS1Compat ?
    document.documentElement.scrollTop : document.body.scrollTop;
  return supportPageOffset ? window.pageYOffset : isCSS1ScrollTop;
}
