import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import event from 'utils/event'


const FormItem = Form.Item;

class NormalLoginForm extends Component {


    handleSubmit = (e) => {
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
                            }} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
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
                            }} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="输入密码" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('repeatPwd', {
                            rules: [{ required: true, message: '确认密码!' }],
                        })(
                            <Input onChange={e => {
                                this.props.form.setFieldsValue({
                                    repeatPwd: e.target.value
                                })
                            }} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="确认密码" />
                        )}
                    </FormItem>
                    <FormItem>
                        <div className="flex-box">
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                提交
          </Button>
                        </div>

                    </FormItem>
                </Form>
            </div>
        );
    }
}

const signup = Form.create()(NormalLoginForm);
export default signup