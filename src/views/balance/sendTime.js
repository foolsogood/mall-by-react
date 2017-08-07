import React, { Component } from 'react'
//引入event

import TitleBar from '../../components/common-components/titleBar.js'
import { Radio } from 'antd'
const RadioGroup = Radio.Group

export default class SendTime extends Component {
    constructor() {
        super()
        this.state = {
           
            ifBackShow: true,
            value: '尽快'
        }
    };
    onChange(e) {
        
    //    emitter.emit('sendTime')
        
        this.setState({
            value: e.target.value
        })
    };

    styleObj = {
        width: '100%',
    };
    styleBtn={
        position:'fixed',
        bottom:'0',
        left:'0',
        right:'0',
        background:'#1296db'
    };
    render() {
        return (
            <div>
                <TitleBar  ifBackShow={this.state.ifBackShow} titleText="送达时间" />
                <div className="pd-h-20 h-80">送货时间</div>
                <div className="pd-h-20 bg-fff">
                    <RadioGroup style={this.styleObj} onChange={this.onChange.bind(this)} value={this.state.value}>
                        <Radio className="radio-1" value={'尽快'}>尽快</Radio>
                        <Radio className="radio-1" value={'不限送货时间'}>不限送货时间</Radio>
                        <Radio className="radio-1" value={'工作日送货'}>工作日送货</Radio>
                        <Radio className="radio-1" value={'双休日,假日送货'}>
                            双休日,假日送货
        </Radio>
                    </RadioGroup>
                </div>
                <div className="h-100 flex-box color-fff" style={this.styleBtn}>确定</div>
            </div>
        )
    }
}