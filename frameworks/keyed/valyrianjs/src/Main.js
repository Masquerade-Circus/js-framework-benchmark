'use strict';
// import 'valyrian.js';
import '../../../../../../ownprojects/valyrian/dist/valyrian.min';
// import './v';
import Store from './Store';

function Button(props) {
  return <div class="col-sm-6 smallpad">
    <button type="button" class="btn btn-primary btn-block" id={props.id} onclick={props.onclick}>
      {props.label}
    </button>
  </div>;
};

function Component() {
  return <div class="container">
    <div class="jumbotron" v-once>
      <div class="row">
        <div class="col-md-6"><h1>Valyrian.js</h1></div>
        <div class="col-md-6">
          <div class="row">
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
    <table class="table table-hover table-striped test-data">
      <tbody id="tbody" v-for={Store.state.data}>
        {
          ({id, label}) => <tr key={id} data={label} class={id === Store.state.selected ? 'danger' : ''} onbeforeupdate={(n, o) => n.props.class !== o.props.class || n.props.data !== o.props.data }>
            <td class="col-md-1">{id}</td>
            <td class="col-md-4"><a onclick={() => Store.select(id)}>{label}</a></td>
            <td class="col-md-1"><a onclick={() => Store.remove(id)}><span class="remove glyphicon glyphicon-remove" aria-hidden="true" v-once/></a></td>
            <td class="col-md-6" v-once/>
          </tr>
        }
      </tbody>
    </table>
  </div>;
};

v.mount('#main', Component);
