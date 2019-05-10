import React from "react";
import { Input } from "antd";
import { Button } from "antd-mobile";
import WithHeader from "components/common/withHeader";

const { TextArea } = Input;
@WithHeader({ titleText: "意见反馈" })
class feedback extends React.Component {
    constructor(){
        super()
        this.state={
            tips:''
        }
    }
  handleSubmit = e => {
    e.preventDefault();
    console.log(e);
  };
  onChangeHandler=e=>{
      const {value}=e.target
      this.setState({
        tips:value
      })
  }
  
  render() {
      const styleBtnContainer = {
        position: "fixed",
        bottom: "0",
        left: "0",
        right: "0",
        width: "100%",
        borderRadius: "0"
      };
    return (
      <div>
        <TextArea rows={8} onChange={this.onChangeHandler} placeholder="有什么好的意见或建议?" />

        <Button type="primary" onClick={this.handleSubmit} style={styleBtnContainer}>
          确认
        </Button>
      </div>
    );
  }
}
export default feedback;
