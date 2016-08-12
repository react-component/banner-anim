import React from 'react';
import ReactDom from 'react-dom';
import expect from 'expect.js';
import BannerAnim from '../index';
import '../assets/index.less';
import '../examples/assets/index.less';
import TestUtils from 'react-addons-test-utils';

const { Element } = BannerAnim;
const BgElement = Element.BgElement;
describe('rc-banner-anim', () => {
  let div;

  function createBannerAnimInstance(props = {}) {
    class BannerAnimExample extends React.Component {
      constructor() {
        super(...arguments);
      }

      render() {
        return (
          <BannerAnim { ...props }>
            <Element key="a" id="a">
              <BgElement
                key="bgElem"
                className="bg"
                style={{
                  backgroundImage: 'url(https://os.alipayobjects.com/rmsportal/uaQVvDrCwryVlbb.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <span>test text</span>
            </Element>
            <Element key="b" id="b">
              <BgElement
                key="bgElem"
                className="bg"
                style={{
                  backgroundImage: 'url(https://os.alipayobjects.com/rmsportal/IhCNTqPpLeTNnwr.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <span>test text</span>
            </Element>
          </BannerAnim>
        );
      }
    }

    return ReactDom.render(<BannerAnimExample />, div);
  }

  beforeEach(() => {
    div = document.createElement('div');
    document.body.appendChild(div);
  });

  afterEach(() => {
    try {
      ReactDom.unmountComponentAtNode(div);
      document.body.removeChild(div);
    } catch (e) {
      console.log(e); // eslint-disable-line no-console
    }
  });

  it('should render children', () => {
    const instance = createBannerAnimInstance();
    const children = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div');
    const childrenSpan = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'span');
    // banner-anim elem bg prev next thumb 6个；
    expect(children.length).to.be(8);
    // test text 两个点是 span
    expect(childrenSpan.length).to.be(3);
  });

  it('banner animation initShow', () => {
    const instance = createBannerAnimInstance({
      initShow: 1,
      type: 'across',
    });
    const children = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'banner-anim-elem');
    setTimeout(() => {
      expect(children[0].style.display).to.be('none');
      expect(children[1].style.display).to.be('block');
    });
  });

  it('banner animation autoplay', (done) => {
    const instance = createBannerAnimInstance({
      autoPlay: true,
      autoPlaySpeed: 1000,
      type: 'across',
    });
    let children = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'banner-anim-elem');
    expect(children[0].style.display).to.be('block');
    expect(children[1].style.display).to.be('none');
    setTimeout(() => {
      children = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'banner-anim-elem');
      expect(children[0].style.display).to.be('block');
      expect(children[1].style.display).to.be('block');
      done();
    }, 1300);
  });
});
