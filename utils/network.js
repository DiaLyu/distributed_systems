function createNetwork(numNodes, failureRate = 0.05) {
  const Node = require('../nodes/node');
  const nodes = [];
  for (let i = 0; i < numNodes; i++) {
    const node = new Node(i);
    node.failed = Math.random() < failureRate;
    nodes.push(node);
  }

  // Соединяем каждый узел с N соседями
  nodes.forEach(node => {
    for (let i = 0; i < 5; i++) {
      const neighbor = Math.floor(Math.random() * numNodes);
      if (neighbor !== node.id && !node.neighbors.includes(neighbor)) {
        node.neighbors.push(neighbor);
      }
    }
  });

  return nodes;
}

function sendMessage(from, to, lossRate = 0.1) {
  return Math.random() >= lossRate;
}

module.exports = { createNetwork, sendMessage };
