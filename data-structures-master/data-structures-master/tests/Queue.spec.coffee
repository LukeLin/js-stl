Queue = require('../source').Queue

describe "Create queue", ->
  queue = new Queue()
  it "creates a queue with size 0", ->
    expect(queue.size).toBe 0
  it "should be empty in the beginning", ->
    expect(queue.peek()).toBeUndefined()

describe "Enqueue, dequeue and peek", ->
  queue = new Queue()
  it "should do the operations correctly and in order, with the right size", ->
    expect(queue.enqueue("item")).toBe "item"
    expect(queue.peek()).toBe "item"
    expect(queue.size).toBe 1

    expect(queue.dequeue()).toBe "item"
    expect(queue.peek()).toBeUndefined()
    expect(queue.size).toBe 0

    expect(queue.enqueue("item0")).toBe "item0"
    expect(queue.peek()).toBe "item0"
    expect(queue.size).toBe 1

    expect(queue.enqueue(1)).toBe 1
    expect(queue.peek()).toBe "item0"
    expect(queue.size).toBe 2

    expect(queue.enqueue([1, 2, 3])).toEqual [1, 2, 3]
    expect(queue.peek()).toEqual "item0"
    expect(queue.size).toBe 3

    expect(queue.dequeue()).toBe "item0"
    expect(queue.peek()).toBe 1
    expect(queue.size).toBe 2

    expect(queue.dequeue()).toBe 1
    expect(queue.peek()).toEqual [1, 2, 3]
    expect(queue.size).toBe 1

    expect(queue.enqueue("")).toBe ""
    expect(queue.peek()).toEqual [1, 2, 3]
    expect(queue.size).toBe 2

    expect(queue.dequeue()).toEqual [1, 2, 3]
    expect(queue.peek()).toBe ""
    expect(queue.size).toBe 1

    expect(queue.dequeue()).toEqual ""
    expect(queue.peek()).toBeUndefined()
    expect(queue.size).toBe 0
  it "should have the correct size when doing empty dequeue on a previously
      operated queue", ->
    expect(queue.dequeue()).toBeUndefined()
    expect(queue.size).toBe 0

describe "Initialize with an array, first element to dequeue being array[0]", ->
  queue = new Queue([1, 5, 4, 6, 7, undefined, null, "hi"])
  it "should fill the queue with the parameter", ->
    expect(queue.size).toBe 8
    expect(queue.dequeue()).toBe 1
    expect(queue.dequeue()).toBe 5
    expect(queue.dequeue()).toBe 4
    expect(queue.dequeue()).toBe 6
    expect(queue.dequeue()).toBe 7
    expect(queue.dequeue()).toBeUndefined()
    expect(queue.dequeue()).toBeNull()
    expect(queue.dequeue()).toBe "hi"
    expect(queue.dequeue()).toBeUndefined()
