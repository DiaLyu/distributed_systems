const fs = require('fs');

function summarizeStats(fileName) {
  const data = JSON.parse(fs.readFileSync(fileName));
  const received = data.filter(n => n.received);
  const failed = data.filter(n => n.failed);

  const avgTime = received.reduce((sum, n) => sum + n.receiveTime, 0) / received.length;
  const maxTime = Math.max(...received.map(n => n.receiveTime));

  return {
    total: data.length,
    received: received.length,
    failed: failed.length,
    avgTime,
    maxTime,
  };
}

module.exports = { summarizeStats };