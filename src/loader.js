import { shuffle } from "lodash"

class Loader {
  constructor(variants, size, hook = variant => variant) {
    this.variants = variants
    this.size = size
    this.hook = hook
    this.queue = []
    this.fillQueue()
  }

  load() {
    const variant = this.queue.shift()
    this.fillQueue()
    return this.hook(variant)
  }

  fillQueue() {
    while (this.queue.length < this.size)
      this.queue = this.queue.concat(shuffle(this.variants))
  }
}

export default Loader
