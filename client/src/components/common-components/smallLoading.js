import React, { PureComponent } from 'react'
import { Icon } from 'antd-mobile'
import { observer } from 'mobx-react'
import store from 'store'
const _sLoading= observer(class SmallLoading extends PureComponent {
    render() {
        const {isLoadingShow,loadingTxt}=store.commonQuery.loading
        const style = {
            position: 'fixed',
            left: '50%',
            top: '50%',
            margin: '-1rem 0 0 -1rem',
            zIndex:999,
            width: '2rem',
            height: '2rem',
            background: 'rgba(0,0,0,.5)',
            borderRadius: '5%',
        }
        const isShow = { opacity: isLoadingShow?1:0 }
        
        return (
            <div className="flex-box flex-ver-box" style={{ ...style, ...isShow }}>
                <Icon type="loading" style={{ fontSize: '.4rem', color: '#444' }} />
                <span className="color-fff" style={{ lineHeight: '.7rem' }}>{loadingTxt}</span>
            </div>
        )
    }
})
export default _sLoading