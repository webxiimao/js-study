var exist = function(board, word) {
    let index = 0;
    let boardLen = board.length;
    let boardInnerLen = board[0].length;
    let maps = [...Array(boardLen)].map(i => [...Array(boardInnerLen)]);
    
    function selectBelong(board, i ,j, key){
        
        if(!key)return true
        
        if(i !==0 && board[i - 1][j] == key && !maps[i-1][j]){
            maps[i-1][j]=1
            if(selectBelong(board, i - 1, j, word[++index]))return true
        }
        if( i !== boardLen-1 && board[i + 1][j] == key && !maps[i+1][j]){
            maps[i + 1][j]=1
            if(selectBelong(board, i + 1, j, word[++index]))return true
        }
        if( j !==0 &&  board[i][j - 1] == key && !maps[i][j-1]){
            maps[i][j-1]=1
            if(selectBelong(board, i, j - 1, word[++index]))return true
        }
        if( j !==boardInnerLen - 1 &&  board[i][j + 1] == key && !maps[i][j+1]){
            maps[i][j+1]=1
            if(selectBelong(board, i, j + 1, word[++index]))return true
        }
        maps[i][j] = 0
        index--
        return false
    }
    for( var i = 0; i < board.length; i++ ){
        for( var j = 0; j < board[i].length; j++ ){
            
            if(board[i][j] == word[index]){
                maps[i][j] = 1
                if(selectBelong(board,i,j,word[++index])){
                    return true
                }
                maps[i][j]=0
            }
            
        }
    }
    return false
};
// let board =
// [
//   ['A','B','C','E'],
//   ['S','F','C','S'],
//   ['A','D','E','E']
// ]
let board = [["a","a"]]
let word = "aaa"
console.log(exist(board, word));
