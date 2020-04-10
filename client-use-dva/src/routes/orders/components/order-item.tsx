import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Link } from 'dva/router';
import ImgWraper from 'components/common/imgWraper'
interface Props {
  order: any;
}
export default class OrderItem extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    const { order } = this.props;
    return (
      <div className="order-item bg-fff pd-20">
        <Link to={`/orderDetail/${order.orderId}`}>
          <Row>
            <Col span={7}>
              <ImgWraper
                style={{ width: '1.5rem', height: '1.5rem' }}
                src={order.imgs[0]}
                alt={'商品'}
                data-errorimgsrc={require('assets/img/default-good.jpg')}
              />
            </Col>
            <Col span={12}>
              <div>
                <p>{order.goodName}</p>
                <p className="good-itm-p-2">{order.desction}</p>
              </div>
            </Col>
            <Col span={5}>
              <div>
                <span>¥{order.price * order.number}</span>
              </div>
            </Col>
          </Row>
        </Link>
      </div>
    );
  }
}
