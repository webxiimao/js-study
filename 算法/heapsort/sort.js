function swap(arr, a, b) {
    if (a == b) { return; }
    var c = arr[a];
    arr[a] = arr[b];
    arr[b] = c;
}
function heapSort(iArr) {
    if(iArr.length <= 1)return iArr
    let len = iArr.length
    for(let i = Math.floor(len / 2); i >=0; i--){
        maxHeapify(iArr, i, len)
    }
    for(let j = 0; j < len; j++){
        swap(iArr, 0, len - 1 - j)
        maxHeapify(iArr, 0 ,len - 2 - j)
    }
    return iArr
}
function maxHeapify(Arr, i, size) {
    let l = i * 2 + 1;
    let r = (i + 1) * 2;
    let largest = i;
    if(l <= size && Arr[l] > Arr[i]){
        largest = l;
    }
    if(r <= size && Arr[r] > Arr[i]){
        largest = r;
    }
    if(largest != i){
        swap(Arr, largest, i)
        maxHeapify(Arr, largest, size)
    }
}