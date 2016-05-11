// use jsx to render html, do not modify simple.html

import BannerAnim from 'rc-banner-anim';
import QueueAnim from 'rc-queue-anim';
import TweenOne, { TweenOneGroup } from 'rc-tween-one';
import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.less';
import './assets/arrow.less';

const { Element, Arrow } = BannerAnim;
class Demo extends React.Component {
  constructor() {
    super(...arguments);
    this.imgArray = [
      'https://os.alipayobjects.com/rmsportal/IhCNTqPpLeTNnwr.jpg',
      'https://os.alipayobjects.com/rmsportal/uaQVvDrCwryVlbb.jpg',
    ];
    this.state = {
      intShow: 0,
      prevEnter: false,
      nextEnter: false,
    };
    [
      'onChange',
      'prevEnter',
      'prevLeave',
      'nextEnter',
      'nextLeave',
    ].forEach((method) => this[method] = this[method].bind(this));
  }

  onChange(type, int) {
    if (type === 'before') {
      this.setState({
        intShow: int,
      });
    }
  }

  getNextPrevNumber() {
    let nextInt = this.state.intShow + 1;
    let prevInt = this.state.intShow - 1;
    if (nextInt >= this.imgArray.length) {
      nextInt = 0;
    }
    if (prevInt < 0) {
      prevInt = this.imgArray.length - 1;
    }

    return [prevInt, nextInt];
  }

  prevEnter() {
    this.setState({
      prevEnter: true,
    });
  }

  prevLeave() {
    this.setState({
      prevEnter: false,
    });
  }

  nextEnter() {
    this.setState({
      nextEnter: true,
    });
  }

  nextLeave() {
    this.setState({
      nextEnter: false,
    });
  }

  render() {
    const intArray = this.getNextPrevNumber();
    return (
      <BannerAnim onChange={this.onChange}>
        <Element key="aaa"
          prefixCls="banner-user-elem"
          img={this.imgArray[0]}
        >
          <QueueAnim key="1" name="QueueAnim">
            <h1 key="h1">Ant Motion Demo</h1>
            <p key="p">Ant Motion Demo.Ant Motion Demo.Ant Motion Demo.Ant Motion Demo</p>
          </QueueAnim>
          <TweenOne animation={{ y: 50, opacity: 0, type: 'from' }} key="2" name="TweenOne">Ant Motion Demo.Ant Motion Demo</TweenOne>
        </Element>
        <Element key="bbb"
          prefixCls="banner-user-elem"
          img={this.imgArray[1]}
        >
          <QueueAnim key="1" name="QueueAnim">
            <h1 key="h1">Ant Motion Demo</h1>
            <p key="p">Ant Motion Demo.Ant Motion Demo.Ant Motion Demo.Ant Motion Demo</p>
          </QueueAnim>
          <TweenOne animation={{ y: 50, opacity: 0, type: 'from' }} key="2" name="TweenOne">Ant Motion Demo.Ant Motion Demo</TweenOne>
        </Element>
        <Arrow arrowType="prev" key="prev" prefixCls="user-arrow" component={TweenOne}
          onMouseEnter={this.prevEnter}
          onMouseLeave={this.prevLeave}
          animation={{ left: this.state.prevEnter ? 0 : -120 }}
        >
          <div className="arrow"></div>
          <TweenOneGroup enter={{ opacity: 0, type: 'from' }} leave={{ opacity: 0 }} appear={false} className="img-wrapper" component="ul">
            <li style={{ backgroundImage: `url(${this.imgArray[intArray[0]]})`}} key={intArray[0]} />
          </TweenOneGroup>
        </Arrow>
        <Arrow arrowType="next" key="next" prefixCls="user-arrow" component={TweenOne}
          onMouseEnter={this.nextEnter}
          onMouseLeave={this.nextLeave}
          animation={{ right: this.state.nextEnter ? 0 : -120 }}
        >
          <div className="arrow"></div>
          <TweenOneGroup enter={{ opacity: 0, type: 'from' }} leave={{ opacity: 0 }} appear={false} className="img-wrapper" component="ul">
            <li style={{ backgroundImage: `url(${this.imgArray[intArray[1]]})`}} key={intArray[1]} />
          </TweenOneGroup>
        </Arrow>
      </BannerAnim>
    );
  }
}
ReactDOM.render(<Demo />, document.getElementById('__react-content'));
