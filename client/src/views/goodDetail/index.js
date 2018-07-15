
import React, { Component } from 'react'
import { Tabs } from 'antd'
// 公共组件
import TitleBar from 'components/common-components/titleBar.js'
import Banner from 'components/common-components/banner'
// 组件
import Comments from 'components/good-components/comments'
import GoodFooter from 'components/good-components/goodFooter'
import xhr from 'service/xhr'
import api from 'service/api'

const TabPane = Tabs.TabPane
export default class GoodDetail extends Component {
    constructor() {
        super()
        this.state = {
            imgList: [''],
            detailList: [''],
            goodId: '',
            cateId: '',
            goodInfo: {}
        }
    };
    componentWillMount() {
        //    获取上一个路由传参
        let goodId = this.props.match.params.goodId
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
        const query={
           cateId: this.state.cateId,
           goodId: this.state.goodId
        }
        xhr.get(api.good.getGoodById,{query}).then(res => {
            if (res.code === '1') {
                this.setState({
                    goodInfo: res.data,
                    // 在jsx找中直接传goodInfo.imgList在子组件中取不到
                    imgList:  JSON.parse(res.data.imgs),
                    detailList: JSON.parse( res.data.detailImg)
                })
            }
        }).catch(err => { })
    };
    render() {
        const { goodInfo, imgList, detailList } = this.state
        return (
            <div>
                <div className="good-detail">
                    <TitleBar titleText="商品页" />
                    < Banner imgList={imgList} />

                    <div className="bg-fff detail-text">
                        <p className="p-1">{goodInfo.goodName}}</p>
                        <p>{goodInfo.desction}</p>
                        <p className="p-2 price">¥{goodInfo.price}</p>
                    </div>
                    <div className="hr"></div>
                    <div className="bg-fff">
                        <Tabs defaultActiveKey="1" >
                            <TabPane tab="商品详情" key="1">
                                {
                                    detailList.map((item, idx) => {
                                        return (
                                            <img key={idx} className="detail-img" src={item} alt="" />
                                        )
                                    })
                                }

                            </TabPane>
                            <TabPane tab="商品评论" key="2">
                                <Comments rateList={goodInfo.comments} />
                            </TabPane>
                        </Tabs>
                    </div>
                    <GoodFooter goodInfo={goodInfo} />
                </div>
            </div>
        )
    }
}