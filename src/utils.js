import React from 'react';

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
  const type = item.type;
  const propTypes = type.propTypes;
  if (propTypes && (propTypes.showProp && propTypes.exclusive && propTypes.transitionName &&
      propTypes.transitionAppear && propTypes.transitionEnter && propTypes.transitionLeave &&
      propTypes.onEnd && propTypes.animation
    ) || type.isTweenOne || type.isQueueAnim) {
    // queueAnim or tweeOne or animate;
    const style = { ...props.style };
    style.position = 'relative';
    props.style = style;
    const component = props.component;
    [
      // queueAnim
      'component',
      'appear',
      'interval',
      'duration',
      'delay',
      'animConfig',
      'ease',
      'enterForcedRePlay',
      'leaveReverse',
      'animatingClassName',
      // tween-one
      'animation',
      'reverseDelay',
      'attr',
      'paused',
      'reverse',
      'moment',
      'resetStyleBool',
      'updateReStart',
      'willChange',
      'onChange',
      // animate
      'showProp',
      'exclusive',
      'transitionName',
      'transitionAppear',
      'transitionEnter',
      'transitionLeave',
      'onEnd',
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
  return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
}

export function currentScrollLeft() {
  return window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft;
}

export function windowHeight() {
  return window.innerHeight ||
    document.documentElement.clientHeight || document.body.clientHeight;
}

export function switchChildren(hideProps, item) {
  if (!hideProps) {
    return item;
  }
  if (typeof hideProps === 'object' && item.key in hideProps) {
    return React.cloneElement(item, { ...hideProps[item.key] });
  }
  return React.cloneElement(item, item.props, null);
}
