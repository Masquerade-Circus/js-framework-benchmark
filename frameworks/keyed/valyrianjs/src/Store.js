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

const Store = {
  state: {data: [], selected: null},
  remove: (id) => Store.state.data = Store.state.data.filter(current => current.id !== id),
  run: () => Store.state.data = buildData(),
  add: () => Store.state.data.push(...buildData()),
  update: () => {
    for (let i = 0, l = Store.state.data.length; i < l; i += 10) {
      Store.state.data[i].label += ' !!!';
    }
  },
  select: (id) => Store.state.selected = id,
  runLots: () => Store.state.data = buildData(10000),
  clear: () => Store.state.data = [],
  swapRows: () => {
    if (Store.state.data.length > 998) {
      let a = Store.state.data[1];
      Store.state.data[1] = Store.state.data[998];
      Store.state.data[998] = a;
    }
  }
};

export default Store;
