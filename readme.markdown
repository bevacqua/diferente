# diferente

> User-friendly virtual DOM diffing

# Install

```shell
npm install diferente --save
```

```shell
bower install diferente --save
```

# `diferent(el, markup)`

In contrast with `el.innerHTML = markup`, which **wipes out the DOM** when set, `diferente` allows you to easily swap out markup with an intelligent [virtual-dom][1] changeset diff patch.

```js
diferente(el, '<new markup to diff/>');
```

# Origins

The original `diffhtml` algorithm was designed and developed by [tbranyen][3]. I wanted something that didn't pollute the environment _(his code assigned to `Element.prototype.diffHTML`)_, and so this module came into existance.

# License

MIT

[1]: https://github.com/Matt-Esch/virtual-dom
[2]: https://github.com/tbranyen/diffhtml
[3]: https://github.com/tbranyen
