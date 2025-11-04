module.exports = async function multicast(nodes, startId, sendMessage, timeNow) {
  const fanout = 5;
  nodes[startId].receiveMessage(timeNow());
  let informed = [startId];
  let index = 0;

  while (index < informed.length) {
    const sender = informed[index];
    const targets = nodes[sender].neighbors.slice(0, fanout);
    for (const target of targets) {
      if (!nodes[target].received && sendMessage(sender, target)) {
        nodes[target].receiveMessage(timeNow());
        informed.push(target);
      }
    }
    index++;
  }
};