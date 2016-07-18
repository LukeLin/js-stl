# js-stl

Classic and high performance data structures implemented in javascript.

1. npm install
2. npm run build            // for production build
3. npm run build:dev        // for development build
4. babel-node ./src/xx.js   // run xx.js
5. npm run build:lib        // for node server build


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
    * [x] [LinkedList](./src/linkedList/LinkedList.js)
    * [x] [LinearList](./src/linkedList/LinearList.js)
    * [x] [DoubleLinkedList](./src/linkedList/doubleLinkedList.js)
    * [ ] [StaticLinkedList](./src/linkedList/StaticLinkedList.js)
    * [x] [LRUCache](./src/linkedList/LRU.js)

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
    * [x] [Bloom Filter](./src/SearchBloomFilter.js)
    * [ ] Heap  todo

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


### 博客地址：

* [栈](http://www.html-js.com/article/2168)
* [队列](http://www.html-js.com/article/2169)
* [广义表](http://www.html-js.com/article/2084)
* [二叉树的遍历和基本操作](http://www.html-js.com/article/2170)
* [树和森林](http://www.html-js.com/article/2177)
* [最优二叉树与回溯法](http://www.html-js.com/article/2178)
* [图的概念和存储结构](http://www.html-js.com/article/2378)
* [图的遍历](http://www.html-js.com/article/2423)
* [查找/检索之静态查找](http://www.html-js.com/article/2714)
* [动态查找（一）*二叉排序树](http://www.html-js.com/article/2761)
* todo ..
