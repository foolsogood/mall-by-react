import React, { Component } from "react";
import { List, Button, WhiteSpace, WingBlank, InputItem } from "antd-mobile";
import { createForm } from "rc-form";
import event from "utils/event";
import { connect } from "dva";
import Cookies from "js-cookie";
interface Props {
  form?: any;
  dispatch?: (args) => void;
}
interface State {
  isLoginShow: boolean;
}
type ReadonlyState = Readonly<State>;

@connect(({ app }) => ({
  app
}))
@createForm()
class Login extends Component<Props, ReadonlyState> {
  constructor(props) {
    super(props);
    this.state = {
      isLoginShow: false
    };
  }
  componentDidMount() {
    event.on("showLogin", bool => {
      this.setState({ isLoginShow: bool });
    });
  }
  handleSubmit = e => {
    const {
      form: { validateFields, getFieldValue },
      dispatch
    } = this.props;
    e.preventDefault();
    validateFields(async (err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        const query = {
          phone: getFieldValue("username"),
          password: getFieldValue("password")
        };
        const option = { loadingTxt: "登录中……" };
        const url = window.$api.user.login;
        try {
          const res = await window.$http.post(url, { query, option });
          dispatch({ type: "app/changeUser", payload: res.data });
          Cookies.set("token", res.data.token);
          event.emit("showLogin", false);
          setTimeout(() => {
            window.location.reload();
          }, 0);
        } catch (err) {
          window.$commonErrorHandler(url)(err);
        }
      }
    });
  };

  render() {
    const { getFieldProps } = this.props.form;
    const { isLoginShow } = this.state;
    const loginHtml = () => (
      <div className="login">
        <div
          onClick={() => this.setState({ isLoginShow: false })}
          className="mask"
        />
        <div className="login-form">
          <WingBlank>
            <p className="flex-box">登录</p>
            <List>
              <InputItem
                {...getFieldProps("username")}
                type="text"
                placeholder="用户名"
                clear
                moneyKeyboardAlign="left"
              />
            </List>

            <WhiteSpace />
            <List>
              <InputItem
                {...getFieldProps("password")}
                type="password"
                placeholder="密码"
                clear
                moneyKeyboardAlign="left"
              />
            </List>
            <WhiteSpace />
            <List>
              <Button
                onClick={this.handleSubmit}
                type="primary"
                style={{ color: "#fff" }}>
                提交
              </Button>
            </List>
            <p style={{ paddingTop: ".3rem" }}>
              没有账号?
              <span
                onClick={() => {
                  event.emit("showSignup", true);
                  event.emit("showLogin", false);
                }}
                style={{ paddingLeft: ".2rem", color: "#ff0000" }}>
                去注册
              </span>
            </p>
          </WingBlank>
        </div>
      </div>
    );
    return <div>{isLoginShow ? loginHtml() : null}</div>;
  }
}

export default Login;
