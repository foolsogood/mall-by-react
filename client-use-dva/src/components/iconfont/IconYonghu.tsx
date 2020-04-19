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

const IconYonghu: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M592.896 589.141333c96.938667-34.816 166.570667-131.072 166.570667-244.053333 0-142.677333-110.933333-258.048-247.466667-258.048-136.533333 0-247.466667 115.712-247.466667 258.048 0 112.981333 69.632 208.896 166.570667 244.053333-162.816 40.96-284.672 202.069333-284.672 383.658667L877.226667 972.8C877.226667 791.210667 755.712 630.101333 592.896 589.141333L592.896 589.141333zM592.896 589.141333"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IconYonghu.defaultProps = {
  size: 18,
};

export default IconYonghu;
