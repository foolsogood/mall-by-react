import React from "react";
import {
  List,
  Button,
  Flex,
  WhiteSpace,
  WingBlank,
  InputItem
} from "antd-mobile";
import { createForm } from "rc-form";

import WithHeader from "components/common-components/withHeader";

//引入mobx相关
import { observer } from "mobx-react";
import store from "store";
@observer
@WithHeader({ titleText: "绑定手机" })
class BindPhone extends React.Component {
  constructor(){
    super()
    this.state={
      isCodeBtnEnabled:false
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        console.log(e);
      } else {
        const query = { 
          phone: this.props.form.getFieldValue("phone") ,
          code: this.props.form.getFieldValue("code") ,

        };
        const url = $api.phone.bindPhone;
        $apiServer
          .post(url, { query })
          .then(res => {})
          .catch($commonErrorHandler.apply(this, [url]));
      }
    });
  };
  sendSms=async ()=>{
    const query = { phone: this.props.form.getFieldValue("phone") };
    const url = $api.phone.sendSms;
    $apiServer
      .get(url, { query })
      .then(res => {})
      .catch($commonErrorHandler.apply(this, [url]));
  }
  render() {
    const {isCodeBtnEnabled}=this.state
    const { getFieldProps } = this.props.form;
    return (
      <div style={{ paddingTop: ".2rem" }}>
        <WingBlank>
          <List>
            <InputItem
              {...getFieldProps("phone")}
              type="phone"
              placeholder="手机号"
              clear
              moneyKeyboardAlign="left"
            />
          </List>

          <WhiteSpace />
          <List>
            <div className="flex-box flex-ju-c-bt">
              <div className="flex-1">
                <InputItem
                  {...getFieldProps("code")}
                  type="text"
                  placeholder="验证码"
                  clear
                  moneyKeyboardAlign="left"
                />
              </div>

              <Button
                type="ghost"
                inline
                size="small"
                className="am-button-borderfix"
                disabled={isCodeBtnEnabled}
                onClick={this.sendSms}
              >
                获取验证码
              </Button>
            </div>
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
        </WingBlank>
      </div>
    );
  }
}
const bind_phone = createForm()(BindPhone);

export default bind_phone;
