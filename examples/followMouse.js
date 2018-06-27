// use jsx to render html, do not modify simple.html

import BannerAnim from 'rc-banner-anim';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.less';
import '../assets/index.less';

const { Element } = BannerAnim;
const BgElement = Element.BgElement;
function Demo() {
  return (
    <BannerAnim type="across">
      <Element key="aaa"
        prefixCls="banner-user-elem"
        followParallax={{
          delay: 1000,
          data: [
            { id: 'bg', value: 20, bgPosition: '50%', type: ['backgroundPositionX'] },
            { id: 'title', value: -20, type: 'x' },
            { id: 'queue', value: 50, type: 'x' },
            { id: 'JText', value: -30, type: 'x' },
          ],
        }}
      >
        <BgElement
          id="bg"
          key="bg"
          className="bg"
          style={{
            backgroundImage: 'url(https://os.alipayobjects.com/rmsportal/IhCNTqPpLeTNnwr.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <QueueAnim id="queue" key="queue">
          <h1 key="h1" id="title">Ant Motion Demo</h1>
          <p key="p">Ant Motion Demo.Ant Motion Demo.Ant Motion Demo.Ant Motion Demo</p>
        </QueueAnim>
        <TweenOne animation={{ y: 50, opacity: 0, type: 'from', delay: 200 }} id="JText">
          Ant Motion Demo.Ant MotionDemo
        </TweenOne>
      </Element>
      <Element key="bbb"
        prefixCls="banner-user-elem"
      >
        <BgElement
          key="bg"
          className="bg"
          style={{
            backgroundImage: 'url(https://os.alipayobjects.com/rmsportal/uaQVvDrCwryVlbb.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <QueueAnim>
          <h1 key="h1">Ant Motion Demo</h1>
          <p key="p">Ant Motion Demo.Ant Motion Demo.Ant Motion Demo.Ant Motion Demo</p>
        </QueueAnim>
        <TweenOne animation={{ y: 50, opacity: 0, type: 'from', delay: 200 }}>
          Ant Motion Demo.Ant Motion Demo
        </TweenOne>
      </Element>
    </BannerAnim>
  );
}

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
