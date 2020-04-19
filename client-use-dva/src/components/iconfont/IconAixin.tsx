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

const IconAixin: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1025 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M1024.549 360.609c0-170.492-133.815-309.265-298.055-309.265-81.129 0-157.91 34.998-213.344 94.701-55.509-59.702-132.367-94.701-213.344-94.701C135.49 51.344 1.751 190.041 1.751 360.609c0 5.719 0.534 10.827 0.991 15.021-0.076 1.373-0.152 2.745-0.152 4.194 0 30.193 7.319 63.361 21.73 98.59 0.458 1.295 0.915 2.516 1.449 3.657 90.812 217.844 440.412 468.474 455.279 479.985 9.227 7.092 20.205 10.6 31.263 10.6 11.209 0 22.266-3.659 31.566-10.903 12.733-9.911 310.941-224.551 429.279-427.603 4.498-6.861 7.854-13.494 10.828-19.215 0.914-1.829 1.753-3.658 2.744-5.413l0.382-0.839c0.382-0.686 0.839-1.449 1.296-2.059 7.091-13.802 12.732-26.611 17.232-39.116 12.274-32.177 18.3-60.847 18.3-87.61 0-2.058-0.077-3.888-0.229-5.414C1024.093 370.979 1024.549 366.251 1024.549 360.609z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IconAixin.defaultProps = {
  size: 18,
};

export default IconAixin;
