import React,{Component} from 'react';
import ReactDOM from 'react-dom';

import './style.less';

//测试html-loader
import tabContent from './template.html';
console.log(tabContent)

class App extends Component {
  render(){
    return (
      <div className="my-app">
        <p className="icon">hello world boy</p>
        {/* 在js文件中引用图片，正确的写法是通过模块化require的方式引用图片路径 */}
        <div className="box"><img src={require("./test/xhr.png")} /></div>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('container'));
