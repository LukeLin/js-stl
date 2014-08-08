Map = require('../source').Map

describe "Create hash map", ->
  map = new Map()
  it "should give an empty hash map", ->
    expect(map).toBeDefined()
  map2 = new Map({'20': 'ok', 'alice': 'wonderland'})
  it "should add passed object's (key, value) pairs to the map", ->
    # console.log map2
    callback = jasmine.createSpy()
    map2.forEach callback
    expect(callback).toHaveBeenCalledWith '20', 'ok'
    expect(callback).toHaveBeenCalledWith 'alice', 'wonderland'
    expect(callback).not.toHaveBeenCalledWith undefined, undefined

# Usually, the hash function should be hidden. But we allow the possibility of
# user-defined hash function.
describe "Hash function", ->
  map = new Map()
  it "should generate a unique hash for simple hashable types", ->
    expect(map.hash 5, yes).toBe 'Number_5'
    expect(map.hash "5", yes).toBe 'String_5'
    expect(map.hash undefined, yes).toBe 'Undefined_undefined'
    expect(map.hash null, yes).toBe 'Null_null'
    expect(map.hash true, yes).toBe 'Boolean_true'
    expect(map.hash /asd/, yes).toBe 'RegExp_/asd/'
    expect(map.hash (-> "hello"), yes).toMatch /Function_.+/
  arr = [1, 2, {a: "hello"}, [3, 4, 5]]
  obj = {a: "hi", b: {}, c: [1, 2], d: arr}
  date = new Date()
  it "should generate a unique hash for objects, arrays, and dates", ->
    expect(map.hash arr, yes).toMatch /_mapId_\d+_\d+/
    expect(map.hash obj, yes).toMatch /_mapId_\d+_\d+/
    expect(map.hash date, yes).toMatch /_mapId_\d+_\d+/
  it "should have used obscure hacks by putting an id in arr and obj", ->
    expect(arr._mapId_2).toEqual any Number
    expect(obj._mapId_2).toEqual any Number
    expect(date._mapId_2).toEqual any Number

describe "Set and get/has", ->
  map = new Map()
  it "should have an empty size initially", ->
    expect(map.size).toBe 0
  it "should have nothing when map's empty", ->
    expect(map.get 5).toBeUndefined()
    expect(map.get undefined).toBeUndefined()
    expect(map.get null).toBeUndefined()
    expect(map.get 0).toBeUndefined()
    expect(map.get []).toBeUndefined()
    expect(map.get -> "hello").toBeUndefined()
    expect(map.get "5").toBeUndefined()
    expect(map.has 5).toBeFalsy()
    expect(map.has undefined).toBeFalsy()
    expect(map.has null).toBeFalsy()
    expect(map.has 0).toBeFalsy()
    expect(map.has []).toBeFalsy()
    expect(map.has -> "hello").toBeFalsy()
    expect(map.has "5").toBeFalsy()
  arr = [1, 2, {a: "hello"}, [3, 4, 5]]
  obj = {a: "hi", b: {}, c: [1, 2], d: arr}
  it "should put the key and its value into the map", ->
    expect(map.set 5, "number 5").toBe "number 5"
    expect(map.set "5", "string 5").toBe "string 5"
    expect(map.set undefined, [1, 2, 3]).toEqual [1, 2, 3]
    expect(map.set null, {a: 10}).toEqual {a: 10}
    expect(map.set true, "ok").toBe "ok"
    expect(map.set /asd/, false).toBe false
    expect(map.set (-> "hello"), 99).toBe 99
    expect(map.set arr, "array").toBe "array"
    expect(map.set obj, "obj").toBe "obj"

    expect(map.get 5).toBe "number 5"
    expect(map.get "5").toBe "string 5"
    expect(map.get undefined).toEqual [1, 2, 3]
    expect(map.get null).toEqual {a: 10}
    expect(map.get true).toBe "ok"
    expect(map.get /asd/).toBe false
    expect(map.get -> "hello").toBe 99
    expect(map.get arr, "time").toBe "array"
    expect(map.get obj, "time").toBe "obj"

    expect(map.has 5).toBeTruthy()
    expect(map.has "5").toBeTruthy()
    expect(map.has undefined).toBeTruthy()
    expect(map.has null).toBeTruthy()
    expect(map.has true).toBeTruthy()
    expect(map.has /asd/).toBeTruthy()
    expect(map.has -> "hello").toBeTruthy()
    expect(map.has arr, "time").toBeTruthy()
    expect(map.has obj, "time").toBeTruthy()
  it "should keep track of map size", ->
    expect(map.size).toBe 9
  it "should override previous value", ->
    map.set 5, "number 6"
    map.set "5", "string 6"
    map.set undefined, [3, 2]
    map.set null, {b: 12}
    map.set true, "okay"
    map.set /asd/, true
    map.set (-> "hello"), 10

    expect(map.get 5).toBe "number 6"
    expect(map.get "5").toBe "string 6"
    expect(map.get undefined).toEqual [3, 2]
    expect(map.get null).toEqual {b: 12}
    expect(map.get true).toBe "okay"
    expect(map.get /asd/).toBe true
    expect(map.get -> "hello").toBe 10
  it "shouldn't have changed the map's size", ->
    expect(map.size).toBe 9
  it "should return undefined if the key's not found", ->
    expect(map.get 6).toBeUndefined()
    expect(map.get -> "bye").toBeUndefined()
    # TODO: might not be the desired behavior. Maybe it should be found.
    expect(map.get [1, 2, {a: "hello"}, [3, 4, 5]]).toBeUndefined()
    expect(map.get {a: "hi", b: {}, c: [1, 2], d: arr}).toBeUndefined()
    expect(map.has [1, 2, {a: "hello"}, [3, 4, 5]]).toBeFalsy()
    expect(map.has {a: "hi", b: {}, c: [1, 2], d: arr}).toBeFalsy()
  date1 = new Date()
  date2 = new Date()
  it "should store two Date objects distinctively", ->
    map.set date1, "date 1"
    map.set date2, "date 2"
    expect(map.get date1).toBe "date 1"
    expect(map.get date2).toBe "date 2"
    expect(map.get new Date()).toBeUndefined()
    expect(map.has new Date()).toBeFalsy()
  map2 = new Map()
  it "should store a id on the key that's unique to each map", ->
    expect(map2.get date1).toBeUndefined()
    map2.set(date1, "date 1 on map 2")
    expect(map.get date1).toBe "date 1"
    expect(map2.get date1).toBe "date 1 on map 2"

