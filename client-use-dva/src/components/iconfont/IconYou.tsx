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

const IconYou: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M311.132 928.54c-7.234-0.006-12.832-3.611-15.026-9.076-2.482-6.183-1.228-11.795 3.33-16.525 6.45-6.693 13.046-13.247 19.619-19.822 48.597-48.611 97.178-97.237 145.813-145.81 72.833-72.74 145.675-145.471 218.654-218.063 3.569-3.55 3.055-5.124-0.189-8.359-70.537-70.343-140.932-140.829-211.399-211.242-50.383-50.344-100.837-100.616-151.248-150.931a2979.983 2979.983 0 0 1-21.394-21.569c-6.8-6.927-7.165-15.992-0.98-22.139 6.034-5.996 15.042-5.783 21.912 0.547 1.342 1.237 2.602 2.563 3.893 3.854l395.115 395.224c8.218 8.22 8.237 12.714 0.085 20.868-132.063 132.098-264.135 264.189-396.153 396.332-3.797 3.8-7.832 6.581-12.032 6.711z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IconYou.defaultProps = {
  size: 18,
};

export default IconYou;
