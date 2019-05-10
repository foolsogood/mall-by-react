import React from 'react';
import {
  List,
  Button,
  WhiteSpace,
  WingBlank,
  InputItem,
  Toast
} from 'antd-mobile';
import { createForm } from 'rc-form';

import { connect } from 'dva';
interface Props {
  app?: any;
  dispatch?: (args) => void;
  form?: any;
}
interface State {
  isCodeBtnEnabled: boolean;
}
@createForm()
@connect(({ app }) => ({ app }))
class BindPhone extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      isCodeBtnEnabled: false
    };
  }
  handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    const {
      form: { validateFields, getFieldValue }
    } = this.props;
    e.preventDefault();
    validateFields(async (err, values) => {
      if (!err) {
        const query = {
          phone: getFieldValue('phone'),
          code: getFieldValue('code')
        };
        query.phone = query.phone.replace(/\s/g, '');
        const url = window.$api.phone.bindPhone;
        try {
          const res = await window.$http.post(url, { query });
          Toast.info(res.msg);
        } catch (err) {
          window.$commonErrorHandler(url)(err);
        }
      }
    });
  };
  sendSms = async () => {
    const query = { phone: this.props.form.getFieldValue('phone') };
    query.phone = query.phone.replace(/\s/g, '');
    const url = window.$api.phone.sendSms;
    try {
      await window.$http.get(url, { query });
    } catch (err) {
      window.$commonErrorHandler(url)(err);
    }
  };
  render() {
    const { isCodeBtnEnabled } = this.state;
    const {
      form: { getFieldProps },
      app: { user }
    } = this.props;
    return (
      <div style={{ paddingTop: '.2rem' }}>
        <WingBlank>
          <List>
            <InputItem
              {...getFieldProps('phone')}
              type="phone"
              placeholder="输入手机号"
              defaultValue={user && user.phone ? user.phone : null}
              clear
              moneyKeyboardAlign="left"
            />
          </List>

          <WhiteSpace />
          <List>
            <div className="flex-box flex-ju-c-bt">
              <div className="flex-1">
                <InputItem
                  {...getFieldProps('code')}
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
                style={{ color: '#fff' }}
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
              style={{ color: '#fff' }}
            >
              提交
            </Button>
          </List>
        </WingBlank>
      </div>
    );
  }
}

export default BindPhone;
