/**
 * Created by yejia_alice on 2017/3/12.
 */
var Dispatcher = require('flux').Dispatcher;
var dispatcher = new Dispatcher();
var store1, store2, store3;
store1.id = dispatcher.register( function (action){
  // dispatcher.waitFor([id2]); // 会死循环
  console.log('callback1');
});

// 如何让callback2最后执行？用waitFor
store2.id = dispatcher.register( function (action){
  dispatcher.waitFor([store1.id, store2.id]); // waitFor 用来排序
  console.log('callback2');
});

store3.id = dispatcher.register( function (action){
  console.log('callback3');
});

dispatcher.dispatch();