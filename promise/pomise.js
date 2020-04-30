/*
 * @Author: maoyuyu
 * @Date: 2020-04-18 22:11:35
 * @LastEditors: maoyuyu
 * @LastEditTime: 2020-04-20 18:32:49
 * @Description: 
 */

class MyPromise {
  constructor(fn) {
    this.status = 'padding'
    this.value = undefined
    this.resolveList = []
    this.rejectList = []
    const resolve = (obj) => {
      if (this.status === 'padding') {
        this.status = 'fulfilled'
        this.resolveList.forEach(fn => {
          fn()
        })
      }

    }

    const reject = () => {
      if (this.status === 'padding') {
        this.status = 'reject'
        this.rejectList.forEach(fn => {
          fn()
        })
      }
    }

    fn(resolve, reject)
  }

  then(onFulResolve, onFulReject) {
    return new MyPromise(function (resolve, reject) {
      if (this.status === 'fulfilled') {

      }
    })
  }
}

var firstUniqChar = function(s) {
  let map = {}
  let res = " "
  for(let i = s.length - 1; i >= 0; i--){
      if(!map[s[i]]){
          map[s[i]] = true
          res = s[i]
      }else{
        if(res === s[i]){
            res = " "
        }
      }
  }
  return res
};

console.log(firstUniqChar('dddccdbba'));
