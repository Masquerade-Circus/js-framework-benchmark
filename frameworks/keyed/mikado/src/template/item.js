Mikado.register({
  "t": "tr",
  "a": {
    "root": ""
  },
  "i": [
    {
      "t": "td",
      "c": "col-md-1",
      "x": [
        "data.id",
        1
      ]
    },
    {
      "t": "td",
      "i": {
        "t": "a",
        "c": "lbl",
        "e": {
          "click": "select:root"
        },
        "x": [
          "data.label",
          1
        ]
      },
      "c": "col-md-4"
    },
    {
      "t": "td",
      "i": {
        "t": "a",
        "i": {
          "t": "span",
          "a": {
            "aria-hidden": "true"
          },
          "c": "remove glyphicon glyphicon-remove"
        },
        "c": "remove",
        "e": {
          "click": "remove:root"
        }
      },
      "c": "col-md-1"
    },
    {
      "t": "td",
      "c": "col-md-6"
    }
  ],
  "c": [
    "data.selected",
    1
  ],
  "d": false,
  "n": "item",
  "v": "0.6.5"
});