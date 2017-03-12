/**
 * Created by yejia_alice on 2017/3/12.
 */
'use strict';
const ReduceStore = require('flux/utils').ReduceStore;
const Dispatcher = require('flux').Dispatcher;
const dispatcher = new Dispatcher;
class MyStore extends ReduceStore {
  getInitialState() {
    return {
      name: 'yejia',
    };
  }

  reduce(oldState, action) {
    switch (action.type) {
      case 'add':
        return {name: oldState.name + action.data};
        break;
    }
    return oldState;
  }
}

const store = new MyStore(dispatcher);
store.addListener(function(){
  console.log('call me');
  console.log(store.getState());
});

let action = {
  type: 'add',
  data: '=me'
};
dispatcher.dispatch(action);
dispatcher.dispatch(action);
dispatcher.dispatch(action);