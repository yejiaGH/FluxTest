/**
 * Created by yejia_alice on 2017/3/12.
 */
const React = require('react');
const ReactDOM = require('react-dom');
const Dispatcher = require('flux').Dispatcher;
const dispatcher = new Dispatcher;
const Store = require('flux/utils').Store;
class ListStore extends Store {
  constructor(dispatcher){
    super(dispatcher);
    this.state = [];
  }

  __onDispatch(action) {
    switch (action.type) {
      case 'add':
        this.__changed = true;
        this.state.push(action.item);
        break;
    }
  }
}

let store = new ListStore(dispatcher);
class ContainerUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    this.remove = store.addListener(()=>this.setState({
      list: store.state,
    }));
  }

  componentWillUnMount() {
    this.remove();
  }
  click() {
    let value = this.refs.input.value;
    let addAction = {
      type: 'add',
      item: value,
    };
    dispatcher.dispatch(addAction);
  }
  render() {
    let list = this.state.list.map(item=><li>{item}</li>);
    return <ul>
      <li>
        <input type="text" ref="input" />
        <button onClick = {this.click.bind(this)}>add</button></li>
      {list}
    </ul>
  }
}

ReactDOM.render(<ContainerUI />, document.body);