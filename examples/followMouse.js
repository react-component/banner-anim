// use jsx to render html, do not modify simple.html

import BannerAnim from 'rc-banner-anim';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.less';
import '../assets/index.less';

const { Element } = BannerAnim;
class Demo extends React.Component {
  render() {
    return (
      <BannerAnim type="across">
        <Element key="aaa"
          prefixCls="banner-user-elem"
          bg="https://os.alipayobjects.com/rmsportal/IhCNTqPpLeTNnwr.jpg"
          bgPrefixCls="banner-user-bg"
          name="1"
          followParallax={{
            ease: 'easeInOutCirc',
            minMove: 0.1,
            delay: 1000,
            data: [
              { key: 'bgElem', scale: 0.03, bgPosition: '50%', type: ['backgroundPositionX'] },
              { key: 'queue', scale: 0.05, type: 'x' },
              { key: 'text', scale: -0.03, type: 'x' },
            ],
          }}
        >
          <QueueAnim key="queue">
            <h1 key="h1">Ant Motion Demo</h1>
            <p key="p">Ant Motion Demo.Ant Motion Demo.Ant Motion Demo.Ant Motion Demo</p>
          </QueueAnim>
          <TweenOne animation={{ y: 50, opacity: 0, type: 'from' }} key="text">
            Ant Motion Demo.Ant MotionDemo
          </TweenOne>
        </Element>
        <Element key="bbb"
          prefixCls="banner-user-elem"
          bg="https://os.alipayobjects.com/rmsportal/uaQVvDrCwryVlbb.jpg"
        >
          <QueueAnim>
            <h1 key="h1">Ant Motion Demo</h1>
            <p key="p">Ant Motion Demo.Ant Motion Demo.Ant Motion Demo.Ant Motion Demo</p>
          </QueueAnim>
          <TweenOne animation={{ y: 50, opacity: 0, type: 'from' }}>Ant Motion Demo.Ant Motion
            Demo</TweenOne>
        </Element>
      </BannerAnim>
    );
  }
}
ReactDOM.render(<Demo />, document.getElementById('__react-content'));
