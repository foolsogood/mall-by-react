/* tslint:disable */
/* eslint-disable */

import React, { CSSProperties, DOMAttributes, FunctionComponent } from 'react';
import { getIconColor } from './helper';

interface Props extends DOMAttributes<SVGElement> {
  size?: number;
  color?: string | string[];
  style?: CSSProperties;
  className?: string;
}

const DEFAULT_STYLE: CSSProperties = {
  display: 'block',
};

const IconSelected: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M0.20928 497.391904A511.891223 511.891223 0 1 0 526.817376 0.217554 511.891223 511.891223 0 0 0 0.20928 497.391904z m809.427997-109.416749l-340.407664 319.932015a46.07021 46.07021 0 0 1-63.986403 0L218.402914 512.108777a46.07021 46.07021 0 1 1 67.185723-63.986403l153.567367 162.525463L745.650874 320.149568a46.07021 46.07021 0 1 1 63.986403 67.185723"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IconSelected.defaultProps = {
  size: 18,
};

export default IconSelected;
