// use jsx to render html, do not modify simple.html

import BannerAnim from 'rc-banner-anim';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.less';

const { Element, Arrow, Thumb } = BannerAnim;
class Demo extends React.Component {
  render() {
    return (
      <BannerAnim>
        <Element key="aaa"
          prefixCls="banner-user-elem"
          img="https://os.alipayobjects.com/rmsportal/IhCNTqPpLeTNnwr.jpg"
        >
          <QueueAnim hideProps={{ child: null }}>
            <h1 key="h1">Ant Motion Demo</h1>
            <p key="p">Ant Motion Demo.Ant Motion Demo.Ant Motion Demo.Ant Motion Demo</p>
          </QueueAnim>
          <TweenOne animation={{ y: 50, opacity: 0, type: 'from' }}>Ant Motion Demo.Ant Motion Demo</TweenOne>
        </Element>
        <Element key="bbb"
          prefixCls="banner-user-elem"
          img="https://os.alipayobjects.com/rmsportal/uaQVvDrCwryVlbb.jpg"
        >
          <QueueAnim hideProps={{ child: null }}>
            <h1 key="h1">Ant Motion Demo</h1>
            <p key="p">Ant Motion Demo.Ant Motion Demo.Ant Motion Demo.Ant Motion Demo</p>
          </QueueAnim>
          <TweenOne animation={{ y: 50, opacity: 0, type: 'from' }}>Ant Motion Demo.Ant Motion Demo</TweenOne>
        </Element>
        <Arrow type="prev">
          <img src=""/>
        </Arrow>
        <Arrow type="next"></Arrow>
      </BannerAnim>
    );
  }
}
ReactDOM.render(<Demo />, document.getElementById('__react-content'));
