// use jsx to render html, do not modify simple.html

import BannerAnim from 'rc-banner-anim';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.less';
import './assets/thumb.less';
import '../assets/index.less';

const { Element, Thumb } = BannerAnim;
const BgElement = Element.BgElement;
class Demo extends React.Component {
  constructor() {
    super(...arguments);
    this.imgArray = [
      'https://os.alipayobjects.com/rmsportal/IhCNTqPpLeTNnwr.jpg',
      'https://os.alipayobjects.com/rmsportal/uaQVvDrCwryVlbb.jpg',
    ];
    this.state = {
      enter: false,
    };
    [
      'onMouseEnter',
      'onMouseLeave',
    ].forEach((method) => this[method] = this[method].bind(this));
  }

  onMouseEnter() {
    this.setState({
      enter: true,
    });
  }

  onMouseLeave() {
    this.setState({
      enter: false,
    });
  }

  render() {
    const thumbChildren = this.imgArray.map((img, i) =>
      <span key={i}><i style={{ backgroundImage: `url(${img})` }} /></span>
    );
    return (
      <BannerAnim onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
        <Element key="aaa"
          prefixCls="banner-user-elem"
        >
          <BgElement
            key="bg"
            className="bg"
            style={{
              backgroundImage: `url(${this.imgArray[0]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <QueueAnim key="1" name="QueueAnim">
            <h1 key="h1">Ant Motion Demo</h1>
            <p key="p">Ant Motion Demo.Ant Motion Demo.Ant Motion Demo.Ant Motion Demo</p>
          </QueueAnim>
          <TweenOne
            animation={{ y: 50, opacity: 0, type: 'from', delay: 200 }}
            key="2"
            name="TweenOne"
          >
            Ant Motion Demo.Ant Motion Demo
          </TweenOne>
        </Element>
        <Element key="bbb"
          prefixCls="banner-user-elem"
        >
          <BgElement
            key="bg"
            className="bg"
            style={{
              backgroundImage: `url(${this.imgArray[1]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <QueueAnim key="1" name="QueueAnim">
            <h1 key="h1">Ant Motion Demo</h1>
            <p key="p">Ant Motion Demo.Ant Motion Demo.Ant Motion Demo.Ant Motion Demo</p>
          </QueueAnim>
          <TweenOne
            animation={{ y: 50, opacity: 0, type: 'from', delay: 200 }}
            key="2"
            name="TweenOne"
          >
            Ant Motion Demo.Ant Motion Demo
          </TweenOne>
        </Element>
        <Thumb prefixCls="user-thumb" key="thumb" component={TweenOne}
          animation={{ bottom: this.state.enter ? 0 : -70 }}
        >
          {thumbChildren}
        </Thumb>
      </BannerAnim>
    );
  }
}
ReactDOM.render(<Demo />, document.getElementById('__react-content'));
