import React, { Component } from "react";

export default class classifyTitle extends Component {
  _goAchor = (cateId, e) => {
      console.log(cateId)
    if (cateId) {
      let ele = document.getElementById(cateId);
      if (ele) {
        ele.scrollIntoView();
      }
    }
  };
  render() {
    return (
      <div className="classify-title">
        <ul>
          {this.props.titleArr.map((item, idx) => {
            return (
              <li key={idx}>
                <a
                  href="javascript:;"
                  onClick={() => this._goAchor(`#anchor-` + item[0].cateId)}
                >
                  {item[0].cate}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
