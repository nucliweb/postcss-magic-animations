import postcss from 'postcss'
import test from 'ava'
import {readFileSync} from 'fs'
import path from 'path'
import plugin from '../'

const run = (t, input, output, opts = {}) => {
  return postcss([ plugin(opts) ]).process(readFileSync(path.join(__dirname, 'fixtures', input), 'utf8'))
    .then((result) => {
      t.deepEqual(result.css, readFileSync(path.join(__dirname, 'fixtures', output), 'utf8'))
      t.deepEqual(result.warnings().length, 0)
    })
}

test('magic', (t) => run(t, 'magic.css', 'magic.expected.css', {}))
test('magic-atRoot', (t) => run(t, 'magic-atRoot.css', 'magic-atRoot.expected.css', {atRoot: true}))
test('unknown', (t) => run(t, 'unknown.css', 'unknown.expected.css', {}))
