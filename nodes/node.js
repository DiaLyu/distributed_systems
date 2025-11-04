class Node {
  constructor(id) {
    this.id = id;
    this.neighbors = [];
    this.received = false;
    this.failed = false;
    this.receiveTime = null;
  }

  receiveMessage(time) {
    if (!this.received && !this.failed) {
      this.received = true;
      this.receiveTime = time;
    }
  }
}

module.exports = Node;
