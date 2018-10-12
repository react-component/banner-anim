import * as React from 'react';
import { IEaseType, IStyleAnimProps } from 'rc-tween-one/typings/AnimObject';
import BgElement from './BgElement';

export interface IDataType {
  key?: string;
  value?: number;
  type?: IStyleAnimProps | IStyleAnimProps[];
  bgPosition?: string;
}

export interface IFollowType {
  delay?: number;
  ease?: IEaseType;
  minMover?: number;
  data: IDataType;
}

export interface IProps<T> extends React.HTMLAttributes<T> {
  leaveChildHide?: boolean;
  sync?: boolean;
  prefixCls?: string;
  followParallax?: IFollowType;
  component?: string | React.ReactNode;
  componentProps?: {};
}

export default class Element<T> extends React.Component<IProps<T>> {
  static BgElement: typeof BgElement;
}
