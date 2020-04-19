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

const IconYuancircle46: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M229.76512 794.23488c155.61728 155.61728 408.84224 155.61728 564.45952 0s155.61728-408.84224 0-564.45952-408.84224-155.61728-564.45952 0S74.14784 638.60736 229.76512 794.23488zM260.73088 260.72064c138.55744-138.55744 364.00128-138.55744 502.55872 0 138.53696 138.5472 138.53696 364.00128 0 502.55872-138.55744 138.5472-364.02176 138.5472-502.55872 0C122.17344 624.72192 122.17344 399.26784 260.73088 260.72064z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IconYuancircle46.defaultProps = {
  size: 18,
};

export default IconYuancircle46;
