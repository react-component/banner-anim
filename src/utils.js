import React from 'react';
import PropTypes from 'prop-types';

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
  const itemProps = item.props;
  const props = {};
  props.key = item.key || i;
  // dom global attributes
  const domAttrArray = [
    'accesskey', 'classname', 'contenteditable', 'contextmenu', 'dir', 'draggable',
    'dropzone', 'hidden', 'id', 'lang', 'spellcheck', 'style', 'tabindex', 'title',
  ];
  Object.keys(itemProps).forEach(key => {
    if (domAttrArray.indexOf(key.toLocaleLowerCase()) >= 0 || key.match('data-')) {
      props[key] = itemProps[key];
    }
  });
  return React.createElement(itemProps.component, props, itemProps.children);
}
setAnimCompToTagComp.propTypes = {
  key: PropTypes.string,
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
  if (item.type.isTweenOne) {
    return React.cloneElement(item, { reverse: true });
  }
  return React.cloneElement(item, item.props, null);
}
