// //冒泡排序
// let arr = [1,5,2,4,3];
//
// function getTime() {
//     // return Date.parse(new Date())
//     return new Date()
// }
//
//
// function maopao(arr){
//     let start = getTime()
//     for(var i = 0; i < arr.length; i++){
//         for(var j = 0; j < arr.length -1 -i;j++){
//             if(arr[j] > arr[j+1]){
//                 arr[j] = [arr[j+1],arr[j+1] = arr[j] ][0]
//             }
//         }
//     }
//     let end = getTime()
//     console.log(arr);
//     console.log(end - start);
// }
//
// // maopao(arr)
//
// const count = 3000
//
// /**
//  * 获取随机不重复数组
//  */
// function getRandomNum(cb) {
//
//     let list = _numList()
//     console.log(_setRandomList(list));
//     console.log(_setRandomList(list).length);
//
//
//     function _numList() {
//         let arr = []
//         for(var i = 0;i < count; i++){
//             arr.push(i+1)
//         }
//         return arr
//     }
//
//     function _getRandom(num) {
//         return Math.round(Math.random()*num)
//     }
//
//     function _setRandomList(arr) {
//         let newArr = []
//         for(var i = 0; i < arr.length; i++){
//             let num = _getRandom(arr.length)
//             newArr.push(arr.splice(num,1)[0])
//             i--
//         }
//         return newArr
//     }
// }
//
// getRandomNum()
//
// // console.log(Math.round(Math.random()*100));

function swap(array, a, b) {
  var tmp = array[a];
  array[a] = array[b];
  array[b] = tmp;
}

function selectionSort(array) {
  var _array = array.concat();

  for (var i = 0, len = _array.length; i < len; i++) {
    // 最值元素下标
    var index = i;

    for (var j = i + 1; j < len; j++)
      if (_array[j] < _array[index])
        index = j;

    swap(_array, i, index);
  }

  return _array;
}

var a = [1, 5, 2, 4, 3];
var ans = selectionSort(a);
console.log(ans); // [1, 2, 3, 4, 5]