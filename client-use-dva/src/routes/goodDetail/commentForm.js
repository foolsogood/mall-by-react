import React, { Component } from "react";
import {  WingBlank,  ImagePicker } from "antd-mobile";
import { Input, Checkbox, Rate } from "antd";
import WithHeader from "components/common-components/withHeader";
const { TextArea } = Input;
//组件
@WithHeader({
  titleText: "我要评论"
})
 class CommentForm extends Component {
  constructor() {
    super();
    this.state = {
      rateNumber: 0,
      isAnonymousChecked: false,
      files: [],
      comment: "",
      fileStreamList: []
    };
  }
  //评分
  rateChangeHandler = rateNumber => {
    this.setState({
      rateNumber
    });
  };
  //是否匿名
  checkHandler = e => {
    this.setState({
      isAnonymousChecked: e.target.checked
    });
  };
  //图片选择change
  onImgChange = async (files, type, index) => {
    let _temp = this.state.files;
    let _tempStreamList = this.state.fileStreamList;
    const op = {
      remove: async () => {
        _temp.splice(index, 1);
        _tempStreamList.splice(index, 1);
        this.setState({ files: _temp, fileStreamList: _tempStreamList });
      },
      add: async () => {
        _temp.push({
          url: files.slice(-1)[0].url
        });
        _tempStreamList.push(files.slice(-1)[0].file);
        this.setState({ files: _temp, fileStreamList: _tempStreamList });
      }
    };
    op[type]();
  };
  commentChangeHandler = e => {
    const { value } = e.target;
    this.setState({
      comment: value
    });
  };
  submit = async () => {
    const { goodId } = this.props.match.params;
    const {
      isAnonymousChecked,
      rateNumber,
      comment,
      fileStreamList
    } = this.state;
    let formdata = new FormData();
    formdata.append("isAnonymous", isAnonymousChecked ? 1 : 0);
    formdata.append("rate", rateNumber);
    formdata.append("comment", comment);
    fileStreamList.forEach(item => {
      formdata.append("file", item);
    });

    const params = [goodId];
    const url = window.$api.good.addGoodComment;
    try {
      await window.$apiServer.post_formdata(url, { params, formdata });
    } catch (err) {
      window.$commonErrorHandler(url)(err);
    }
  };
  render() {
    const { files } = this.state;
    return (
      <div className="comment-form" style={{ lineHeight: ".7rem" }}>
        <WingBlank>
          <div className="flex-box just-c-ed">
            <span className="color-org" onClick={this.submit}>
              发布
            </span>
          </div>
          <div className="flex-box flex-ju-c-bt">
            <span>描述相符</span>
            <Rate allowHalf onChange={this.rateChangeHandler} />
          </div>
          <div>
            <TextArea
              rows={8}
              onChange={this.commentChangeHandler}
              placeholder="宝贝符合你的期待吗？说说你的感受吧"
            />
          </div>
          <div>
            <ImagePicker
              files={files}
              onChange={this.onImgChange}
              onImageClick={(index, fs) => console.log(index, fs)}
              selectable
              multiple
            />
          </div>
          <div>
            <Checkbox onChange={this.checkHandler}>匿名</Checkbox>
          </div>
        </WingBlank>
      </div>
    );
  }
}
export default CommentForm
