module.exports = async function gossip(nodes, startId, sendMessage, timeNow) {
  nodes[startId].receiveMessage(timeNow());
  let informed = new Set([startId]);
  let changed = true;

  while (changed) {
    changed = false;
    const newInformed = new Set([...informed]);

    for (const id of informed) {
      const neighbors = nodes[id].neighbors;
      if (!neighbors.length) continue;

      const target = neighbors[Math.floor(Math.random() * neighbors.length)];
      if (sendMessage(id, target)) {
        if (!nodes[target].received) {
          nodes[target].receiveMessage(timeNow());
          newInformed.add(target);
          changed = true;
        }
      }
    }
    informed = newInformed;
  }
};