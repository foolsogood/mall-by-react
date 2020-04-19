import React, { Component } from "react";
import { Row, Col } from "antd";
import { Link } from "dva/router";
import Iconfont from 'components/iconfont/index'

interface Props{
  path?:string,
}
interface State{
  pathname:string,
}
export default class footer extends Component<Props,State> {
  constructor(props) {
    super(props);
    this.state = {
      pathname: ""
    };
  }
  getPathname():string {
	  //确保在WithFooter传入 props,否则使用window.location.pathname
    return this.props.path ? this.props.path : window.location.pathname;
  }

  render() {
    const iconStyle = { fontSize: ".4rem" };
    const active = { color: "#1296db" };
    const common = { color: "#8a8a8a" };
    return (
      <footer className="footer t-tc">
        <Row>
          <Col span={6}>
            <Link
              to={`/`}
              className="flex-box flex-ver-box"
              style={{ cursor: "pointer" }}
            >
              {this.getPathname() === `/` ? (
                <div className="flex-box flex-ver-box">
                  <Iconfont name="weibiaoti1" {...active} size={20}/>
                  <span style={active}>主页</span>
                </div>
              ) : (
                <div className="flex-box flex-ver-box">
                  <Iconfont name="weibiaoti1" {...common} size={20}/>
                  <span style={common}>主页</span>
                </div>
              )}
            </Link>
          </Col>
          <Col span={6}>
            <Link
              to={`/classify`}
              className="flex-box flex-ver-box"
              style={{ cursor: "pointer" }}
            >
              {this.getPathname() === `/classify` ? (
                <div className="flex-box flex-ver-box">
                  <Iconfont name="fenleitianchong"  {...active} size={20}/>


                  <span style={active}>分类</span>
                </div>
              ) : (
                <div className="flex-box flex-ver-box">

                  <Iconfont name="fenleitianchong" {...common} size={20}/>

                  <span style={common}>分类</span>
                </div>
              )}
            </Link>
          </Col>
          <Col span={6}>
            <Link
              to={`/shopCart`}
              className="flex-box flex-ver-box"
              style={{ cursor: "pointer" }}
            >
              {this.getPathname() === `/shopCart` ? (
                <div className="flex-box flex-ver-box">

                  <Iconfont name="gouwuche"  {...active} size={20}/>

                  <span style={active}>购物车</span>
                </div>
              ) : (
                <div className="flex-box flex-ver-box">

                  <Iconfont name="gouwuche" {...common} size={20}/>

                  <span style={common}>购物车</span>
                </div>
              )}
            </Link>
          </Col>
          <Col span={6}>
            <Link
              to={`/personal`}
              className="flex-box flex-ver-box"
              style={{ cursor: "pointer" }}
            >
              {this.getPathname() === `/personal` ? (
                <div className="flex-box flex-ver-box">
                  
                  <Iconfont name="yonghu"  {...active} size={20}/>

                  <span style={active}>我的</span>
                </div>
              ) : (
                <div className="flex-box flex-ver-box">

                  <Iconfont name="yonghu" {...common} size={20}/>

                  <span style={common}>我的</span>
                </div>
              )}
            </Link>
          </Col>
        </Row>
      </footer>
    );
  }
}
