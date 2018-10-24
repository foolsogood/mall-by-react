
import React, { Component } from 'react'
import { Tabs } from 'antd'
// 公共组件
import WithHeader from 'components/common-components/withHeader'

import Banner from 'components/common-components/banner'
// 组件
import Comments from 'components/good-components/comments'
import GoodFooter from 'components/good-components/goodFooter'
const TabPane = Tabs.TabPane
@WithHeader({ titleText: '商品页' })

 class GoodDetail extends Component {
    constructor() {
        super()
        this.state = {
            imgList: [''],
            detailList: [''],
            goodInfo: {}
        }
    };
    componentDidMount() {
        //    获取上一个路由传参
        let { goodId } = this.props.match.params
        this._getGoodInfo(goodId)
    };
    _getGoodInfo(goodId) {
        const query = {
            goodId
        }
        const url = $api.good.getGoodById
        $apiServer.get(url, { query })
            .then($preAjaxHandler.call(this))
            .then(res => {
                this.setState({
                    goodInfo: res.data,
                    // 在jsx中直接传goodInfo.imgList在子组件中取不到
                    imgList: JSON.parse(res.data.imgs),
                    detailList: JSON.parse(res.data.detailImg)
                })
            }).catch($commonErrorHandler.apply(this, [url]))

    };
    render() {
        const { goodInfo, imgList, detailList } = this.state
        return (
            <div>
                <div className="good-detail">
                    < Banner imgList={imgList} />

                    <div className="bg-fff detail-text">
                        <p className="p-1">{goodInfo.goodName}</p>
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
export default GoodDetail