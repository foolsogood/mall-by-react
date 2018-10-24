import React, { PureComponent } from 'react'
import Loading from './loading'
export default class Bundle extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            mod: null
        };
    }
    componentDidMount() {
        this.load(this.props)
    }

    /**
     * update to v16
     */
    static async getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.load !== prevState.mod) {
            const res = await nextProps.load()
            return {
                mod: res.default
            }
        }
    }

    load = async (props) => {

        //注意这里，使用Promise对象; mod.default导出默认
        const mod = await props.load()
        this.setState({
            mod: mod.default ? mod.default : mod
        });
    }

    render() {
        return this.state.mod ? this.props.children(this.state.mod) : <Loading />;
    }
}