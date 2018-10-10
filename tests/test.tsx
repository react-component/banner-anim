import * as React from 'react';

import BannerAnim, { Element, Arrow, Thumb, animType, switchChildren, setAnimCompToTagComp } from '../typings';
/*
BannerAnim.switchChildren;
BannerAnim.setAnimCompToTagComp;
BannerAnim.animType;
*/

class Demo extends React.PureComponent {
  render() {
    return (
      <BannerAnim>
        <Element sync leaveChildHide>
          <Element.BgElement scrollParallax={{ x: 100 }}></Element.BgElement>
          <div>test</div>
        </Element>
        <Arrow arrowType="next">text</Arrow>
        <Arrow arrowType="prev">text</Arrow>
        <Thumb><div></div></Thumb>
      </BannerAnim>
    );
  }
}
