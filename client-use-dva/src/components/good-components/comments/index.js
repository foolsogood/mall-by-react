import React, { Component } from "react";
import CommentItem from "./commentItem";
import { Link } from 'dva/router'
export default class Comments extends Component {
  render() {
    const { rateList,goodInfo } = this.props;
    const haveComment = () => (
      <div>
        <Link to={`/commentList/${goodInfo.goodId}`}>
          <div className="flex-box just-c-ed pd-20 bd-bt">
            <span>
              更多
              <span
                className="iconfont icon-you"
                style={{ color: "#8a8a8a", fontSize: ".35rem" }}
              />
            </span>
          </div>
        </Link>
        {rateList.map((item, idx) => {
          return <CommentItem key={idx} comment={item} />;
        })}
      </div>
    );
    const haveNoComment = () => (
      <p className="flex-box" style={{minHeight:'3.5rem'}}>
        暂无评论
        <Link to={`/commentList/${goodInfo.goodId}`}>
          <span className="pd-lf-20 " style={{ color: "#1890ff" }}>
            我要评论
          </span>
        </Link>
      </p>
    );
    return <div>{rateList&&rateList.length ? haveComment() : haveNoComment()}</div>;
  }
}
