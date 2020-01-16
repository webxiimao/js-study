class PrefixTreeNode {
  constructor(value) {
    this.value = value;
    this.children = {};
    this.endWord = false;
  }

}

class PrefixTree extends PrefixTreeNode {
  constructor() {
    super(null)
  }
  addWord(word) {
    const addWordHelper = (node, str) => {
      if(!str)return
      if(!node.children[str[0]]){
        node.children[str[0]] = new PrefixTreeNode(str[0])
      }
      let restStr = str.slice(1)
      if(!restStr){
        node.children[str[0]].endWord = true
      }
      addWordHelper(node.children[str[0]], restStr)
      
    }
    addWordHelper(this, word)
  }

  predictWord(word){
    let allWords = []
    const findWordNode = (word, node) => {
      while(word){
        if(!node.children || !node.children[word.charAt(0)])return null
        node = node.children[word.charAt(0)]
        word = word.substr(1)
      }
      return node
    }

    const allWordsHelper = (strSoFar, node) => {
      if(!node) return
      for(let i in node.children ){
        const child = node.children[i]
        strSoFar = strSoFar + child.value
        if(child.endWord){
          allWords.push(strSoFar)
          return
        }
        allWordsHelper(strSoFar,child)
      }
    }
    if(findWordNode(word,this)){
      allWordsHelper(word,findWordNode(word,this))
    }
    return allWords
  }

  logAllWord(){

  }
}

let tree = new PrefixTree()
tree.addWord("helloWorld")
tree.addWord("hellokiki")
tree.addWord("myytest")
tree.addWord("myyboss")
tree.addWord("myyboo")
tree.addWord("mycute")
tree.addWord("bitch")
tree.addWord("bit")
tree.addWord("blur")

console.log(tree.predictWord("myy"));
