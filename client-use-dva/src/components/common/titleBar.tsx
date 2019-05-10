import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { createBrowserHistory as createHistory } from 'history';
const history = createHistory();
/**
 * 导航栏
 */
interface Props {
  ifBackShow: boolean;
  titleText: string;
}
export default class titleBar extends Component<Props> {
  static defaultProps = {
    ifBackShow: true,
    titleText: ''
  };
  goBack = () => {
    history.goBack();
  };
  render() {
    const { ifBackShow, titleText } = this.props;
    return (
      <>
        <div className="title-bar h-80 t-tc color-fff">
          <Row>
            <Col span={2}>
              {ifBackShow ? <span onClick={this.goBack}>&lt;</span> : ''}
            </Col>
            <Col span={20}>{titleText}</Col>
            <Col span={2} />
          </Row>
        </div>
      </>
    );
  }
}
