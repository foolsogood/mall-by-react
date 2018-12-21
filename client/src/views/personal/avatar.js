import React, { Component } from "react";
import { ImagePicker, WingBlank, Button, Toast } from "antd-mobile";
import WithHeader from "components/common-components/withHeader";
//
//引入mobx相关
import { observer } from "mobx-react";
import store from "store";
@observer
@WithHeader({ titleText: "个人头像" })
class Avatar extends Component {
  constructor() {
    super();
    this.state = {
      avatarList: [],
      filesObj: {},
      isShowBtn: false
    };
  }
  componentDidMount() {
    this.setState({
      avatarList: [
        {
          url:
            store.user.user && store.user.user.avatar
              ? store.user.user.avatar
              : require("assets/img/default-avatar.jpeg")
        }
      ]
    });
  }
  upload = async () => {
    const url = window.$api.user.uploadAvatar;
    let formdata = new FormData();
    await formdata.append("file", this.state.filesObj.file);
    try {
      const res = await window.$apiServer.post_formdata(url, { formdata });
      Toast.info("上传成功");
      store.user.getUser(
        Object.assign({}, store.user.user, { avatar: res.data.url })
      );
    } catch (err) {
      window.$commonErrorHandler(url)(err);
    }
  };
  onChange = async (files, type, index) => {
    console.log(files, type, index);
    const op = {
      remove: async () => {
        let _temp = this.state.avatarList;
        _temp.splice(index, 1);
        this.setState({ avatarList: _temp, isShowBtn: false });
      },
      add: async () => {
        this.setState({
          avatarList: [
            {
              url: files[0].url
            }
          ],
          filesObj: files[0],
          isShowBtn: true
        });
      }
    };
    op[type]();
  };
  render() {
    const { avatarList, isShowBtn } = this.state;
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
        {isShowBtn ? btn : null}
      </div>
    );
  }
}
export default Avatar;
