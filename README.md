### 参考地址

    dva文档地址: https://dvajs.com/guide/
    MDN地址: https://developer.mozilla.org/zh-CN/
    HTML5Demos API演示地址: https://bestvpn.org/html5demos/
    mockjs参考地址: https://github.com/nuysoft/Mock/wiki/Getting-Started

### 创建dva项目

    安装dva脚手架:
        npm install dva-cli -g

    

    查看版本信息:
        dva -v

    

    初始化项目: 
        dva new dva_study

### 将访问路径history模式的替换普通模式

``` 
npm install history --save

// index.js入口文件中引入配置
import { createBrowserHistory as createHistory } from 'history'

const app = dva({
    history: createHistory()
})
```

### 整合antd ui库

    安装:
        npm install antd babel-plugin-import --save

``` 
// .webpackrc中加入配置, 配置完成后就可以按需加载了
{
  "extraBabelPlugins": [
    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
  ]
}
```

### model的使用

``` 
// 示例

// models/product.js文件
export default {
    namespace: 'product',

    state: {
        productList: [
            {name: 'xxx'},
            {name: 'lll'}
        ]
    },

    reducers: {
        updateList(state, action) {
            let _state = deepCopy(state)
            _state.productList.push(action.payload)
            return _state
        }
    }
}

function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj))
}

// ProductPage.jsx文件
import React from 'react'
import ProductList from '../../components/ProductList'
import {connect} from 'dva'

 class ProductPage extends React.Component {
    render() {
        const { product, dispatch } = this.props

        return (
            <div>
                product
                <ProductList dispatch={dispatch} product={product}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        product: state.product
    }
}

export default connect(mapStateToProps)(ProductPage)

// ProductList.jsx文件
import React from 'react'
import {Button} from 'antd'

export default function ProductList({ product, dispatch }) {

    function onClickHandle() {
        dispatch({
            type: 'product/updateList',
            payload: {
                name: 'mystic'
            }
        })
    }

    return (
        <div>
            product list
            <ul>
                {
                    product.productList.map((element, index) => {
                    return <li key={index}>{element.name}</li>
                    })
                }
            </ul>
            <Button onClick={onClickHandle}>add</Button>
        </div>
    )
}
```

### routerRedux 实现路由跳转

``` 
import React from 'react'
import {Button} from 'antd'
import {routerRedux} from 'dva/router'

export default function ProductList({ product, dispatch }) {

    function onClickHandle() {
        dispatch({
            type: 'product/updateList',
            payload: {
                name: 'mystic'
            }
        })
    }

    // routerRedux 路由跳转方案
    function routerReduxHandle() {
        dispatch(routerRedux.push('/'))
    }

    return (
        <div>
            product list
            <ul>
                {
                    product.productList.map((element, index) => {
                    return <li key={index}>{element.name}</li>
                    })
                }
            </ul>
            <Button onClick={onClickHandle}>add</Button>
            <Button onClick={routerReduxHandle}>go to home</Button>
        </div>
    )
}
```

### model异步操作

``` 
export default {
    namespace: 'product',

    state: {
        productList: [
            {name: 'xxx'},
            {name: 'lll'}
        ]
    },

    

    reducers: {
        updateList(state, action) {
            let _state = deepCopy(state)
            _state.productList.push(action.payload)
            return _state
        }
    },

    // 异步操作
    effects: {
        *updateListAsync({payload}, {call, put}) {
            yield put({
                type: 'updateList',
                payload
            })
        }
    }
}

function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj))
}
```

### mock 数据

安装

    npm install mockjs --save

参考资料: 

    https://github.com/nuysoft/Mock/wiki/Getting-Started

对.roadhogrc.mock.js文件进行改造

``` 
const fs = require('fs')
const path = require('path')

let mock = {}

// 同步读取里面的文件和文件夹 , 第一个参数是路径, 第二个参数是一个执行成功之后的回调
fs.readdirSync(path.resolve(__dirname, './mock')).forEach(
    file => {
        // 对文件后缀进行匹配
        if(file.match(/\.js$/)) {
            Object.assign(mock, require('./mock/' + file))
        }
    }
)

export default mock
```

/utils/request.js文件 中加入对post请求的处理

``` 
import fetch from 'dva/fetch';
const qs = require('querystring')

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
}

export function post(url, params) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'accept': 'application/json text/plain */*'
    },
    body: qs.stringify(params)
  })
}
```

/mock 文件夹下面创建需要请求的api接口和数据

``` 
// get示例
export default {
    "get /api/product": {
        name: 'text mock'
    }
}

// post示例
export default {
    "post /api/user": (req, res) => {
        res.send({
            msg: 'login success'
        })
    }
}

// mock数据示例
// 使用前需要安装mockjs依赖
// 直接复制官方文档的一个例子作为演示

export default {
    'get /api/mock': (req, res) => {
        // 使用 Mock
        var Mock = require('mockjs')
        var data = Mock.mock({
            // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
            'list|1-10': [{
                // 属性 id 是一个自增数，起始值为 1，每次增 1
                'id|+1': 1
            }]
        })
        res.send(data)

        // 输出结果
        // console.log(JSON.stringify(data, null, 4))
    }
}
```

### model api

subscription

``` 
subscriptions: {
    setup({ dispatch, history }) {
        window.onresize = () => {
            dispatch({
                type: 'updateList',
                payload: {
                    name: 'window resize'
                }
            })
        }
    },
    logHistory({ dispatch, history }) {
        history.listen(location => {
            console.log('history', location)
        })

    }
}
```

### models文件的自动导入 (使用require.context实现前端自动化)

参考地址: 

    https://www.jianshu.com/p/c894ea00dfec

``` 
// models/index.js 在models文件夹下面创建一个index.js文件, 作为唯一暴露的出口文件
const context = require.context('./', false, /\.js$/)

export default context
    .keys()
    .filter(item => item !== './index.js')
    .map(key => context(key))

// 在src/index.js文件中引入所有的模块
require('./models').default.forEach(context => {
    // 这里获取到的是每个model的上下文对象
    // console.log(context)
    app.model(context.default)
})
```

### redux-actions

参考地址: 

    https://github.com/redux-utilities/redux-actions

dva中抽离actions的一个插件, 并非一定要有
