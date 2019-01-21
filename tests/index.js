import 'core-js/es6/map';
import 'core-js/es6/set';
import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import expect from 'expect.js';
import BannerAnim from 'rc-banner-anim';
import TestUtils from 'react-dom/test-utils';
import '../assets/index.less';
import '../examples/assets/index.less';

const { Element, Arrow, Thumb } = BannerAnim;
const BgElement = Element.BgElement;
describe('rc-banner-anim', () => {
  let div;

  function createBannerAnimInstance(props = {}) {
    class BannerAnimExample extends React.PureComponent {
      static propTypes = {
        showArrowAndThumb: PropTypes.bool,
      }
      render() {
        const { showArrowAndThumb, ...cProps } = this.props;
        return (
          <BannerAnim {...cProps}>
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
            {showArrowAndThumb && [
              <Arrow arrowType="prev" key="prev">left</Arrow>,
              <Arrow arrowType="next" key="next">next</Arrow>,
              <Thumb key="thumb">
                <div key="0" />
                <div key="1" />
              </Thumb>
            ]}
          </BannerAnim>
        );
      }
    }
    return ReactDom.render(<BannerAnimExample {...props} />, div);
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
    const instance = createBannerAnimInstance({
      type: 'gridBar',
    });
    const children = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div');
    const childrenSpan = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'span');
    // banner-anim elem bg prev next thumb 6个；
    expect(children.length).to.be(8);
    // test text 两个点是 span
    expect(childrenSpan.length).to.be(3);
  });

  it('should render arrow and thubm', () => {
    const instance = createBannerAnimInstance({
      type: 'gird',
      showArrowAndThumb: true,
    });
    const children = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div');
    expect(children.length).to.be(10);
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
      type: 'vertical',
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
