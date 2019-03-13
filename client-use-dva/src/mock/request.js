import { mockApi } from "./index";
import { Modal } from "antd-mobile";
const alert = Modal.alert;

const unable = () => {
    alert("当前为mock环境");
};
export const mockRequest = obj => {
  const { url, originUrl } = obj;
  // console.log(url)
  // 此接口在mockApi中找不到
  if (!mockApi.hasOwnProperty([url]) && !mockApi.hasOwnProperty([originUrl])) {
    unable();
    return 
  }
  if (url === originUrl) {
    return {
      code: 1,
      data: mockApi[url]
    };
  }
  return {
    code: 1,
    data: mockApi[originUrl](url)
  };
};
export default mockRequest;
