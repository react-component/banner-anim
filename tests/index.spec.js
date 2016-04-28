import React from 'react';
import ReactDom from 'react-dom';
import expect from 'expect.js';
import BannerAnim from '../index';
import TestUtils from 'react-addons-test-utils';

const { Element } = BannerAnim;

describe('rc-banner-anim', function() {
  let div;

  function createBannerAnimInstance(props = {}) {
    class BannerAnimExample extends React.Component {
      constructor() {
        super(...arguments);
      }

      render() {
        return (
          <BannerAnim { ...props }>
            <Element img="https://os.alipayobjects.com/rmsportal/IhCNTqPpLeTNnwr.jpg" key="a" id="a">
              <span>test text</span>
            </Element>
            <Element img="https://os.alipayobjects.com/rmsportal/uaQVvDrCwryVlbb.jpg" key="b" id="b">
              <span>test text</span>
            </Element>
          </BannerAnim>
        );
      }
    }

    return ReactDom.render(<BannerAnimExample />, div);
  }

  beforeEach(function() {
    div = document.createElement('div');
    document.body.appendChild(div);
  });

  afterEach(function() {
    try {
      ReactDom.unmountComponentAtNode(div);
      document.body.removeChild(div);
    } catch (e) {
      console.log(e);
    }
  });

  it('should render children', function() {
    const instance = createBannerAnimInstance();
    const children = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div');
    const childrenSpan = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'span');
    // banner-anim elem bg prev next thumb 6个；
    expect(children.length).to.be(6);
    // test text 两个点是 span
    expect(childrenSpan.length).to.be(3);
  });

  it('banner animation thumbFloat', function() {
    const instance = createBannerAnimInstance({
      thumbFloat: false,
      type: 'across',
    });
    const children = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[0];
    expect(children.getBoundingClientRect().height).to.be(140);
  });

  it('banner animation initShow', function() {
    const instance = createBannerAnimInstance({
      initShow: 1,
      type: 'across',
    });
    const children = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'banner-anim-elem')[0];
    expect(children.id).to.be('b');
  });

  it('banner animation autoplay', function(done) {
    const instance = createBannerAnimInstance({
      autoPlay: true,
      autoPlaySpeed: 1000,
      type: 'across',
    });
    let children = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'banner-anim-elem')[0];
    expect(children.id).to.be('a');
    setTimeout(()=> {
      children = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'banner-anim-elem')[0];
      expect(children.id).to.be('b');
      done();
    }, 1650);
  });
});
