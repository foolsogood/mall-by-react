import React from 'react'
import { Form, Input, Button } from 'antd'
import TitleBar from '../../components/common-components/titleBar.js'
const { TextArea } = Input
const FormItem = Form.Item
export default class feedback extends React.Component {
    constructor() {
        super()
        this.state = {
           
            ifBackShow: true
        }
    };
    handleSubmit(e) {
        e.preventDefault()
        console.log(e)
    };
    styleBtnContainer = {
        position: 'fixed',
        bottom: '0',
        left: '0',
        right: '0',
        width: '100%',
        borderRadius: '0'
    };
    render() {
        return (
            <div>
                <TitleBar  ifBackShow={this.state.ifBackShow} titleText="意见反馈" />
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem>
                        <TextArea rows={8} placeholder="有什么好的意见或建议?" />
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" style={this.styleBtnContainer}>确认</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}