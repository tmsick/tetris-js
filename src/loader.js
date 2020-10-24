import { shuffle } from "lodash"

/**
 * A Loader is an intelligent, automatically-filled queue. The loader's queue is
 * filled with `variants`. The queue's length is equal to or greater than
 * `size`. The `hook` function is called with the variant as its argument when
 * the variant is popped out of the queue.
 */
export class Loader {
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
