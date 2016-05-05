// use jsx to render html, do not modify simple.html

import BannerAnim from 'rc-banner-anim';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.less';

const { Element } = BannerAnim;
class Demo extends React.Component {
  render() {
    return (
      <BannerAnim type="across" bgParallaxAll={{ y: [0, 300] }}>
        <Element key="aaa"
          prefixCls="banner-user-elem"
          bgType="video/mp4"
          bg="https://os.alipayobjects.com/rmsportal/CoDFvoxaQpTnLOM.mp4"
        >
          <QueueAnim name="QueueAnim">
            <h1 key="h1">Ant Motion Demo</h1>
            <p key="p">Ant Motion Demo.Ant Motion Demo.Ant Motion Demo.Ant Motion Demo</p>
          </QueueAnim>
          <TweenOne animation={{ y: 50, opacity: 0, type: 'from' }} name="TweenOne">Ant Motion Demo.Ant Motion
            Demo</TweenOne>
        </Element>
        <Element key="bbb"
          prefixCls="banner-user-elem"
          bg="https://os.alipayobjects.com/rmsportal/uaQVvDrCwryVlbb.jpg"
        >
          <QueueAnim name="QueueAnim">
            <h1 key="h1">Ant Motion Demo</h1>
            <p key="p">Ant Motion Demo.Ant Motion Demo.Ant Motion Demo.Ant Motion Demo</p>
          </QueueAnim>
          <TweenOne animation={{ y: 50, opacity: 0, type: 'from' }} name="TweenOne">Ant Motion Demo.Ant Motion
            Demo</TweenOne>
        </Element>
      </BannerAnim>
    );
  }
}
ReactDOM.render(<Demo />, document.getElementById('__react-content'));
