/**
 * Created by lukelin on 2016/4/30.
 */

if(!process.browser){
    require('babel-register');
}

module.exports = {
    Array: {
        CrossList: require('./Array/CrossList'),
        TSMatrix: require('./Array/TSMatrix')
    },
    
    BinaryTree: {
        // BinaryThreadTree: require('./BinaryTree/BinaryThreadTree'),
        BinaryTree: require('./BinaryTree/BinaryTree'),
        // EBTNode: require('./BinaryTree/EBTNode'),
        huffManCoding: require('./BinaryTree/huffManCoding'),
        // MFSet: require('./BinaryTree/MFSet'),
        // PBTNode: require('./BinaryTree/PBTNode')
    },
    
    GeneralizedList: {
        GList: require('./GeneralizedList/GList')
    },
    
    Graph: {
        AdjacencyListGraph: require('./Graph/AdjacencyListGraph'),
        AdjacencyMatrixGraph: require('./Graph/AdjacencyMatrixGraph'),
        AMLGraph: require('./Graph/AMLGraph'),
        OLGraph: require('./Graph/OLGraph')
    },
    
    LinkedList: {
        DoubleLinkedList: require('./linkedList/DoubleLinkedList'),
        LinearList: require('./linkedList/LinearList'),
        StaticLinkedList: require('./linkedList/StaticLinkedList'),
        LRUCache: require('./linkedList/LRU').default
    },
    
    Queue: {
        CycleQueue: require('./Queue/CycleQueue'),
        PriorityQueue: require('./Queue/PriorityQueue'),
        Queue: require('./Queue/Queue')
    },
    
    Search: {
        AVLTree: require('./Search/AVLTree'),
        binarySearch: require('./Search/BinarySearch'),
        BinarySortedTree: require('./Search/BinarySortedTree'),
        BPlusTree: require('./Search/BPlusTree'),
        BTree: require('./Search/BTree'),
        DigitalSearchTree: require('./Search/DigitalSearchTree'),
        fibonacciSearch: require('./Search/fibonacciSearch'),
        HashTable: require('./Search/HashTable'),
        RedBlackTree: require('./Search/RedBlackTree'),
        sequentialSearch: require('./Search/sequentialSearch'),
        SOSTree: require('./Search/SOSTree')
    },

    Sort: {
        distribution: require('./Sort/distribution/index'),
        exchange: require('./Sort/exchange/index'),
        insertion: require('./Sort/insertion/index'),
        merging: require('./Sort/merging/index'),
        selection: require('./Sort/selection/index')
    },

    Stack: require('./Stack/index'),

    String: {
        HString: require('./String/HString'),
        LString: require('./String/LString'),
        SString: require('./String/SString')
    }
};