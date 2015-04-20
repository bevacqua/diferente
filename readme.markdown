# diferente

> User-friendly virtual DOM diffing

# Demo

[![Demo screenshot][4]][5]

# Install

```shell
npm install diferente --save
```

```shell
bower install diferente --save
```

# `diferente(el, markup)`

In contrast with `el.innerHTML = markup`, which **wipes out the DOM** when set, `diferente` allows you to easily swap out markup with an intelligent [virtual-dom][1] changeset diff patch.

```js
diferente(el, '<new markup to diff/>');
```

# Origins

The [diffhtml][2] algorithm was invented by [tbranyen][3]. I wanted something that didn't pollute the environment _(his code assigned to `Element.prototype.diffHTML`)_, so I took the code he wrote and just exposed the function that was called when assigning to `diffHTML`. All credit goes [to him][3].

# License

MIT

[1]: https://github.com/Matt-Esch/virtual-dom
[2]: https://github.com/tbranyen/diffhtml
[3]: https://github.com/tbranyen
[4]: https://github.com/bevacqua/diferente/blob/master/resources/demo.png
[5]: http://bevacqua.github.io/diferente/
