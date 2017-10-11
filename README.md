## 项目备注

### Api地址
http://localhost:3002/

### 启动API docker
docker-compose down

docker-compose up -d

## redux-saga

* redux-saga 是一个用于管理 Redux 应用异步操作（Side Effects。译注：直译成 “副作用” 不太通顺，所以这里译为 “异步操作” 更好理解）的中间件（又称异步 action）。 redux-saga 通过创建 Sagas 将所有的异步操作逻辑收集在一个地方集中处理，可以用来代替 redux-thunk 中间件
* 一些异步的action将被放入sagas中来处理。这将使得所有的action保持纯净。而不像thunk一样异步的东西也扔到action中

### Effects

Effect 是一个 javascript 对象，里面包含描述异步操作的信息，可以通过 yield 传达给 sagaMiddleware 执行

在 redux-saga 世界里，所有的 Effect 都必须被 yield 才会执行，所以有人写了 [eslint-plugin-redux-saga**](http://link.zhihu.com/?target=https%3A//github.com/pke/eslint-plugin-redux-saga) 来检查是否每个 Effect 都被 yield。并且原则上来说，所有的 yield 后面也只能跟Effect，以保证代码的易测性。

例如：

```
yield fetch(UrlMap.fetchData);

```

应该用 call Effect ：

```
yield call(fetch, UrlMap.fetchData)

```

从而可以使代码可测：

```
assert.deepEqual(iterator.next().value, call(fetch, UrlMap.fetchData))
```

关于各个 Effect 的具体介绍，文档已经写得很详细了，这里只做简要介绍。

#### put

作用和 redux 中的 dispatch 相同。

```
yield put({ type: 'CLICK_BTN' });

```

#### select

作用和 redux thunk 中的 getState 相同。

```
const id = yield select(state => state.id);

```

#### take

等待 redux dispatch 匹配某个 pattern 的 action 。

在这个例子中，先等待一个按钮点击的 action ，然后执行按钮点击的 saga：

```
while (true) {
  yield take('CLICK_BUTTON');
  yield fork(clickButtonSaga);
}

```

再举一个利用 take 实现 logMiddleware 的例子：

```
while (true) {
  const action = yield take('*');
  const newState = yield select();
  
  console.log('received action:', action);
  console.log('state become:', newState);
}

```

这种监听一个 action ，然后执行相应任务的方式，在 redux-saga 中非常常用，因此 redux-saga 提供了一个辅助 Effect —— takeEvery ，让 watch/worker 的代码更加清晰。

```
yield takeEvery('*', function* logger(action) {
  const newState = yield select();

  console.log('received action:', action);
  console.log('state become:', newState);
});
```



#### 流程

1. **Our Reducers are the managers and gatekeeprs** for the individual pieces of Redux State awaiting "messages" of what to do with state.

and

2. **Our Actions are sent from our components as "messages"** to the reducer to modify the Redux State.

then

3. **Our Redux Sagas sit between the Actions and Reducers listening for "messages"**. When they hear about a "message" they "care" about, they take take "Actions" into their own hands and go to work. When they've completed their work, they will also dispatch actions.

### react-redux
* [mapDispatchToProps(dispatch, [ownProps]): dispatchProps] (Object or Function): If an object is passed, each function inside it is assumed to be a Redux action creator. An object with the same function names, but with every action creator wrapped into a dispatch call so they may be invoked directly, will be merged into the component’s props.

  If a function is passed, it will be given dispatch as the first parameter. It’s up to you to return an object that somehow uses dispatch to bind action creators in your own way. (Tip: you may use the bindActionCreators() helper from Redux.)

### PropTypes

下面是使用不同验证器的例子：

```
import PropTypes from 'prop-types';

MyComponent.propTypes = {
  // 你可以将属性声明为以下 JS 原生类型
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,

  // 任何可被渲染的元素（包括数字、字符串、子元素或数组）。
  optionalNode: PropTypes.node,

  // 一个 React 元素
  optionalElement: PropTypes.element,

  // 你也可以声明属性为某个类的实例，这里使用 JS 的
  // instanceof 操作符实现。
  optionalMessage: PropTypes.instanceOf(Message),

  // 你也可以限制你的属性值是某个特定值之一
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),

  // 限制它为列举类型之一的对象
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message)
  ]),

  // 一个指定元素类型的数组
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // 一个指定类型的对象
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),

  // 一个指定属性及其类型的对象
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),
  
  // 判断Date类型
  PropTypes.instanceOf(Date)

  // 你也可以在任何 PropTypes 属性后面加上 `isRequired` 
  // 后缀，这样如果这个属性父组件没有提供时，会打印警告信息
  requiredFunc: PropTypes.func.isRequired,

  // 任意类型的数据
  requiredAny: PropTypes.any.isRequired,

  // 你也可以指定一个自定义验证器。它应该在验证失败时返回
  // 一个 Error 对象而不是 `console.warn` 或抛出异常。
  // 不过在 `oneOfType` 中它不起作用。
  customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  },

  // 不过你可以提供一个自定义的 `arrayOf` 或 `objectOf` 
  // 验证器，它应该在验证失败时返回一个 Error 对象。 它被用
  // 于验证数组或对象的每个值。验证器前两个参数的第一个是数组
  // 或对象本身，第二个是它们对应的键。
  customArrayProp: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
    if (!/matchme/.test(propValue[key])) {
      return new Error(
        'Invalid prop `' + propFullName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  })
};
```

### 单元测试
如果需要对组件做单元测试，将源组件export出去，而connected的组件作为default来export。

因为你不需要关系redux wrapper是否工作正常（你不需要测试redux）。你只需要保证自己的组件正常就行

### !!强制转换成bool类型
**遇到数字和&&一定要注意**
```
  true && 0     // 0
  true && !!0   // false
```
&&操作可以应用于任何类型的操作数，而不仅仅是布尔值。在有一个操作数不是布尔值的情况下，就不一定返回布尔值

### Fetch

Note that the `fetch `specification differs from `jQuery.ajax() `in mainly two ways that bear keeping in mind:

- The Promise returned from `fetch()` **won’t reject on HTTP error status** even if the response is an HTTP 404 or 500. Instead, it will resolve normally (with `ok` status set to false), and it will only reject on network failure or if anything prevented the request from completing.
- By default, `fetch` **won't send or receive any cookies** from the server, resulting in unauthenticated requests if the site relies on maintaining a user session (to send cookies, the *credentials* [init option](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters) must be set).

