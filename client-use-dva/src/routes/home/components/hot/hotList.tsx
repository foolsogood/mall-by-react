import React, { Component } from 'react';
import HotItem from './hotItem';
interface Props {
  hotGoods: any[];
}
export default class HotList extends Component<Props> {
  render() {
    return (
      <div className="bg-fff home-good">
        <div className="home-good-title">热销商品</div>
        <div>
          {this.props.hotGoods.map(item => {
            return <HotItem key={item.goodId} good={item} />;
          })}
        </div>
      </div>
    );
  }
}
