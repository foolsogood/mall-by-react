import React from 'react'
import { Form, Input, Button } from 'antd'

import TitleBar from 'components/common-components/titleBar.js'


//引入mobx相关
import { observer } from 'mobx-react'
import store from 'store'
const FormItem = Form.Item
const _bindPhone = observer(
    class BindPhone extends React.Component {

        handleSubmit=(e)=> {
            e.preventDefault()
            this.props.form.validateFields((err, values) => {
                if (err) {
                    console.log(e)
                } else {
                    const query = { userid: store.user.user.userid, phone: this.props.form.getFieldValue('phone') }
                    const url = $api.user.bindPhone
                    $apiServer.post(url, { query })
                        .then($preAjaxHandler.call(this))

                        .then(res => {
                        }).catch($commonErrorHandler.apply(this, [url]))
                }
            })
        };

        styleBtnContainer = {
            // position: 'fixed',
            // bottom: '0',
            // left: '0',
            // right: '0',
            width: '100%',
            borderRadius: '0'
        };
        render() {
            const { getFieldDecorator } = this.props.form;
            return (
                <div className="pd-h-20">
                    <TitleBar titleText="绑定手机" />
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem>
                            {getFieldDecorator('phone', {
                                rules: [{ required: true, message: '请输入手机!' }],
                            })(
                                <Input type="tel" onChange={e => {
                                    this.props.form.setFieldsValue({
                                        phone: e.target.value
                                    })
                                }} placeholder="输入手机" />
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit" style={this.styleBtnContainer}>确认</Button>
                        </FormItem>
                    </Form>
                </div>
            )
        }
    })
const bind_phone = Form.create()(_bindPhone);

export default bind_phone