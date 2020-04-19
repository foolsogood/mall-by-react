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

const IconZuo: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M725.201 914.052c-0.362 5.575-3.05 10.27-8.69 12.905-5.623 2.627-11.012 1.714-15.931-1.865-1.594-1.159-2.896-2.727-4.303-4.135-131.814-131.839-263.624-263.681-395.434-395.523-8.187-8.189-8.177-12.643 0.045-20.867 131.927-131.96 263.853-263.921 395.794-395.866 1.868-1.868 3.759-3.801 5.939-5.253 6.795-4.523 14.784-3.518 19.822 2.257 5.189 5.947 5.085 14.278-0.629 20.313-6.503 6.869-13.252 13.506-19.941 20.197-48.59 48.607-97.167 97.226-145.796 145.795-73.176 73.085-146.373 146.148-219.65 219.132-2.918 2.907-3.487 4.346-0.194 7.627 70.433 70.197 140.693 140.567 211.044 210.847 51.091 51.039 102.267 101.993 153.395 152.995 6.463 6.447 12.842 12.98 19.299 19.434 3.182 3.181 5.154 6.865 5.23 12.007z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IconZuo.defaultProps = {
  size: 18,
};

export default IconZuo;
