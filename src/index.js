// export this package's api
import BannerAnim from './BannerAnim';
import arrow from './Arrow';
import element from './Element';
import thumb from './Thumb';
import _animType from './anim';
import { setAnimCompToTagComp as toTagComp, switchChildren as swichChild } from './utils';

BannerAnim.Arrow = arrow;
BannerAnim.Element = element;
BannerAnim.Thumb = thumb;
BannerAnim.animType = _animType;
BannerAnim.setAnimCompToTagComp = toTagComp;
BannerAnim.switchChildren = swichChild;

export default BannerAnim;
export const Arrow = arrow;
export const Element = element;
export const Thumb = thumb;
export const animType = _animType;
export const setAnimCompToTagComp = toTagComp;
export const switchChildren = swichChild;
