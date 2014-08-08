Trie = require('../source').Trie

# Shorthand for logging.
l = (x) -> console.log require('util').inspect x, true, 10

fill = (trie) ->
  initialWordCount = trie.size
  trie.add "he"
  trie.add "hello"
  trie.add "ello"
  trie.add "bell"
  trie.add "hell"
  trie.add "bear"
  trie.add "beer"
  trie.add "z"
  trie.add "za"
  trie.add "zz"
  expect(trie.size).toBe initialWordCount + 10

empty = (trie) ->
  initialWordCount = trie.size
  trie.remove "he"
  trie.remove "hello"
  trie.remove "ello"
  trie.remove "bell"
  trie.remove "hell"
  trie.remove "bear"
  trie.remove "beer"
  trie.remove "z"
  trie.remove "za"
  trie.remove "zz"
  expect(trie.size).toBe Math.max(initialWordCount - 10, 0)

describe "Add word and check for it", ->
  trie = new Trie()
  it "should have an empty word  count at the beginning", ->
    expect(trie.size).toBe 0
  it "should return nothing when the trie's empty", ->
    expect(trie.has "").toBeFalsy()
    expect(trie.has "beer").toBeFalsy()
    expect(trie.has()).toBeFalsy()
  it "should return the word added", ->
    expect(trie.add "he").toBe "he"
    expect(trie.add "hello").toBe "hello"
    expect(trie.add "hell").toBe "hell"
    expect(trie.add "beer").toBe "beer"
    expect(trie.size).toBe 4
  it "should find the words just added, and nothing but", ->
    expect(trie.has "hello").toBeTruthy()
    expect(trie.has "hell").toBeTruthy()
    expect(trie.has "he").toBeTruthy()
    expect(trie.has "beer").toBeTruthy()
    expect(trie.has "bee").toBeFalsy()
  it "should ignore adding null and undefined", ->
    expect(trie.has null).toBeFalsy()
    expect(trie.has()).toBeFalsy()
    expect(trie.has undefined).toBeFalsy()
    expect(trie.add null).toBeUndefined()
    expect(trie.add()).toBeUndefined()
    expect(trie.add undefined).toBeUndefined()
    expect(trie.has null).toBeFalsy()
    expect(trie.has()).toBeFalsy()
    expect(trie.has undefined).toBeFalsy()
  it "should add an empty string as a valid word", ->
    expect(trie.has "").toBeFalsy()
    expect(trie.add "").toBe ""
    expect(trie.has null).toBeFalsy()
    expect(trie.has()).toBeFalsy()
    expect(trie.has undefined).toBeFalsy()
    expect(trie.has "").toBeTruthy()
  it "should not add the same word more than once", ->
    # Not sure how to test this.
    fill trie
    expect(trie.has "").toBeTruthy()
    expect(trie.has "he").toBeTruthy()
    expect(trie.has "hello").toBeTruthy()
    expect(trie.has "hell").toBeTruthy()
    expect(trie.has "beer").toBeTruthy()
    expect(trie.has "bear").toBeTruthy()
    expect(trie.has "z").toBeTruthy()
    expect(trie.has "za").toBeTruthy()
    expect(trie.has "zz").toBeTruthy()

describe "Initialization with an array", ->
  trie = new Trie ["hello", "he", "hell", "beer", null, "apple", undefined]
  it "should have formed the trie correctly", ->
    expect(trie.has "hello").toBeTruthy()
    expect(trie.has "hell").toBeTruthy()
    expect(trie.has "he").toBeTruthy()
    expect(trie.has "beer").toBeTruthy()
    expect(trie.has "apple").toBeTruthy()

