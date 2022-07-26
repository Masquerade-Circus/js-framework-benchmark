// import 'valyrian.js';
import '../../../../../../ownprojects/valyrian/dist/valyrian.min';
import StorePlugin from 'valyrian.js/plugins/store';
v.usePlugin(StorePlugin);

/* eslint max-len: 0 */
function random(max) {
  return Math.round(Math.random() * 1000) % max;
}
const adjectives = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"];
const colours = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"];
const nouns = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"];
let id = 1;
const buildData = (count = 1000) => {
  let data = [];
  for (let i = 0; i < count; i++) {
    data.push({id: id++, label: `${adjectives[random(adjectives.length)]} ${colours[random(colours.length)]} ${nouns[random(nouns.length)]}`});
  }
  return data;
};

const Store = new v.Store({
  state: {data: [], selected: null},
  mutations: {
    remove: (state, id) => state.data = state.data.filter(current => current.id !== id),
    run: (state) => state.data = buildData(),
    add: (state) => state.data = [...state.data, ...buildData()],
    update: (state) => {
      let data = [...state.data];
      for (let i = 0, l = data.length; i < l; i += 10) {
        data[i] = {id: data[i].id, label: data[i].label + ' !!!'};
      }
      state.data = data;
    },
    select: (state, id) => state.selected = id,
    runLots: (state) => state.data = buildData(10000),
    clear: (state) => state.data = [],
    swapRows: (state) => {
      let data = [...state.data];
      if (data.length > 998) {
        let a = data[1];
        data[1] = data[998];
        data[998] = a;
      }
      state.data = data;
    }
  }
});

v.useStore(Store);
