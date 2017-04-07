[![Build](https://img.shields.io/travis/LukeLin/js-stl.svg)](https://travis-ci.org/LukeLin/js-stl)



# js-stl

Classic and high performance data structures implemented in javascript.

1. npm i
2. npm run build            // for production build
3. npm run build:dev        // for development build
4. babel-node ./src/xx.js   // run xx.js
5. npm run build:es5        // for node server build
6. npm test                 // run tests


#### Directory

* Array
    * [x] [CrossList](./src/Array/CrossList.js)
    * [x] [TSMatrix](./src/Array/TSMatrix.js)
    * [x] [algorithms](./src/Array/algorithms.js)

* Binary Tree
    * [x] [BinaryTree](./src/BinaryTree/BinaryTree.js)
    * [x] [huffManCoding](./src/BinaryTree/huffManCoding.js)
    * [x] [backtracking](./src/algorithms/backtracking.js)

* Generalized List
    * [x] [GList](./src/GeneralizedList/GList.js)

* Graph
    * [x] [AdjacencyListGraph](./src/Graph/AdjacencyListGraph.js)
    * [x] [AdjacencyMatrixGraph](./src/Graph/AdjacencyMatrixGraph.js)
    * [x] [AMLGraph](./src/Graph/AMLGraph.js)
    * [x] [OLGraph](./src/Graph/OLGraph.js)

* List
    * [x] [LinkedList](./src/List/LinkedList.js)
    * [x] [LinearList](./src/List/LinearList.js)
    * [x] [DoubleLinkedList](./src/List/doubleLinkedList.js)
    * [ ] [StaticLinkedList](./src/List/StaticLinkedList.js)
    * [x] [LRUCache](./src/List/LRU.js)

* Queue
    * [x] [Queue](./src/Queue/Queue.js)
    * [x] [CycleQueue](./src/Queue/CycleQueue.js)
    * [x] [PriorityQueue](./src/Queue/PriorityQueue.js)

* Stack
    * [x] [Stack](./src/Stack/index.js)

* String
    * [x] [HeapString](./src/String/HString.js)
    * [x] [LString](./src/String/LString.js)
    * [x] [SString](./src/String/SString.js)
    * [x] [algorithms](./src/String/string-algorithms.js)

* Search
    * [x] [sequentialSearch](./src/Search/sequentialSearch.js)
    * [x] [binarySearch](./src/Search/BinarySearch.js)
    * [x] [fibonacciSearch](./src/Search/fibonacciSearch.js)
    * [x] [SecondOptimalSearchTree](./src/Search/SOSTree.js)
    * [x] [BinarySortedTree](./src/Search/BinarySortedTree.js)
    * [x] [AVLTree](./src/Search/AVLTree.js)
    * [x] [RedBlackTree](./src/Search/RedBlackTree.js)
    * [x] [BTree](./src/Search/BTree.js)
    * [x] [B+Tree](./src/Search/BPlusTree.js)
    * [ ] [DigitalSearchTree / DictionaryTree](./src/Search/DigitalSearchTree.js)
        * [x] DoubleLinkedTree
        * [x] TrieTree
        * [ ] PatriciaTree    todo
        * [ ] SuffixTree    todo
    * [x] [HashTable](./src/Search/HashTable.js)
    * [ ] Treap    todo
    * [ ] SplayTree    todo
    * [ ] BitMap    todo
    * [x] [Bloom Filter](./src/Search/BloomFilter.js)

* Heap
    * [x] [Heap](./src/Heap/index.js)

* Sort
    * [x] [insertion sort](./src/Sort/insertion/index.js)
        * [x] straightInsertSort
        * [x] binaryInsertSort
        * [x] path2InsertSort
        * [x] staticLinkedListInsertSort
        * [x] shellSort
                
    * [x] [exchange sort](./src/Sort/exchange/index.js)
        * [x] bubbleSort
        * [x] bubbleSort2
        * [x] cockTailSort
        * [x] cockTailSort2
        * [x] quickSortRecursive
        * [x] quickSortRecursive2
        * [x] quickSortNonRecursive
        * [x] quickSort
        * [x] oddEvenSort
                
    * [x] [selection sort](./src/Sort/selection/index.js)
        * [x] simpleSelectionSort
        * [x] heapSort

    * [x] [merge sort](./src/Sort/merging/index.js)
        * [x] mergeSortRecursive
        * [x] mergeSortNonRecursive
        * [x] natureMergeSort
        * [x] naturalMergeSort
        * [x] linkedListNaturalMergeSort

    * [x] [distribution sort](./src/Sort/distribution/index.js)
        * [x] countSort
        * [x] radixSort
        * [x] bucketSort
