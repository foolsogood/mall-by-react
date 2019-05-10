import React, { Component } from "react";
import { Row, Col, Rate } from "antd";
import ImgWraper from "components/common/imgWraper";
import tool from "utils/tool";
export default class CommentItem extends Component {
  render() {
    const rate = this.props.rate;
    const _hList = list => {
      return (
        <div>
          {list.map((item, idx) => {
            return (
              <img
                key={idx}
                src={item}
                alt=""
                style={{ width: "1rem", height: "1rem", paddingRight: ".1rem" }}
              />
            );
          })}
        </div>
      );
    };
    return (
      <div className="comment-item bg-fff">
        <Row>
          <Col span={4}>
            <ImgWraper
              className="avatar-com"
              data-errorimgsrc={require("assets/img/default-avatar.jpeg")}
              src={rate.avatar}
            />
          </Col>
          <Col span={20}>
            <div className="flex-box flex-ju-c-bt">
              <span>{rate.name}</span>
              <Rate disabled defaultValue={parseFloat(rate.rateScore)} />
            </div>
            <p>{tool.formatTime(rate.updated_at)}</p>
            <p>{rate.comment}</p>
            {rate.imgList ? _hList(JSON.parse(rate.imgList)) : null}
          </Col>
        </Row>
      </div>
    );
  }
}
