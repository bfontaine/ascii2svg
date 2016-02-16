# ascii2svg

**ascii2svg** is a command-line tool to draw SVG graphs from simple ASCII
descriptions.

This is an alpha release. It works, but needs tests and customization options.

## Install

    npm install -g ascii2svg

## Usage

    ascii2svg [--html] <input> <output>

It’ll read on `stdin` if `<input>` is `-`; and write on `stdout` if `<output>`
is `-`.

Options:

* `--html`: wrap the resulting SVG in an HTML page so that you can open it in
  your browser.

## Formats

### ASCII

This is the simplest format. Each line represents one or more links using ASCII
arrows. Nodes labels can be any string without hyphen nor newline.

Example:
```
a -> b -> c
b -> d
```

The direction of the arrows is not important; you can use `-`, `<-` or `->`
with as many hyphens as you want.

The example above creates a graph of 4 nodes with three edges connecting `b` to
all other nodes.

## Tips

* You can use [`browser`](https://gist.github.com/defunkt/318247) for quick
  previews: `echo -e "a->b->c" | ascii2svg --html - - | browser`
