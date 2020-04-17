import React, { Component } from 'react';
import { WingBlank, ImagePicker } from 'antd-mobile';
import { Input, Checkbox, Rate } from 'antd';
const { TextArea } = Input;
//组件
interface Props {
  match?: any;
}
interface State {
  rateNumber: number | Blob;
  isAnonymousChecked: string | Blob;
  files: any[];
  comment: string;
  fileStreamList: any[];
}
class CommentForm extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      rateNumber: 0,
      isAnonymousChecked: '',
      files: [],
      comment: '',
      fileStreamList: []
    };
  }
  //评分
  rateChangeHandler = (rateNumber: number) => {
    this.setState({
      rateNumber
    });
  };
  //是否匿名
  checkHandler = (e) => {
    this.setState({
      isAnonymousChecked: e.target.checked
    });
  };
  //图片选择change
  onImgChange = async (files, type, index) => {
    const _temp = this.state.files;
    const _tempStreamList = this.state.fileStreamList;
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
  commentChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
    const upload_url = window.$api.upload;
    const formdata = new FormData();
    for (const item of fileStreamList) {
      formdata.append('file', item);
    }
    const arr =await window.$http.post_upload(upload_url, { formdata }).then(res=>res.data);
    console.log('arr',arr)
    const query={
      isAnonymous:isAnonymousChecked ? 1 : 0,
      rateScore:rateNumber,
      comment,
      imgList:JSON.stringify(arr.map(item=>item.url))
    }
    const params = { goodId };
    const url = window.$api.good.addGoodComment;
    try {
      await window.$http.post(url, { params, query });
    } catch (err) {
      window.$commonErrorHandler(url)(err);
    }
  };
  render() {
    const { files } = this.state;
    return (
      <div className="comment-form" style={{ lineHeight: '.7rem' }}>
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
export default CommentForm;
