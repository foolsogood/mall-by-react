import React, { Component } from "react";
import { Row, Col, Rate } from "antd";
import ImgWraper from "components/common-components/imgWraper";
import tool from "utils/tool";
export default class CommentItem extends Component {
  render() {
    const {comment} = this.props;
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
              src={comment.avatar}
            />
          </Col>
          <Col span={20}>
            <div className="flex-box flex-ju-c-bt">
              <span>{comment.name}</span>
              <Rate disabled defaultValue={parseFloat(comment.rateScore)} />
            </div>
            <p>{tool.formatTime(comment.updated_at)}</p>
            <p>{comment.comment}</p>
            {comment.imgList ? _hList(JSON.parse(comment.imgList)) : null}
          </Col>
        </Row>
      </div>
    );
  }
}
