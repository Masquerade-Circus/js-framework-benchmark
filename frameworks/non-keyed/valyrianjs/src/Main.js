'use strict';
// import 'valyrian.js';
import '../../../../../../ownprojects/valyrian';
// import './v';
import Store from './Store';

function Button({id, onclick, label}) {
  return <div class="col-sm-6 smallpad">
    <button type="button" class="btn btn-primary btn-block" id={id} onclick={onclick}>
      {label}
    </button>
  </div>;
};

let handlers = [];

const targetMap = new WeakMap();

function track(target, key, val) {
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }
  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, (dep = new Set()));
  }
  dep.add(val);
}

function trigger(target, key) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let dep = depsMap.get(key);
  if (dep) {
    dep.forEach(effect => (effect(...args)));
  }
}

v.directive('bind', ([obj, prop, attribute, handler], vnode, oldVnode) => {


  let desc = Object.getOwnPropertyDescriptor(obj, prop);
  let newGet;
  let newSet;
  //these cases make little sense, so do nothing we won't be watching readonly descriptors
  if (!desc.configurable
      || (desc.value === undefined && !desc.set)
      || desc.writable === false) {

  } else {

    if ('value' in desc) {
      let val = desc.value;
      newGet = () => val;
      newSet = function (newVal) {
        val = newVal;
        const depsMap = targetMap.get(obj);
        if (depsMap) {

          let dep = depsMap.get(prop);
          if (dep) {
            dep.forEach((handler) => handler(newVal));
          }
        }
      };
      Object.defineProperty(obj, prop, {
        get: newGet,
        set: newSet,
        configurable: true,
        enumerable: desc.enumerable
      });
    }

    let currentHandler = (newVal) => {
      let value = handler ? handler(newVal) : newVal;
      if (attribute === 'text') {
        if (vnode.dom.childNodes[0]) {
          if (value !== vnode.dom.childNodes[0].nodeValue) {
            vnode.dom.childNodes[0].nodeValue = value;
          }
        } else {
          vnode.dom.appendChild(document.createTextNode(value));
        }
      } else if (attribute in vnode.dom && !vnode.isSVG && value !== vnode.dom[attribute]) {
        vnode.dom[attribute] = value;
        if (oldVnode) {
          oldVnode.props[attribute] = value;
        }
      } else if (value !== vnode.dom.getAttribute(attribute)) {
        vnode.dom.setAttribute(attribute, value);
        if (oldVnode) {
          oldVnode.props[attribute] = value;
        }
      }
    };

    track(obj, prop, currentHandler);
    currentHandler(obj[prop]);

    // handlers.push([obj, vnode, oldVnode, attribute, handler]);
  }


});

function Component() {
  v.onCleanup(() => handlers = []);
  return <div class="container">
    <div class="jumbotron" v-once>
      <div class="row">
        <div class="col-md-6"><h1>Valyrian.js</h1></div>
        <div class="col-md-6">
          <div class="row">
            <Button id="run" onclick={Store.run} label="Create 1,000 rows"/>
            <Button id="runlots" onclick={Store.runLots} label="Create 10,000 rows"/>
            <Button id="add" onclick={Store.add} label="Append 1,000 rows"/>
            <Button id="update" onclick={(e) => {
              Store.update();
              e.preventDefault();
            }} label="Update every 10th row"/>
            <Button id="clear" onclick={Store.clear} label="Clear"/>
            <Button id="swaprows" onclick={Store.swapRows} label="Swap Rows"/>
          </div>
        </div>
      </div>
    </div>
    <table class="table table-hover table-striped test-data">
      <tbody v-for={Store.state.data} id="tbody">
        {(item) => {
          let {id, label} = item;
          return <tr data={label} onbeforeupdate={(n, o) => label !== o.props.data }
            v-bind={[Store.state, 'selected', 'className', (val) => id === Store.state.selected ? 'danger' : '']}
          >
            <td class="col-md-1">{id}</td>
            <td class="col-md-4"><a
              onclick={(e) => {
                Store.select(id);
                e.preventDefault();
              }}
              v-bind={[item, 'label', 'text']}
            ></a></td>
            <td class="col-md-1"><a onclick={() => Store.remove(id)}><span class="remove glyphicon glyphicon-remove" aria-hidden="true" v-once/></a></td>
            <td class="col-md-6" v-once/>
          </tr>
          ;
        }}
      </tbody>
    </table>
  </div>;
};

v.mount('#main', Component);
