import React, { PureComponent } from "react";
//公共组件
import WithFooter from "components/hocs/withFooter";
import { Element ,  Link } from "react-scroll";
interface Props{
  history?:any,
}
interface State{
  list: any[],
}
@WithFooter
class cateify extends PureComponent <Props,State> {
  constructor(props) {
    super(props);
    this.state = {
      list: null,
    };
  }
  componentDidMount() {
    this.getCates();
  }
  async getCates() {
    const url = window.$api.category.getCates;
    try {
      const res = await window.$http.get(url);
      const arr = res.data.map(item => {
        return this.getGoodsList(item.cateId);
      });
      await this.setState({
        list: await Promise.all(arr)
      });
    } catch (err) {
      window.$commonErrorHandler(url)(err);
    }
  }
  toGooddetail =(goodId:string)=>{
    this.props.history.push({
      pathname:`/goodDetail/${goodId}`
    })
  }
  getGoodsList(cateId:string):any[] {
    return window.$http
      .get(window.$api.good.getGoodsByCate, { params: { cateId } })
      .then(res => {
        return res.data;
      });
  }
  render() {
    const {list}=this.state
    console.log(list)
    if(!list){
      return null
    }
    return (
      <div className="classify">
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
            zIndex: 99
          }}
        >
          <div className="classify-title">
              {list.map((item, idx) => {
                if(Array.isArray(item.rows)&&!item.rows.length){
                  return null
                }
                return (
                  <div className="item" key={idx}>
                    <Link
                      to={`anchor-` + item.rows[0].cateId}
                      spy={true}
                      smooth={true}
                      duration={500}
                      offset={-50}
                      activeClass="active"
                    >
                      <span >{item.rows[0].cate}</span>
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
            if(Array.isArray(cate_item.rows)&&!cate_item.rows.length){
              return null
            }
            return (
              <Element key={idx} name={`anchor-${cate_item.rows[0].cateId}`}>
                <div>
                  <div className="bg-fff pd-h-20">
                    <div className="flex-box h-80 bg-fff title">
                      {cate_item.rows[0].cate}
                    </div>
                    {cate_item.rows.map(item => {
                      return (
                        <div onClick={()=>this.toGooddetail(item.goodId)} key={item.goodId} className="classify-block ">
                          {/* <Link to={`/goodDetail/${item.goodId}`}> */}
                            <div  className="flex-box flex-ver-box">
                              <img
                                className="classify-good-img"
                                src={item.imgs[0]}
                                alt=""
                              />
                              <p>{item.goodName}</p>
                            </div>
                          {/* </Link> */}
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
