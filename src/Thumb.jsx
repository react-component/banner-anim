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
    let className = 'banner-anim-thumb';
    const defaultClass = `${className}-default`;
    className = `${className} ${this.props.prefixCls || ''}`.trim();
    className = !this.props.default ? className : `${className} ${defaultClass}`.trim();
    const children = this.props.default ? this.getDefaultThumb() : this.props.children;
    if (this.props.length && toArrayChildren(children).length !== this.props.length) {
      console.warn('The thumbnail length and the images length different.'); // eslint-disable-line
    }
    const childToRender = toArrayChildren(children).map((item, i) => {
      const props = { ...item.props };
      props.onClick = (e) => {
        e.stopPropagation();
        this.props.thumbClick(i);
      };
      props.className = `${props.className || ''} ${this.props.active === i ? 'active' : ''}`
        .trim();
      return React.cloneElement(item, props);
    });
    const props = { ...this.props, ...this.props.componentProps };
    ['length', 'thumbClick', 'active', 'default', 'component', 'componentProps', 'prefixCls']
      .forEach(key => delete props[key]);
    props.className = className;
    return React.createElement(this.props.component,
      props,
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
  default: PropTypes.bool,
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
