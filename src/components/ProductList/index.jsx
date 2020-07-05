import React, {useEffect} from 'react'
import {Button} from 'antd'
import {routerRedux} from 'dva/router'
import * as api from '../../utils/request'

export default function ProductList({ product, dispatch }) {
    useEffect(() => {
        api.request('/api/product')
        .then(res => {
            console.log(res)
        })

        api.post('/api/user')
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })

        api.request('/api/mock')
        .then(data => {
            console.log('mock', data)
        })
    })

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

    function addLitAsync () {
        console.log('click')
        dispatch({
            type: 'product/updateListAsync', 
            payload: {
                name: 'abcde'
            }
        })
    }

    function addListHttp() {
        console.log(111)
        dispatch({
            type: 'product/fetchProductHttp',
            payload: {
                id: 1001
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
            <Button onClick={routerReduxHandle}>go to home</Button>
            <Button onClick={addLitAsync}>add async</Button>
            <Button onClick={addListHttp}>http</Button>
        </div>
    )
}