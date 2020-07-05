import * as api from '../services/example'

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

    subscriptions: {
        setup({dispatch, history}) {
            window.onresize = () => {
                dispatch({
                    type: 'updateList',
                    payload: {
                        name: 'window resize'
                    }
                })
            }
        },
        logHistory({dispatch, history}) {
                history.listen(location => {
                    console.log('history',location)
                })
            
        }
    },

    // 异步操作
    effects: {
        *updateListAsync({payload}, {call, put}) {
            yield put({
                type: 'updateList',
                payload
            })
        },

        *fetchProductHttp({payload}, {call, put}) {
            const result = yield call(api.getProduct, payload)
            console.log(result)
            const data = result.data
            yield put({
                type: 'updateList',
                payload: data 
            })
        }
    }
}

function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj))
}