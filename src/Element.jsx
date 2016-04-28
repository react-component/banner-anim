import React, { Component, PropTypes } from 'react';
import TweenOne from 'rc-tween-one';

function noop() {
}

class Element extends Component {
  render() {
    const imgElem = this.props.img ?
      <div
        className={`${this.props.className}-background`}
        style={{ backgroundImage: `url(${this.props.img})`}}
        key="imgElem"
      ></div> : null;
    const childrenToRender = (
      <TweenOne style={this.props.style}
        className={`${this.props.className} ${this.props.prefixCls || ''}`.trim()}
        component={this.props.component}
      >
        {imgElem}
        {this.props.children}
      </TweenOne>
    );
    return (this.props.animType ?
      this.props.animType(childrenToRender,
        this.props.type,
        this.props.direction,
        {
          ease: this.props.ease,
          duration: this.props.duration,
          onComplete: this.props.callBack.bind(this, this.props.type),
        },
        this.props.elemOffset
      ) :
      childrenToRender);
  }
}

Element.propTypes = {
  children: PropTypes.any,
  style: PropTypes.object,
  className: PropTypes.string,
  prefixCls: PropTypes.string,
  component: PropTypes.any,
  elemOffset: PropTypes.object,
  type: PropTypes.string,
  animType: PropTypes.func,
  img: PropTypes.string,
  ease: PropTypes.string,
  duration: PropTypes.number,
  direction: PropTypes.string,
  callBack: PropTypes.func,
};
Element.defaultProps = {
  component: 'div',
  className: 'banner-anim-elem',
  callBack: noop,
};

export default Element;
