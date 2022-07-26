require('valyrian.js/register');
const { writeFileSync } = require('fs-extra');
let {inline} = require('valyrian.js/plugins/node');

async function build() {
  await inline('./src/Main.js');
  writeFileSync('./dist/main.js', inline.js()[0].raw + '\n' + inline.js()[0].map);
}

build();
