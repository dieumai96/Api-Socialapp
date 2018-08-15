import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
const middleware = [thunk];
const store = createStore(() => [], {}, applyMiddleware(...thunk));

export default store;