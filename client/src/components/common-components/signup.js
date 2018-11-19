import React, { Component } from 'react'
import { List, Button, WhiteSpace, WingBlank, InputItem } from "antd-mobile";
import { createForm } from "rc-form";

import event from 'utils/event'



class NormalLoginForm extends Component {


    handleSubmit = (e) => {
        console.log(111)
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
            const query = {
                username: this.props.form.getFieldValue('username'),
                password: this.props.form.getFieldValue('password'),
                repeatPwd: this.props.form.getFieldValue('repeatPwd')
            }
            const url = $api.user.signup
            $apiServer.put(url, { query })
                .then($preAjaxHandler.call(this))
                .then(res => {
                    event.emit('showSignup', false);
                    event.emit('showLogin', true)
                }).catch($commonErrorHandler.apply(this, [url]))
        });
    }

    render() {
        const { getFieldProps } = this.props.form;

        return (
            <div className="login">
                <div className="mask"></div>
                <div className="login-form">
          <WingBlank>
            <p className="flex-box">注册</p>
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
              <InputItem
                {...getFieldProps("repeatPwd")}
                type="password"
                placeholder="确认密码"
                clear
                moneyKeyboardAlign="left"
              />
            </List>
            <WhiteSpace />
            <List>
              <Button onClick={this.handleSubmit} type="primary" style={{color:'#fff'}}>注册</Button>
            </List>
          </WingBlank>
        </div>
            </div>
        );
    }
}

const signup = createForm()(NormalLoginForm);
export default signup