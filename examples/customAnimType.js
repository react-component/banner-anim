// use jsx to render html, do not modify simple.html

import BannerAnim from 'rc-banner-anim';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import React from 'react';
import ReactDOM from 'react-dom';
import assign from 'object-assign';
import './assets/index.less';
const { animType, setAnimCompToTagComp } = BannerAnim;

animType.custom = (elem, type, direction, animData)=> {
  console.log(`custom animType, type:${type}`);
  let _y;
  const props = assign({}, elem.props);
  let children = props.children;
  if (type === 'enter') {
    _y = direction === 'next' ? '-100%' : '100%';
  } else {
    // 时间轴不同，导致中间有空隙， 等修复 twee-one,先加delay
    _y = direction === 'next' ? '50%' : '-50%';
    children = React.Children.toArray(children).map(setAnimCompToTagComp);
  }
  return React.cloneElement(elem, {
    ...props,
    animation: {
      ...animData,
      y: _y,
      delay: type === 'enter' ? 0 : 50,
      type: type === 'enter' ? 'from' : 'to',
    },
  }, children);
};

const { Element } = BannerAnim;
class Demo extends React.Component {
  render() {
    return (
      <BannerAnim type="custom">
        <Element key="aaa"
          prefixCls="banner-user-elem"
          img="https://os.alipayobjects.com/rmsportal/IhCNTqPpLeTNnwr.jpg"
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
          img="https://os.alipayobjects.com/rmsportal/uaQVvDrCwryVlbb.jpg"
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
