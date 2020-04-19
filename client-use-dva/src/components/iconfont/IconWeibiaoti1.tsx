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

const IconWeibiaoti1: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M490.666667 42.666667l-469.333333 469.333333 128 0 0 384c0 42.666667 42.666667 85.333333 85.333333 85.333333l85.333333 0 42.666667 0c25.6 0 42.666667-17.066667 42.666667-42.666667l0-42.666667 0-42.666667 0-128c0-25.6 17.066667-42.666667 42.666667-42.666667l128 0c25.6 0 42.666667 17.066667 42.666667 42.666667l0 85.333333 0 85.333333 0 42.666667c0 25.6 17.066667 42.666667 42.666667 42.666667l42.666667 0 85.333333 0c42.666667 0 85.333333-42.666667 85.333333-85.333333l0-384 128 0L490.666667 42.666667z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IconWeibiaoti1.defaultProps = {
  size: 18,
};

export default IconWeibiaoti1;
