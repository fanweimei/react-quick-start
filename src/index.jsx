import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from '~/container/App';

import './style';

console.log(`运行时间：${TIME}`);

// 测试html-loader
import tabContent from './template.html';

console.log(tabContent);

class Main extends Component {
  render() {
    return (
      <div className="my-app">
        <App />
        <p ref="tt" className="icon">hello world!</p>
        {/* 在js文件中引用图片，正确的写法是通过模块化require的方式引用图片路径 */}
        <div className="box"><img src={require('./test/xhr.png')} /></div>
      </div>
    );
  }
  componentDidMount() {
    console.log(this.refs.tt.style);
  }
}

ReactDOM.render(<Main />, document.getElementById('container'));
