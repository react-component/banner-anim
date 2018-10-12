import * as React from 'react';

export interface IProps<T> extends React.HTMLAttributes<T> {
  prefixCls?: string;
  arrowType: 'prev' | 'next';
  component?: string | React.ReactNode;
  componentProps?: {};
}

export default class Arrow<T> extends React.Component<IProps<T>> {

}