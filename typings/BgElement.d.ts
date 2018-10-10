import * as React from 'react';
import { IStyleAnimProps } from 'rc-tween-one/typings/AnimObject';

export interface IProps<T> extends React.HTMLAttributes<T> {
  scrollParallax?: IStyleAnimProps;
  videoResize?: boolean;
  component?: string | React.ReactNode;
  componentProps?: {};
}

export default class BgElement<T> extends React.Component<IProps<T>> {

}