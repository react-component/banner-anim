import * as React from 'react';

import BannerAnim, { animType, Arrow, Element, setAnimCompToTagComp, switchChildren, Thumb } from '../typings';
/*
BannerAnim.switchChildren;
BannerAnim.setAnimCompToTagComp;
BannerAnim.animType;
*/

function Demo() {
  return (
    <BannerAnim>
      <Element sync={true} leaveChildHide={true}>
        <Element.BgElement scrollParallax={{ x: 100 }} />
        <div>test</div>
      </Element>
      <Arrow arrowType="next">text</Arrow>
      <Arrow arrowType="prev">text</Arrow>
      <Thumb><div/></Thumb>
    </BannerAnim>
  );
}
