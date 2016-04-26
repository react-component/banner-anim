import React from 'react';
import TweenOne from 'rc-tween-one';
import assign from 'object-assign';

export function toArrayChildren(children) {
  const ret = [];
  React.Children.forEach(children, c=> {
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
      || props.name === 'QueueAnim'
      || props.name === 'TweenOne'
      || props.name === 'Animate'
    )) {
    // queueAnim or tweeOne or animate;

    const style = assign({}, props.style);
    style.position = 'relative';
    props.style = style;
    return React.createElement(props.component, props);
  }
  return React.cloneElement(item, props, item.props.children);
}
setAnimCompToTagComp.propTypes = {
  key: React.PropTypes.string,
  style: React.PropTypes.object,
  component: React.PropTypes.any,
};
