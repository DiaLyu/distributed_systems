async function improvedGossip(nodes, startId, sendMessage, timeNow) {
  const TTL = 5;
  const informed = new Set([startId]);
  const rounds = Array(nodes.length).fill(0);
  nodes[startId].receiveMessage(timeNow());

  let changed = true;
  while (changed) {
    changed = false;
    for (let i = 0; i < nodes.length; i++) {
      if (informed.has(i) && rounds[i] < TTL) {
        for (let j = 0; j < 3; j++) {
          const peer = nodes[i].neighbors[Math.floor(Math.random() * nodes[i].neighbors.length)];
          if (sendMessage(i, peer)) {
            if (!nodes[peer].received) {
              nodes[peer].receiveMessage(timeNow());
              informed.add(peer);
              changed = true;
            }
          }
        }
        rounds[i]++;
      }
    }
  }
}

module.exports = improvedGossip;