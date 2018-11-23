import React, { Component } from "react";
import { ImagePicker, WingBlank, Button } from "antd-mobile";
import WithHeader from "components/common-components/withHeader";
//
//引入mobx相关
import { observer } from 'mobx-react'
import store from 'store'
@observer
@WithHeader({ titleText: "个人头像" })
class Avatar extends Component {
  constructor() {
    super();
    this.state = {
      avatarList: [],
      filesObj: {}
    };
  }
  componentDidMount() {
    this.setState({
      avatarList: [
        {
          url: store.user.user&&store.user.user.avatar?store.user.user.avatar:require('assets/img/avatar.jpg')
        }
      ]
    });
  }
  upload = async () => {
    const url = $api.user.uploadAvatar;
    let formdata = new FormData();
    await formdata.append("file", this.state.filesObj.file);
    $apiServer
      .post_formdata(url, { formdata })
      .then(res => {})
      .catch($commonErrorHandler.apply(this, [url]));
  };
  onChange = async (files, type, index) => {
    console.log(files, type, index);
    const op = {
      remove: async () => {
        let _temp = this.state.avatarList;
        _temp.splice(index, 1);
        this.setState({ avatarList: _temp });
      },
      add: async () => {
        this.setState({
          avatarList: [
            {
              url: files[0].url
            }
          ]
        });
        this.setState({
          filesObj: files[0]
        });
      }
    };
    op[type]();
  };
  render() {
    const { avatarList } = this.state;
    const btn = (() => (
      <div
        style={{
          position: "fixed",
          bottom: ".2rem",
          left: ".2rem",
          right: ".2rem"
        }}
      >
        <Button
          type="primary"
          className="am-button-borderfix"
          onClick={this.upload}
          style={{ color: "#fff" }}
        >
          提交
        </Button>
      </div>
    ))();
    return (
      <div className="avatar-page">
        <WingBlank>
          <ImagePicker
            files={avatarList}
            onChange={this.onChange}
            onImageClick={(index, fs) => console.log(index, fs)}
            selectable={!avatarList.length}
          />
        </WingBlank>
        {avatarList.length ? btn : null}
      </div>
    );
  }
}
export default Avatar;
