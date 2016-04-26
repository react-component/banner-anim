import React, { Component, PropTypes } from 'react';

class Arrow extends Component {
  constructor() {
    super(...arguments);
    [
      'onClick',
    ].forEach((method) => this[method] = this[method].bind(this));
  }

  onClick() {
    this.props[this.props.type]();
  }

  render() {
    let className = this.props.className;
    const defaultClass = `${className}-default`;
    className = `${className} ${this.props.prefixCls || ''}`.trim();
    className = !this.props.default ? className : `${className} ${defaultClass}`.trim();
    className = `${className} ${this.props.type}`;
    return (<div
      className={className}
      onClick={this.onClick}
    >
      {this.props.children}
    </div>);
  }
}

Arrow.propTypes = {
  children: PropTypes.any,
  style: PropTypes.object,
  className: PropTypes.string,
  prefixCls: PropTypes.string,
  component: PropTypes.any,
  type: PropTypes.string,
  default: PropTypes.bool,
  next: PropTypes.func,
  prev: PropTypes.func,
};
Arrow.defaultProps = {
  component: 'div',
  className: 'banner-anim-arrow',
};

export default Arrow;
