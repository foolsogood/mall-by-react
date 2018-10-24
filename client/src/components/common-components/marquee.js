import React, { Component } from 'react';
import PropTypes from 'prop-types'

class Marquee extends Component {
  static propTypes = {
    content: PropTypes.node.isRequired,
    gap: PropTypes.number,
    speed: PropTypes.number,
  }

  static defaultProps = {
    gap: 0,
    speed: 20,
  }

  componentDidMount() {
    const { speed } = this.props;
    const wrap = this.refs.wrap;
    const scrollDiv1 = this.refs.content1;
    const scrollDiv2 = this.refs.content2;
    wrap.style.height = scrollDiv1.offsetHeight + 'px';

    function Marquee() {
      if (scrollDiv2.offsetHeight === wrap.scrollTop) {
        wrap.scrollTop -= scrollDiv1.offsetHeight;
      }
      wrap.scrollTop ++;
    }

    let MyMar = setInterval(Marquee, speed);
    wrap.onmouseover = function StartScroll() {
      clearInterval(MyMar);
    };

    wrap.onmouseout = function StopScroll() {
      MyMar = setInterval(Marquee, speed);
    };
  }

  render() {
    const { content } = this.props;
    const hidden={overflow:'hidden'}
    return (
      <div>
        <div ref="wrap" style={hidden}>
          <div ref="content1" style={hidden}>
            {this.props.content}
          </div>
          <div ref="content2" style={hidden}>
            {this.props.content}
          </div>
        </div>
      </div>
    );
  }
}

export default Marquee;