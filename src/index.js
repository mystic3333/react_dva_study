import dva from 'dva';
import { createBrowserHistory as createHistory } from 'history'

const app = dva({
    history: createHistory()
})

// 1. Initialize
// const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);
// app.model(require('./models/product').default)
require('./models').default.forEach(context => {
    // 这里获取到的是每个model的上下文对象
    // console.log(context)
    app.model(context.default)
})

// 4. Router
app.router(require('./router').default);


// 5. Start
app.start('#root');
