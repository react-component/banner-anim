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
class Demo extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      delay: 0,
    };
    this.openSlide = false;
  }

  onChange = (e, int) => {
    // 在切换到下一个后把延时改掉。
    if (int === 1 && e === 'after' && !this.openSlide) {
      this.setState({
        delay: 600,
      });
      this.openSlide = true;
    }
  }

  onClick = () => {
    this.refs.banner.slickGoTo(1);
  }

  render() {
    return (
      <div>
        <a onClick={this.onClick}>点击跳到第二块</a>
        <BannerAnim prefixCls="banner-user" type="across"
          onChange={this.onChange}
          duration={1000}
          ease="easeInOutExpo"
          sync
          ref="banner"
        >
          <Element key="aaa"
            prefixCls="banner-user-elem"
            hideProps={{ 2: { reverse: true } }}
          >
            <BgElement
              key="bg"
              className="bg"
              style={{
                backgroundImage: 'url(https://os.alipayobjects.com/rmsportal/IhCNTqPpLeTNnwr.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <QueueAnim key="1" name="QueueAnim" delay={[this.state.delay, 0]}>
              <h1 key="h1">Ant Motion Demo</h1>
              <p key="p">Ant Motion Demo.Ant Motion Demo.Ant Motion Demo.Ant Motion Demo</p>
            </QueueAnim>
            <TweenOne key="2"
              animation={{ y: 50, opacity: 0, type: 'from', delay: this.state.delay + 200 }}
            >
              Ant Motion Demo.Ant Motion Demo
            </TweenOne>
          </Element>
          <Element key="bbb"
            prefixCls="banner-user-elem"
            hideProps={{ 2: { reverse: true } }}
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
            <QueueAnim name="QueueAnim" key="1" delay={[600, 0]}>
              <h1 key="h1">Ant Motion Demo</h1>
              <p key="p">Ant Motion Demo.Ant Motion Demo.Ant Motion Demo.Ant Motion Demo</p>
            </QueueAnim>
            <TweenOne animation={{ y: 50, opacity: 0, type: 'from', delay: 800 }} key="2">
              Ant Motion Demo.Ant Motion Demo
            </TweenOne>
          </Element>
        </BannerAnim>
      </div>
    );
  }
}
ReactDOM.render(<Demo />, document.getElementById('__react-content'));
