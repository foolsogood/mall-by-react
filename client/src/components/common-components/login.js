import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import event from 'utils/event'
import apiServer from 'service/apiServer'
import api from 'service/api'
//引入mobx相关
import { observer } from 'mobx-react'
import store from 'store'
import Cookies from 'js-cookie'
const FormItem = Form.Item;

const _login=observer(class Login extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const query = {
            username: this.props.form.getFieldValue('username'),
            password: this.props.form.getFieldValue('password'),
        }
        apiServer.post(api.user.login, { query }).then(res => {
            if(res.code===1){
              store.user.getUser(res.data)
              Cookies.set('token',res.token)
                event.emit('showLogin', false)
            }
        })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
        <div className="login">
            <div className="mask"></div>
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名!' }],
          })(
            <Input onChange={e => {
                this.props.form.setFieldsValue({
                    username: e.target.value
                })
            }} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码!' }],
          })(
            <Input onChange={e => {
                this.props.form.setFieldsValue({
                    password: e.target.value
                })
            }} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>记住我</Checkbox>
          )}
          <div>

          </div>
          <div className="flex-box">
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
          </div>
         
          或者 <span onClick={()=>{event.emit('showSignup',true);event.emit('showLogin',false)}}>去注册!</span>
        </FormItem>
      </Form>
      </div>
    );
  }
})

const login = Form.create()(_login);

export default login