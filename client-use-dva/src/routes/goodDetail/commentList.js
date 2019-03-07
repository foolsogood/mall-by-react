import React, { Component } from "react";
import { Link } from "dva/router";
import CommentItem from "components/good-components/comments/commentItem";

//组件


class Comment extends Component {
  constructor() {
    super();
    this.state = {
      commentList: [],
      pageSize: 5,
      pageNum: 1,
      total: 0
    };
  }
  componentDidMount() {
    this.getGoodComment();
  }
  getMore = async () => {
    await this.setState({
      pageNum: this.state.pageNum + 1
    });
    this.getGoodComment();
  };
  async getGoodComment() {
    const { goodId } = this.props.match.params;
    const params = [goodId];
    const query = {
      pageSize: this.state.pageSize,
      pageNum: this.state.pageNum
    };
    const url = window.$api.good.getGoodComment;
    try {
      const res =await window.$apiServer.get(url, { query, params });
      this.setState({
        commentList: await this.state.commentList.concat(res.data),
        total: res.data.length
      });
    } catch (err) {
      window.$commonErrorHandler(url)(err);
    }
  }
  render() {
    const { commentList, total } = this.state;
    const { goodId } = this.props.match.params;
    const haveComment = () => {
      return (
        <div>
          <Link to={`/commentForm/${goodId}`}>
            <div
              className="flex-box just-c-ed pd-h-20"
              style={{ lineHeight: ".7rem" }}
            >
              我要评论
            </div>
          </Link>
          {commentList.map((item, idx) => (
            <CommentItem key={idx} comment={item} />
          ))}
        </div>
      );
    };
    const noComment = () => {
      return (
        <div className="flex-box" style={{ height: "100vh" }}>
          暂无评论
          <Link to={`/commentForm/${goodId}`}>
            <span className="color-org pd-20">我要评论</span>
          </Link>
        </div>
      );
    };
    return (
      <div>
        {commentList.length ? haveComment() : noComment()}
        {commentList.length < total ? (
          <p
            onClick={this.getMore}
            className="flex-box"
            style={{ lineHeight: "1rem" }}
          >
            下拉更多
          </p>
        ) : null}
      </div>
    );
  }
}
export default Comment;
