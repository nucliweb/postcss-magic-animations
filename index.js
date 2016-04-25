const postcss = require('postcss')
const keyframes = require('postcss-magic-animations-data')

const walkingDecls = (css, value, parent, options) => {
  return options.atRoot ? css.append(keyframes[value])
                        : parent.parent.insertAfter(parent, keyframes[value])
}

module.exports = postcss.plugin('postcss-magic-animations', (options) => {
  options = options || {}

  return (css, result) => {
    css.walkDecls('animation-name', (decl) => {
      keyframes[decl.value] && walkingDecls(css, decl.value, decl.parent, options)
    })

    css.walkDecls('animation', (decl) => {
      postcss.list.space(decl.value)
        .filter((value) => keyframes[value])
        .forEach((value) => walkingDecls(css, value, decl.parent, options))
    })
  }
})
