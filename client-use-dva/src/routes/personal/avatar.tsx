import React, { Component } from 'react';
import { ImagePicker, WingBlank, Button, Toast } from 'antd-mobile';
import { connect } from 'dva';
interface Props {
  app?: any;
  dispatch?: (args) => void;
}
interface State {
  avatarList: any[];
  filesObj: any;
  isShowBtn: boolean;
}
@connect(({ app }) => ({ app }))
class Avatar extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      avatarList: [],
      filesObj: {},
      isShowBtn: false
    };
  }
  componentDidMount() {
    const { user } = this.props.app;
    this.setState({
      avatarList: [
        {
          url: user.avatar
            ? user.avatar
            : require('assets/img/default-avatar.jpeg')
        }
      ]
    });
  }
  upload = async () => {
    const {
      app: { user },
      dispatch
    } = this.props;

    const url = window.$api.user.uploadAvatar;
    const formdata = new FormData();

    formdata.append('file', this.state.filesObj.file);
    try {
      const res = await window.$http.post_upload(url, { formdata });
      if(!res)return
      Toast.info('上传成功');
      dispatch({
        type: 'app/changeUser',
        payload: Object.assign({}, user, { avatar: res.data.urlList[0].url })
      });
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
          position: 'fixed',
          bottom: '.2rem',
          left: '.2rem',
          right: '.2rem'
        }}
      >
        <Button
          type="primary"
          className="am-button-borderfix"
          onClick={this.upload}
          style={{ color: '#fff' }}
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
