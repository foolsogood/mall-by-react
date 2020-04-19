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

const IconAixin1: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1100 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M563.2 1016.32l-97.28-89.6C199.68 688.64 25.6 529.92 25.6 322.56 25.6 145.92 163.84 10.24 337.92 10.24c81.92 0 163.84 33.28 225.28 87.04C624.64 40.96 706.56 10.24 788.48 10.24 965.12 10.24 1100.8 148.48 1100.8 322.56c0 204.8-174.08 363.52-437.76 601.6l-2.56 2.56-97.28 89.6zM337.92 87.04C204.8 87.04 102.4 192 102.4 322.56c0 171.52 163.84 320 414.72 547.84l46.08 43.52 46.08-40.96C860.16 645.12 1024 496.64 1024 325.12c0-133.12-104.96-235.52-235.52-235.52-74.24 0-145.92 33.28-194.56 89.6L563.2 212.48 532.48 179.2c-48.64-58.88-120.32-92.16-194.56-92.16z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IconAixin1.defaultProps = {
  size: 18,
};

export default IconAixin1;
