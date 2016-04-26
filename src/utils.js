import React from 'react';

export function toArrayChildren(children) {
  const ret = [];
  React.Children.forEach(children, c=> {
    ret.push(c);
  });
  return ret;
}

export function dataToArray(vars) {
  if (!vars && vars !== 0) {
    return [];
  }
  if (Array.isArray(vars)) {
    return vars;
  }
  return [vars];
}
