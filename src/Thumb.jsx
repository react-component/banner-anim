import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toArrayChildren } from './utils';

class Thumb extends Component {
  getDefaultThumb = () => {
    const children = [];
    for (let i = 0; i < this.props.length; i++) {
      children.push(<span key={i} />);
    }
    return children;
  }

  render() {
    const { 
      length, 
      thumbClick,
      active,
      defaultBool,
      component,
      componentProps,
      prefixCls,
      children: propsChildren,
      ...props
    } = this.props;
    let className = 'banner-anim-thumb';
    const defaultClass = `${className}-default`;
    className = `${className} ${prefixCls || ''}`.trim();
    className = !defaultBool ? className : `${className} ${defaultClass}`.trim();
    const children = defaultBool ? this.getDefaultThumb() : propsChildren;
    if (length && toArrayChildren(children).length !== length) {
      console.warn('The thumbnail length and the images length different.'); // eslint-disable-line
    }
    const childToRender = toArrayChildren(children).map((item, i) => {
      const itemProps = { ...item.props };
      itemProps.onClick = (e) => {
        if (e.stopPropagation) {
          e.stopPropagation();
        }
        thumbClick(i);
      };
      itemProps.className = `${itemProps.className || ''} ${active === i ? 'active' : ''}`
        .trim();
      return React.cloneElement(item, itemProps);
    });
    const $props = { ...props, ...componentProps, className };

    return React.createElement(component,
      $props,
      childToRender
    );
  }
}

Thumb.propTypes = {
  children: PropTypes.any,
  style: PropTypes.object,
  prefixCls: PropTypes.string,
  component: PropTypes.any,
  thumbClick: PropTypes.func,
  defaultBool: PropTypes.bool,
  length: PropTypes.number,
  active: PropTypes.number,
  componentProps: PropTypes.object,
};
Thumb.defaultProps = {
  component: 'div',
  componentProps: {},
  thumbClick: () => {
  },
};
Thumb.isBannerAnimThumb = true;

export default Thumb;
