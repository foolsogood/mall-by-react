import React, { PureComponent } from "react";
//公共组件
import WithFooter from "components/common-components/withFooter";
import { Element, Link } from "react-scroll";

@WithFooter
class cateify extends PureComponent {
  constructor() {
    super();
    this.state = {
      list: [],
    };
  }
  componentDidMount() {
    this.getCates();
  }
  async getCates() {
    const url = window.$api.category.getCates;
    try {
      const res = await window.$apiServer.get(url);
      let arr = res.data.map(item => {
        return this.getGoodsList(item.cateId);
      });
      this.setState({
        list: await Promise.all(arr)
      });
    } catch (err) {
      window.$commonErrorHandler(url)(err);
    }
  }
  getGoodsList(cateId) {
    return window.$apiServer
      .get(window.$api.good.getGoodsByCate, { query: { cateId } })
      .then(res => {
        return res.data;
      });
  }
  render() {
    const {list}=this.state
    return (
      <div className="classify">
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
            zIndex: "99"
          }}
        >
          <div className="classify-title">
              {list.map((item, idx) => {
                return (
                  <div className="item" key={idx}>
                    <Link
                      to={`anchor-` + item[0].cateId}
                      spy={true}
                      smooth={true}
                      duration={500}
                      offset={-50}
                      activeClass="active"
                    >
                      <span >{item[0].cate}</span>
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
        <div
          style={{
            position: "relative",
            top: ".8rem"
          }}
        >
          {list.map((cate_item, idx) => {
            return (
              <Element key={idx} name={`anchor-${cate_item[0].cateId}`}>
                <div>
                  <div className="bg-fff pd-h-20">
                    <div className="flex-box h-80 bg-fff title">
                      {cate_item[0].cate}
                    </div>
                    {cate_item.map(item => {
                      return (
                        <div key={item.goodId} className="classify-block ">
                          <Link to={`/goodDetail/${item.goodId}`}>
                            <div className="flex-box flex-ver-box">
                              <img
                                className="classify-good-img"
                                src={JSON.parse(item.imgs)[0]}
                                alt=""
                              />
                              <p>{item.goodName}</p>
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                  <div className="hr" />
                </div>
              </Element>
             
            );
          })}
        </div>
      </div>
    );
  }
}
export default cateify;
