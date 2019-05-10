import React, { Component } from 'react'
import WithHeader from 'components/common/withHeader'
import { Radio } from 'antd'
//引入event
import event from 'utils/event'
const RadioGroup = Radio.Group
@WithHeader({ titleText: '送达时间' })
class SendTime extends Component {
    constructor() {
        super()
        this.state = {
            value: '尽快'
        }
    };
    onChange = (e) => {
        this.setState({
            value: e.target.value
        })
    };
    sure = () => {
        event.emit('sure-send-time', '123')
    }

    render() {
        const styleObj = {
            width: '100%',
        };
        const styleBtn = {
            position: 'fixed',
            bottom: '0',
            left: '0',
            right: '0',
            background: '#1296db'
        };
        return (
            <div>
                <div className="pd-h-20 h-80">送货时间</div>
                <div className="pd-h-20 bg-fff">
                    <RadioGroup style={styleObj} onChange={this.onChange} value={this.state.value}>
                        <Radio className="radio-1" value={'尽快'}>尽快</Radio>
                        <Radio className="radio-1" value={'不限送货时间'}>不限送货时间</Radio>
                        <Radio className="radio-1" value={'工作日送货'}>工作日送货</Radio>
                        <Radio className="radio-1" value={'双休日,假日送货'}>
                            双休日,假日送货
        </Radio>
                    </RadioGroup>
                </div>
                <div className="h-100 flex-box color-fff" onClick={this.sure} style={styleBtn}>确定</div>
            </div>
        )
    }
}
export default SendTime