describe "Delete", ->
  map = new Map()
  it "should return false for deleting nonexistent keys", ->
    expect(map.delete 5).toBeFalsy()
    expect(map.delete undefined).toBeFalsy()
    expect(map.delete null).toBeFalsy()
    expect(map.delete 0).toBeFalsy()
    expect(map.delete []).toBeFalsy()
    expect(map.delete -> "hello").toBeFalsy()
    expect(map.delete "5").toBeFalsy()
  it "shouldn't decrease the size count after fail deletes", ->
    expect(map.size).toBe 0
  arr = [1, 2, {a: "hello"}, [3, 4, 5]]
  obj = {a: "hi", b: {}, c: [1, 2], d: arr}
  date1 = new Date()
  date2 = new Date()
  it "should return true after deleting a valid key", ->
    map.set 5, "number 6"
    map.set "5", "string 6"
    map.set undefined, [3, 2]
    map.set null, {b: 12}
    map.set true, "okay"
    map.set /asd/, true
    map.set (-> "hello"), 10
    expect(map.delete 5).toBeTruthy()
    expect(map.delete "5").toBeTruthy()
    expect(map.delete undefined).toBeTruthy()
    expect(map.delete null).toBeTruthy()
    expect(map.delete true).toBeTruthy()
    expect(map.delete /asd/).toBeTruthy()
    expect(map.delete -> "hello").toBeTruthy()
  it "should have updated the size", ->
    expect(map.size).toBe 0
  it "shouldn't find anything after emptying a map", ->
    expect(map.delete 5).toBeFalsy()
    expect(map.delete "5").toBeFalsy()
    expect(map.delete undefined).toBeFalsy()
    expect(map.delete null).toBeFalsy()
    expect(map.delete true).toBeFalsy()
    expect(map.delete /asd/).toBeFalsy()
    expect(map.delete -> "hello").toBeFalsy()
  it "should delete the hacky property from special data types", ->
    map.set arr, "array"
    map.set obj, "object"
    map.set date1, "date 1"
    map.set date2, "date 2"
    map.delete arr
    map.delete obj
    map.delete date1
    map.delete date2
    expect(arr._mapId_3).toBeUndefined()
    expect(obj._mapId_3).toBeUndefined()
    expect(date1._mapId_3).toBeUndefined()
    expect(date2._mapId_3).toBeUndefined()
  it "should keep the count correct after removing special keys", ->
    expect(map.size).toBe 0

describe "Iterate through items", ->
  map = new Map()
  it "shouldn't call the callback when there's nothing to iterate through", ->
    callback = jasmine.createSpy()
    map.forEach callback
    expect(callback).not.toHaveBeenCalled()
  it "should have called the callback correctly", ->
    map.set 5, "number 5"
    map.set "5", "string 5"
    map.set undefined, [3, 2]
    map.set null, {b: 12}
    map.set true, "okay"
    map.set /asd/, true
    map.set (-> "hello"), 10
    callback = jasmine.createSpy()
    map.forEach callback
    expect(callback).toHaveBeenCalledWith 5, 'number 5'
    expect(callback).toHaveBeenCalledWith '5', 'string 5'
    expect(callback).toHaveBeenCalledWith undefined, [ 3, 2 ]
    expect(callback).toHaveBeenCalledWith null, { b : 12 }
    expect(callback).toHaveBeenCalledWith true, 'okay'
    expect(callback).toHaveBeenCalledWith /asd/, true
    expect(callback).toHaveBeenCalledWith any(Function), 10
