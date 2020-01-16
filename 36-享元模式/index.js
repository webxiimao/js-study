// 生成单元格实例
const makeRowCells = data => data.map(value => new Cell(value));

// 定义常量
const scrollViewport = 10; // 当前表格视图大小
const tableSize = 2000; // 行数
let scrollIndex = 0; // 初始滚动索引

let DATA = []; // 初始数据集
while (DATA.length < scrollViewport) {
  const unit = DATA.length * 10;
  DATA.push('12345678'.split('').map(() => unit));
}

/**
* cell类 - 列
*/
class Cell {
  constructor(content) {
    this.content = content;
  }
  // 更新列
  updateContent(content) {
    this.content = content;
    this.cell.innerText = content;
  }

  // 渲染列
  render() {
    const cell = document.createElement('td');
    this.cell = cell;
    cell.innerText = this.content;

    return cell;

  }
}

/**
* row类 - 行
*/
class Row {
  constructor(cellItems) {
    this.cellItems = cellItems;
  }
  // 更新行
  updateRowData(newData) {
    this.cellItems.forEach((item, idx) => {
      item.updateContent(newData[idx]);
    });
  }

  // 渲染行
  render() {
    const row = document.createElement('tr');
    this.cellItems.forEach(item => row.appendChild(item.render()));

    return row;
  }
}

/**
* 表格类
*/
class Table {
  constructor(selector) {
    this.$table = document.querySelector(selector);
  }
  // 添加行
  addRows(rows) {
    this.rows = rows;
    this.rows.forEach(row => this.$table.appendChild(row.render()));
  }

  // 更新table数据
  updateTableData(data) {
    this.rows.forEach((row, idx) => row.updateRowData(data[idx]));
  }
}

// 实例化新表
const table = new Table('#table');
// 匹配滚动条的DOM
const scrollControl = document.querySelector('#scroll');
// 在table下添加单元格行
table.addRows(
  DATA.map(dataItem => new Row(makeRowCells(dataItem))));

const onScrollChange = event => {
    
  // 为视图准备新数据
  DATA = DATA.map((item, idx) => item.map(cell => parseInt(event.target.value, 10)*10 + idx*10));
  // 更新当前table的数据
  table.updateTableData(DATA);
  // 添加颜色区别样式
  scrollIndex = event.target.value;
  if (event.target.value >= 0) {
    table.$table.classList = 'low-range';
  }
  if (event.target.value > tableSize * 0.4) {
    table.$table.classList = 'mid-range';
  }
  if (event.target.value > tableSize * 0.7) {
    table.$table.classList = 'high-range';
  }
  if (event.target.value > tableSize * 0.9) {
    table.$table.classList = 'ultra-high-range';
  }
};
// 设置滚动条最小和最大范围
scrollControl.setAttribute('min', 0);
scrollControl.setAttribute('max', tableSize);
// 添加滚动事件
scrollControl.addEventListener('input', onScrollChange);

// 初始化事件
const event = {target: {value: 0}};
onScrollChange(event);