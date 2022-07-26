'use strict';
import './Store';

function Button(props) {
  return <div class="col-sm-6 smallpad">
    <button type="button" class="btn btn-primary btn-block" id={props.id} onclick={() => v.$store.commit(props.onclick)}>
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
            <Button id="run" onclick='run' label="Create 1,000 rows"/>
            <Button id="runlots" onclick='runLots' label="Create 10,000 rows"/>
            <Button id="add" onclick='add' label="Append 1,000 rows"/>
            <Button id="update" onclick='update' label="Update every 10th row"/>
            <Button id="clear" onclick='clear' label="Clear"/>
            <Button id="swaprows" onclick='swapRows' label="Swap Rows"/>
          </div>
        </div>
      </div>
    </div>
    <table class="table table-hover table-striped test-data">
      <tbody id="tbody" v-for={v.$store.state.data}>
        {
          ({id, label}) => <tr data={label} class={id === v.$store.state.selected ? 'danger' : ''} onbeforeupdate={(n, o) => n.props.class !== o.props.class || n.props.data !== o.props.data }>
            <td class="col-md-1">{id}</td>
            <td class="col-md-4"><a onclick={() => v.$store.commit('select', id)}>{label}</a></td>
            <td class="col-md-1"><a onclick={() => v.$store.commit('remove', id)}><span class="remove glyphicon glyphicon-remove" aria-hidden="true" v-once/></a></td>
            <td class="col-md-6" v-once/>
          </tr>
        }
      </tbody>
    </table>
  </div>;
};

v.mount('#main', Component);
