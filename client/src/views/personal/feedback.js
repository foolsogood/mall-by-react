import React from 'react'
import { Form, Input, Button } from 'antd'
import WithHeader from 'components/common-components/withHeader'

const { TextArea } = Input
const FormItem = Form.Item
@WithHeader({ titleText: '意见反馈' })
class feedback extends React.Component {

    handleSubmit = (e) => {
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
                <Form onSubmit={this.handleSubmit}>
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
export default feedback