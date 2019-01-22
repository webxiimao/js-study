#-*- encoding=utf8 -*-
arr = [5,2,4,6,1,3]

#2,4,5,6,1
#2,4,5,1,6
#      1,6 ,i = 3,j = 4,  key == 1  ==>i = i -1 = 2

def INSERTSORT(arr):
    for j in range(1,len(arr)):
        key = arr[j]#保存arr[j] 6
        i = j - 1
        while i >= 0 and arr[i] > arr[i+1]:
            arr[i + 1] = arr[i]
            arr[i] = key
            i = i -1
    return arr






if __name__ == "__main__":
    print INSERTSORT(arr)