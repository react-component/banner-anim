import * as React from 'react';

export interface IProps<T> extends React.HTMLAttributes<T> {
  children: React.ReactNode;
  prefixCls?: string;
  component?: string | React.ReactNode;
  componentProps?: {};
}

export default class Thumb<T> extends React.Component<IProps<T>> {

}