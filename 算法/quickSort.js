var arr = [5, 2, 12, 2, 134, 1, 3, 34, 4, 6, 1, 3, 4];
function quickSort(arr) {
    if (!arr)
        return [];
    if (arr.length == 0 || arr.length == 1)
        return arr;
    var left = [], right = [];
    var key = arr[0];
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > key) {
            right.push(arr[i]);
        }
        else {
            left.push(arr[i]);
        }
    }
    return quickSort(left).concat([key].concat(quickSort(right)));
}
console.log(quickSort(arr));
