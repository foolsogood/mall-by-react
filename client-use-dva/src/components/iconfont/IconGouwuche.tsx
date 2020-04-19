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

const IconGouwuche: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M404.4736 601.6a38.272 38.272 0 0 1-4.9152 14.8928L371.2064 665.6H780.8a38.4 38.4 0 0 1 0 76.8H307.2a38.4 38.4 0 0 1-38.3552-40.3264 38.2208 38.2208 0 0 1 5.0752-21.568l46.6432-80.7872-7.0912-26.4576a51.2576 51.2576 0 0 1-3.6352-9.6128l-68.576-256a51.4432 51.4432 0 0 1-1.6512-10.048l-29.6128-110.5088-89.9712-24.1088a38.4 38.4 0 0 1 19.8784-74.176l111.2704 29.8112a38.4 38.4 0 0 1 27.6736 29.312c0.4032 1.0944 0.7616 2.2144 1.0688 3.3664L304.544 243.2h556.736a51.2 51.2 0 0 1 49.4592 64.448l-68.576 256a51.2 51.2 0 0 1-49.4528 37.952H404.4736zM345.6 928c-42.4128 0-76.8-34.3872-76.8-76.8s34.3872-76.8 76.8-76.8 76.8 34.3872 76.8 76.8-34.3872 76.8-76.8 76.8z m416 0c-42.4128 0-76.8-34.3872-76.8-76.8s34.3872-76.8 76.8-76.8 76.8 34.3872 76.8 76.8-34.3872 76.8-76.8 76.8z"
        fill={getIconColor(color, 0, '#59AAFF')}
      />
    </svg>
  );
};

IconGouwuche.defaultProps = {
  size: 18,
};

export default IconGouwuche;
