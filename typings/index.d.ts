// Type definitions for rc-banner-anim 2.0
// Project: https://github.com/react-component/banner-anim
// Definitions by: jljsj33 <https://github.com/jljsj33>
// Definitions: https://github.com/react-component/banner-anim
import * as React from 'react';

import { IEaseType } from 'rc-tween-one/typings/AnimObject';

import Arrow from './Arrow';
import Thumb from './Thumb';
import Element from './Element';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

type ITypeString = 'across' | 'vertical' | 'acrossOverlay' | 'verticalOverlay' | 'gridBar' | 'grid';

export declare type IType = ITypeString | ITypeString[];

export interface IProps<T> extends Omit<React.HTMLAttributes<T>, 'onChange'> {
  prefixCls?: string;
  arrow?: boolean;
  thumb?: boolean;
  initShow?: number;
  type?: IType;
  duration?: number;
  delay?: number;
  ease?: IEaseType;
  autoPlay?: boolean;
  autoPlaySpeed?: number;
  sync?: boolean;
  dragPlay?: boolean;
  onChange?: (type: string, current: number) => void;
  component?: string | React.ReactNode;
}

export declare function setAnimCompToTagComp(item: React.ReactElement<any>, i?: number): void;
export declare function switchChildren(hideProps: boolean, item: React.ReactElement<any>): void;
export declare const animType: {};

export default class RcBannerAnim<T> extends React.Component<IProps<T>> {
  static Arrow: typeof Arrow;
  static Thumb: typeof Thumb;
  static Element: typeof Element;
  static setAnimCompToTagComp: typeof setAnimCompToTagComp;
  static animType: typeof animType;
  static switchChildren: typeof switchChildren;
}

export {
  Arrow,
  Thumb,
  Element,
};

