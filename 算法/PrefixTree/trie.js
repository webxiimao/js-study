var Trie = function() {
    TrieNode.call(this,null)
};

function TrieNode(value){
    this.children = {}
    this.value = value
    this.endWord = false
}

/**
 * Inserts a word into the trie. 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word) {
    const insertHelpler = (node, word) => {
        if(!word)return
        let str = word.charAt(0)
        if(!node.children[str]){
            node.children[str] = new TrieNode(str)
        }
        if(!word.slice(1)){
            node.children[str].endWord = true
        }
        insertHelpler(node.children[str],word.slice(1))
        
    }
    insertHelpler(this,word)

};

/**
 * Returns if the word is in the trie. 
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function(word) {
    let str = word
    let node = this
    while(str){
        if(node.children[str[0]]){
            str = word.slice(1)
            node = node.children[word[0]]
        }else{
            return false
        }
    }
    return node.endWord == true
};

/**
 * Returns if there is any word in the trie that starts with the given prefix. 
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(prefix) {
    let str = prefix
    let node = this
    while(str){
        if(node.children[str[0]]){
            str = prefix.slice(1)
            node = node.children[prefix[0]]
        }else{
            return false
        }
    }
    return true
};

/** 
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */


 let tree = new Trie()
 tree.insert("apple")
console.log( tree.search("apple"));
