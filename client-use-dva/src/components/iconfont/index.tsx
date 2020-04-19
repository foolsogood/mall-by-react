/* tslint:disable */
/* eslint-disable */

import React, { CSSProperties, DOMAttributes, FunctionComponent } from 'react';
import IconAixin from './IconAixin';
import IconAixin1 from './IconAixin1';
import IconShanchu from './IconShanchu';
import IconWeibiaoti1 from './IconWeibiaoti1';
import IconYuancircle46 from './IconYuancircle46';
import IconYonghu from './IconYonghu';
import IconFenleitianchong from './IconFenleitianchong';
import IconYou from './IconYou';
import IconZuo from './IconZuo';
import IconSelected from './IconSelected';
import IconGouwuche from './IconGouwuche';

export type IconNames = 'aixin' | 'aixin1' | 'shanchu' | 'weibiaoti1' | 'yuancircle46' | 'yonghu' | 'fenleitianchong' | 'you' | 'zuo' | 'selected' | 'gouwuche';

interface Props extends DOMAttributes<SVGElement> {
  name: IconNames;
  size?: number;
  color?: string | string[];
  style?: CSSProperties;
  className?: string;
}

const IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'aixin':
      return <IconAixin {...rest} />;
    case 'aixin1':
      return <IconAixin1 {...rest} />;
    case 'shanchu':
      return <IconShanchu {...rest} />;
    case 'weibiaoti1':
      return <IconWeibiaoti1 {...rest} />;
    case 'yuancircle46':
      return <IconYuancircle46 {...rest} />;
    case 'yonghu':
      return <IconYonghu {...rest} />;
    case 'fenleitianchong':
      return <IconFenleitianchong {...rest} />;
    case 'you':
      return <IconYou {...rest} />;
    case 'zuo':
      return <IconZuo {...rest} />;
    case 'selected':
      return <IconSelected {...rest} />;
    case 'gouwuche':
      return <IconGouwuche {...rest} />;

  }

  return null;
};

export default IconFont;
