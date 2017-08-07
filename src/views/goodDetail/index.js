
import React, { Component } from 'react'
import { Tabs } from 'antd'
// 公共组件
import TitleBar from '../../components/common-components/titleBar.js'
import Banner from '../../components/common-components/banner'
// 组件
import Comments from '../../components/good-components/comments'
import GoodFooter from '../../components/good-components/goodFooter'
// mockData
import { mockData } from '../../mockData'
const TabPane = Tabs.TabPane
export default class GoodDetail extends Component {
    constructor() {
        super()
        this.state = {
           
            ifBackShow: true,
            imgList: [''],
            detailList:[''],
            goodId: '',
            cateId: '',
            goodInfo: {}
        }
    };
    componentWillMount() {
        //    获取上一个路由传参
        let goodId = this.props.match.params.id
        let cateId = this.props.match.params.cateId
        this.setState({
            goodId,
            cateId
        })
    };
    componentDidMount() {
        this._getGoodInfo()

    };
    _getGoodInfo() {
        let goodList = mockData.goodList
        for (let i in goodList) {
            if (i === this.state.cateId) {
                let obj = goodList[i].list
                for (let j in obj) {
                    if (j === this.state.goodId) {
                        let goodInfo = obj[j]
                        this.setState({
                            goodInfo,
                            // 在jsx找中直接传goodInfo.imgList在子组件中取不到
                            imgList:goodInfo.imgList,
                           detailList:goodInfo.detail
                        })
                    }
                }
            }

        }
    };
    render() {
        const {goodInfo,imgList,detailList} = this.state
        return (
            <div>
                <div className="good-detail">
                    <TitleBar  ifBackShow={this.state.ifBackShow} titleText="商品页" />
                    < Banner imgList={imgList} />

                    <div className="bg-fff detail-text">
                        <p className="p-1">{goodInfo.name}}</p>
                        <p>{goodInfo.desc}</p>
                        <p className="p-2 price">¥{goodInfo.price}</p>
                    </div>
                    <div className="hr"></div>
                    <div className="bg-fff">
                        <Tabs defaultActiveKey="1" >
                            <TabPane tab="商品详情" key="1">
                               {
                                   detailList.map((item,idx)=>{
                                       return(
                                           <img key={idx} className="detail-img" src={item} alt="" />
                                       )
                                   })
                               }
                                
                            </TabPane>
                            <TabPane tab="商品评论" key="2">
                                <Comments rateList={goodInfo.rate} />
                            </TabPane>
                        </Tabs>
                    </div>
                    <GoodFooter goodInfo={goodInfo}/>
                </div>
            </div>
        )
    }
}