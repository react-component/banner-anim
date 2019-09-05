import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Arrow extends Component {
  onClick = (e) => {
    if (e.stopPropagation) {
      e.stopPropagation();
    }
    this.props[this.props.arrowType](e);
  }

  render() {
    const {
      arrowType,
      next,
      prev,
      component,
      componentProps,
      defaultBool,
      prefixCls,
      children,
      ...props
    } = this.props;
    let { className } = this.props;
    const defaultClass = `${className}-default`;
    className = `${className} ${prefixCls || ''}`.trim();
    className = !defaultBool ? className : `${className} ${defaultClass}`.trim();
    className = `${className} ${arrowType}`;
    const $props = {
      ...props,
      ...componentProps,
      className,
      onClick: this.onClick,
    };
    return React.createElement(component, $props, children);
  }
}

Arrow.propTypes = {
  children: PropTypes.any,
  style: PropTypes.object,
  className: PropTypes.string,
  prefixCls: PropTypes.string,
  component: PropTypes.any,
  arrowType: PropTypes.string,
  defaultBool: PropTypes.bool,
  next: PropTypes.func,
  prev: PropTypes.func,
  componentProps: PropTypes.object,
};
Arrow.defaultProps = {
  component: 'div',
  className: 'banner-anim-arrow',
  componentProps: {},
};

Arrow.isBannerAnimArrow = true;

export default Arrow;
