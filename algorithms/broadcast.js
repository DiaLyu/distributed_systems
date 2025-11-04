async function broadcast(nodes, startId, sendMessage, timeNow) {
  const queue = [startId];
  nodes[startId].receiveMessage(timeNow());

  while (queue.length > 0) {
    const current = queue.shift();
    for (const neighbor of nodes[current].neighbors) {
      if (sendMessage(current, neighbor)) {
        if (!nodes[neighbor].received) {
          nodes[neighbor].receiveMessage(timeNow());
          queue.push(neighbor);
        }
      }
    }
  }
}

module.exports = broadcast;
