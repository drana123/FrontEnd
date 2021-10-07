import { createStore, combineReducers ,applyMiddleware} from 'redux';
import apiMiddleware from '../Middleware/apiMiddleware';
import reducers from '../reducers';

export default function configureStore() {
  return createStore(
    combineReducers({
      ...reducers
    }),
    applyMiddleware(apiMiddleware)
  );
}
