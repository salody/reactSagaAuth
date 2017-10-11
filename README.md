## 项目备注

### Api地址
http://localhost:3002/

### 启动API docker
docker-compose down

docker-compose up -d

### redux-saga
* redux-saga 是一个用于管理 Redux 应用异步操作（Side Effects。译注：直译成 “副作用” 不太通顺，所以这里译为 “异步操作” 更好理解）的中间件（又称异步 action）。 redux-saga 通过创建 Sagas 将所有的异步操作逻辑收集在一个地方集中处理，可以用来代替 redux-thunk 中间件

* 一些异步的action将被放入sagas中来处理。这将使得所有的action保持纯净。而不像thunk一样异步的东西也扔到action中

### 单元测试
如果需要对组件做单元测试，将源组件export出去，而connected的组件作为default来export。

因为你不需要关系redux wrapper是否工作正常（你不需要测试redux）。你只需要保证自己的组件正常就行