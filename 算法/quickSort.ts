let arr:number[] = [5, 2, 12, 2, 134, 1, 3, 34, 4, 6, 1, 3, 4]

function quickSort(arr:number[]):number[]{
    if(!arr )return []
    if(arr.length == 0 || arr.length == 1) return arr
    let left:number[] = [],
        right:number[] = [];
    let key:number = arr[0]
    for(let i = 1; i < arr.length; i++){
        if(arr[i] > key){
            right.push(arr[i])
        }else{
            left.push(arr[i])
        }
    }
    return quickSort(left).concat([key].concat(quickSort(right)))
}
console.log(quickSort(arr));
