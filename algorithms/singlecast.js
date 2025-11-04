module.exports = async function singlecast(nodes, startId, sendMessage, timeNow) {
  nodes[startId].receiveMessage(timeNow());
  let current = startId;

  for (let i = 0; i < nodes.length; i++) {
    if (i !== current && sendMessage(current, i)) {
      nodes[i].receiveMessage(timeNow());
      current = i;
    }
  }
};