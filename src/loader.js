import _ from "lodash"

class Loader {
  constructor(variants, stockSize, hook = variant => variant) {
    this.variants = variants
    this.variantKeys = Object.keys(variants)
    this.stockSize = stockSize
    this.hook = hook
    this.stock = []
    this.fillStock()
  }

  load() {
    const variant = this.stock.shift()
    this.fillStock()
    return this.hook(variant)
  }

  fillStock() {
    while (this.stock.length < this.stockSize) {
      const keys = _.shuffle(this.variantKeys.slice())
      this.stock = this.stock.concat(keys.map(key => this.variants[key]))
    }
  }
}

export default Loader
