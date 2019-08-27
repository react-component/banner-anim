// export this package's api
import { polyfill } from 'react-lifecycles-compat';
import BannerAnim from './BannerAnim';
import Arrow from './Arrow';
import Element from './Element';
import Thumb from './Thumb';
import animType from './anim';
import { setAnimCompToTagComp, switchChildren } from './utils';

BannerAnim.Arrow = Arrow;
BannerAnim.Element = Element;
BannerAnim.Thumb = Thumb;
BannerAnim.animType = animType;
BannerAnim.setAnimCompToTagComp = setAnimCompToTagComp;
BannerAnim.switchChildren = switchChildren;

export default polyfill(BannerAnim);

export {
  Arrow,
  Element,
  Thumb,
  animType,
  setAnimCompToTagComp,
  switchChildren,
}
