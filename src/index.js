/**
 * Created by lukelin on 2016/4/30.
 */

if(!process.browser){
    require('babel-register');
}

module.exports = {
    Array: {
        CrossList: require('./Array/CrossList').default,
        TSMatrix: require('./Array/TSMatrix').default
    },
    
    BinaryTree: {
        // BinaryThreadTree: require('./BinaryTree/BinaryThreadTree'),
        BinaryTree: require('./BinaryTree/BinaryTree'),
        // EBTNode: require('./BinaryTree/EBTNode'),
        huffManCoding: require('./BinaryTree/huffManCoding').default,
        // MFSet: require('./BinaryTree/MFSet'),
        // PBTNode: require('./BinaryTree/PBTNode')
    },
    
    GeneralizedList: require('./GeneralizedList/GList').default,
    
    Graph: {
        AdjacencyListGraph: require('./Graph/AdjacencyListGraph').default,
        AdjacencyMatrixGraph: require('./Graph/AdjacencyMatrixGraph').default,
        AMLGraph: require('./Graph/AMLGraph').default,
        OLGraph: require('./Graph/OLGraph').default
    },
    
    List: {
        DoubleLinkedList: require('./List/DoubleLinkedList').default,
        LinearList: require('./List/LinearList'),
        StaticLinkedList: require('./List/StaticLinkedList').default,
        LRUCache: require('./List/LRU').default
    },
    
    Queue: {
        CycleQueue: require('./Queue/CycleQueue').default,
        PriorityQueue: require('./Queue/PriorityQueue').default,
        Queue: require('./Queue/Queue').default
    },
    
    Search: {
        AVLTree: require('./Search/AVLTree'),
        binarySearch: require('./Search/BinarySearch'),
        BinarySortedTree: require('./Search/BinarySortedTree').default,
        BPlusTree: require('./Search/BPlusTree'),
        BTree: require('./Search/BTree'),
        DigitalSearchTree: require('./Search/DigitalSearchTree'),
        fibonacciSearch: require('./Search/fibonacciSearch').default,
        HashTable: require('./Search/HashTable'),
        RedBlackTree: require('./Search/RedBlackTree').default,
        sequentialSearch: require('./Search/sequentialSearch').default,
        SOSTree: require('./Search/SOSTree')
    },

    Sort: {
        distribution: require('./Sort/distribution/index'),
        exchange: require('./Sort/exchange/index'),
        insertion: require('./Sort/insertion/index'),
        merging: require('./Sort/merging/index'),
        selection: require('./Sort/selection/index')
    },

    Stack: require('./Stack/index').default,

    String: {
        HString: require('./String/HString').default,
        LString: require('./String/LString').default,
        SString: require('./String/SString').default
    }
};