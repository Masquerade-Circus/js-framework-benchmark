'use strict';
import v from './index2.ts';
// import {v} from './v.ts';
// import {v} from '../../../../../../ownprojects/valyrian/dist/index.js';
// import '../../../../../../ownprojects/valyrian/dist/valyrian.min.js';
import Store from './Store';

function Button(props) {
  return <div className="col-sm-6 smallpad">
    <button type="button" className="btn btn-primary btn-block" id={props.id} onclick={props.onclick}>
      {props.label}
    </button>
  </div>;
};

function Component() {
  return <div className="container">
    <div className="jumbotron" v-once>
      <div className="row">
        <div className="col-md-6"><h1>Valyrian.js Ts Lite</h1></div>
        <div className="col-md-6">
          <div className="row">
            <Button id="run" onclick={Store.run} label="Create 1,000 rows"/>
            <Button id="runlots" onclick={Store.runLots} label="Create 10,000 rows"/>
            <Button id="add" onclick={Store.add} label="Append 1,000 rows"/>
            <Button id="update" onclick={Store.update} label="Update every 10th row"/>
            <Button id="clear" onclick={Store.clear} label="Clear"/>
            <Button id="swaprows" onclick={Store.swapRows} label="Swap Rows"/>
          </div>
        </div>
      </div>
    </div>
    <table className="table table-hover table-striped test-data">
      <tbody id="tbody" v-for={Store.state.data}>
        {
          ({id, label}) => <tr state={label} className={id === Store.state.selected ? 'danger' : ''} shouldupdate={(n, o) => n.props.className !== o.props.className || n.props.state !== o.props.state }>
            <td className="col-md-1">{id}</td>
            <td className="col-md-4"><a onclick={() => Store.select(id)}>{label}</a></td>
            <td className="col-md-1"><a onclick={() => Store.remove(id)}><span className="remove glyphicon glyphicon-remove" aria-hidden="true" v-once/></a></td>
            <td className="col-md-6" v-once/>
          </tr>
        }
      </tbody>
    </table>
  </div>;
};

v.mount('#main', Component);

