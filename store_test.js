/**
 * Created by yejia_alice on 2017/3/12.
 */
'use strict';
const Dispatcher = require('flux').Dispatcher;
const dispatcher = new Dispatcher;
const Store = require('flux/utils').Store;

class MyStore extends Store {

  constructor(dispatcher) {
    super(dispatcher);
    this.data = '';
  }

  // step2
  __onDispatch(action){
    this.__changed = true;
    switch (action.type) {
      case 'update':
        this.data += action.data;
        break;
    }
  }
}

let store = new MyStore(dispatcher);
let store2 = new MyStore(dispatcher);
// UI调用
store.addListener(function callback(args) {
  console.log('args: ', args);
  console.log('data: ', store.data);
});
store2.addListener(function callback(args) {
  console.log('args2: ', args);
  console.log('data2: ', store2.data);
});
// UI动作
// step1
dispatcher.dispatch({
  type: 'update',
  data: 'yejia',
});