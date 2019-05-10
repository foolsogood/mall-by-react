import React, { Component } from "react";
import { List, Button, WhiteSpace, WingBlank, InputItem } from "antd-mobile";
import { createForm } from "rc-form";
import event from "utils/event";

//引入mobx相关
import { observer } from "mobx-react";
import store from "store";
import Cookies from "js-cookie";

@observer
class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        const query = {
          username: this.props.form.getFieldValue("username"),
          password: this.props.form.getFieldValue("password")
        };
        const option = { loadingTxt: "登录中……" };
        const url = window.$api.user.login;
        try {
          const res = await window.$apiServer.post(url, { query, option });
          store.user.getUser(res.data);
          Cookies.set("token", res.token);
          event.emit("showLogin", false);
        } catch (err) {
          window.$commonErrorHandler(url)(err);
        }
      }
    });
  };

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div className="login">
        <div className="mask" />
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
                style={{ color: "#fff" }}
              >
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
                style={{ paddingLeft: ".2rem", color: "#ff0000" }}
              >
                去注册
              </span>
            </p>
          </WingBlank>
        </div>
      </div>
    );
  }
}

const login = createForm()(Login);

export default login;
