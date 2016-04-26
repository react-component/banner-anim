import React, { Component, PropTypes } from 'react';
import assign from 'object-assign';

class Arrow extends Component {
  constructor() {
    super(...arguments);
    [
      'onClick',
    ].forEach((method) => this[method] = this[method].bind(this));
  }

  onClick() {
    this.props[this.props.arrowType]();
  }

  render() {
    let className = this.props.className;
    const defaultClass = `${className}-default`;
    className = `${className} ${this.props.prefixCls || ''}`.trim();
    className = !this.props.default ? className : `${className} ${defaultClass}`.trim();
    className = `${className} ${this.props.arrowType}`;
    const props = assign({}, this.props);
    delete props.component;
    props.className = className;
    props.onClick = this.onClick;
    return React.createElement(this.props.component, props, this.props.children);
  }
}

Arrow.propTypes = {
  children: PropTypes.any,
  style: PropTypes.object,
  className: PropTypes.string,
  prefixCls: PropTypes.string,
  component: PropTypes.any,
  arrowType: PropTypes.string,
  default: PropTypes.bool,
  next: PropTypes.func,
  prev: PropTypes.func,
};
Arrow.defaultProps = {
  component: 'div',
  className: 'banner-anim-arrow',
};

export default Arrow;
