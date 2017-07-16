class PriorityQueue {
  constructor(data) {
    if (data) {
      this.data = [data];
    } else {
      this.data = [];
    }
  }

  add(value) {
    var index = this.data.length;
    this.data[index] = value;
    while (index != 0) {
      if (this.data[this.parentOf(index)] > this.data[index]) {
        var tmp = this.data[index];
        this.data[index] = this.data[this.parentOf(index)];
        this.data[this.parentOf(index)] = tmp;
      }
      index = this.parentOf(index);
    }
  }

  remove() {
    if (this.data.length == 0) { return null; }
    var result = this.data[0];
    this.data[0] = this.data[this.data.length - 1];
    this.data = this.data.splice(0,this.data.length - 1);
    var index = 0;
    while(this.childrenOf(index)[0] < this.data.length) {
      var c_arr = this.childrenOf(index);
      var next_index = null;
      if (c_arr[1] < this.data.length) {
        next_index = (this.data[c_arr[0]] > this.data[c_arr[1]]) ? c_arr[1] : c_arr[0];
      } else {
        next_index = c_arr[0];
      }
      if (this.data[next_index] < this.data[index]) {
        var tmp = this.data[next_index];
        this.data[next_index] = this.data[index];
        this.data[index] = tmp;
      }
      index = next_index;
    }
    return result;
  }

  add_all(arr) {
    for (var i = 0; i < arr.length; i++) {
      this.add(arr[i]);
    }
    return this.p();
  }

  peek() { return (this.data.length) ? this.data[0] : null; }

  parentOf(index) {
    return Math.floor((index - 1) / 2);
  }

  childrenOf(index) {
    return [index * 2 + 1, index * 2 + 2];
  }

  p() { return "[" + this.data.join(',') + "]"; }

}

function test(name, expected, actual) {
  if (!(expected == actual)) {
    console.log("\x1b[31mTest " + name + " failed!\x1b[0m");
    console.log("Expected value " + expected + " didnt happen. You got: " + actual);
  }
}

var x = new PriorityQueue(6);
test("new pq", x.p(), "[6]");
x.add(5);
test ("add", x.p(), "[5,6]");
test ("peek", x.peek(), 5);
test("remove", x.remove(), 5);
test("new pq", "[6]", x.p());
x.add(7);
x.add(9);
x.add(1);
test("adds", "[1,6,9,7]", x.p());
test("pop", 1, x.remove());
test("pop", 6, x.remove());
test("pop", 7, x.remove());
test("pop", 9, x.remove());
test("popx", null, x.remove());
x.add_all([5,10,15,7,1,2,1,1]);
test("pop", 1, x.remove());
test("pop", 1, x.remove());
test("pop", 1, x.remove());
test("pop", 2, x.remove());
test("pop", 5, x.remove());
test("pop", 7, x.remove());
test("pop", 10, x.remove());
test("pop", 15, x.remove());