describe "Find the longest prefix of a word", ->
  trie = new Trie()
  it "should return an empty string if the word's not found", ->
    expect(trie.longestPrefixOf()).toBe ""
    expect(trie.longestPrefixOf null).toBe ""
    expect(trie.longestPrefixOf undefined).toBe ""
    expect(trie.longestPrefixOf "").toBe ""
    expect(trie.longestPrefixOf "beer").toBe ""
  it "should return the correct prefix otherwise", ->
    fill trie
    expect(trie.longestPrefixOf "hel").toBe "hel"
    expect(trie.longestPrefixOf "hellha").toBe "hell"
    expect(trie.longestPrefixOf "beer cup").toBe "beer"
    expect(trie.longestPrefixOf "h").toBe "h"
    expect(trie.longestPrefixOf "beers").toBe "beer"
    expect(trie.longestPrefixOf "").toBe ""
    expect(trie.longestPrefixOf "a").toBe ""
    expect(trie.longestPrefixOf null).toBe ""
    expect(trie.longestPrefixOf undefined).toBe ""
    expect(trie.longestPrefixOf()).toBe ""

describe "Find all words matching a prefix", ->
  trie = new Trie()
  it "should return an empty array if nothing's found", ->
    expect(trie.wordsWithPrefix "asd").toEqual []
    expect(trie.wordsWithPrefix undefined).toEqual []
    expect(trie.wordsWithPrefix null).toEqual []
    expect(trie.wordsWithPrefix()).toEqual []
    expect(trie.wordsWithPrefix "").toEqual []
  it "should return every word if an empty string is passed", ->
    fill trie
    expect(trie.wordsWithPrefix undefined).toEqual []
    expect(trie.wordsWithPrefix null).toEqual []
    expect(trie.wordsWithPrefix "").toEqual ["z", "he", "za", "zz", "hell",
                                            "ello", "bell", "bear", "beer",
                                            "hello"]
    expect(trie.wordsWithPrefix()).toEqual []
  it "should return the same array, plus the empty string, if it was added", ->
    trie.add ""
    expect(trie.wordsWithPrefix "").toEqual ["", "z", "he", "za", "zz", "hell",
                                            "ello", "bell", "bear", "beer",
                                            "hello"]
  it "should include the word itself", ->
    expect(trie.wordsWithPrefix "hell").toEqual ["hell", "hello"]

describe "Remove a word", ->
  trie = new Trie()
  it "should return undefined if trie's empty", ->
    expect(trie.remove "hello").toBeUndefined()
    expect(trie.remove null).toBeUndefined()
    expect(trie.remove undefined).toBeUndefined()
    expect(trie.remove "h").toBeUndefined()
    expect(trie.remove "").toBeUndefined()
  it "should return undefined if some letters of the word aren't there", ->
    fill trie
    expect(trie.remove "hel").toBeUndefined()
    expect(trie.remove "b").toBeUndefined()
    expect(trie.remove "zzz").toBeUndefined()
    expect(trie.remove undefined).toBeUndefined()
    expect(trie.remove null).toBeUndefined()
    expect(trie.size).toBe 10
  it "should be case-sensitive", ->
    expect(trie.remove "He").toBeUndefined()
  it "should return the word removed", ->
    expect(trie.remove "he").toBe "he"
    expect(trie.has "he").toBeFalsy()
    expect(trie.remove "zz").toBe "zz"
    expect(trie.has "zz").toBeFalsy()
    expect(trie.size).toBe 8
  it "should not have removed letters if other words are using them", ->
    expect(trie.has "hello").toBeTruthy()
    expect(trie.has "hell").toBeTruthy()
    expect(trie.has "ello").toBeTruthy()
    expect(trie.has "bell").toBeTruthy()
    expect(trie.has "bear").toBeTruthy()
    expect(trie.has "beer").toBeTruthy()
    expect(trie.has "z").toBeTruthy()
    expect(trie.has "za").toBeTruthy()
  it "should remove the letters if no word is using them anymore", ->
    trie.remove "hello"
    expect(trie.has "hell").toBeTruthy()
    trie.remove "hell"
    expect(trie.wordsWithPrefix "h").toEqual []
  it "should affect other branches", ->
    expect(trie.has "ello").toBeTruthy()
    expect(trie.has "bell").toBeTruthy()
  it "should conserve empty string if it exists", ->
    trie.add ""
    trie.remove "z"
    expect(trie.has "").toBeTruthy()
    trie.remove "za"
    expect(trie.has "").toBeTruthy()
  it "should remove empty string if it was a word", ->
    expect(trie.remove "").toBe ""
    expect(trie.has "").toBeFalsy()
  it "should leave an empty trie after removing everything", ->
    empty trie
