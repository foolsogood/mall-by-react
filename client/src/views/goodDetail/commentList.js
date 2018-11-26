import React, { Component } from "react";
import { Link } from "react-router-dom";
import CommentItem from "components/good-components/comments/commentItem";

//组件
import WithHeader from "components/common-components/withHeader";

@WithHeader({
  titleText: "商品评论"
})
class Comment extends Component {
  constructor() {
    super();
    this.state = {
      commentList: []
    };
  }
  componentDidMount() {
    this.getGoodComment();
  }
  getGoodComment() {
    const { goodId } = this.props.match.params;
    const params = [goodId];
    const url = $api.good.getGoodComment;
    $apiServer
      .get(url, { params })
      .then(res => {
        this.setState({
          commentList: res.data
        });
      })
      .catch($commonErrorHandler.apply(this, [url]));
  }
  render() {
    const { commentList } = this.state;
    const { goodId } = this.props.match.params;

    return (
      <div>
        <Link to={`/commentForm/${goodId}`}>
		<div className="flex-box just-c-ed pd-h-20" style={{lineHeight:'.7rem'}}>
			我要评论
		</div>
        </Link>
        {commentList.map((item, idx) => {
          return <CommentItem key={idx} rate={item} />;
		})}
      </div>
    );
  }
}
export default Comment;
