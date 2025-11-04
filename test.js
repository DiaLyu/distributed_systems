const fs = require('fs');
const { createNetwork, sendMessage } = require('./utils/network');
const broadcast = require('./algorithms/singlecast'); // смените на нужный
const Node = require('./nodes/node');

function hrNow() {
  const [sec, nano] = process.hrtime();
  return sec * 1000 + nano / 1e6; // миллисекунды с плавающей точкой
}

async function runTest(algorithm, name, config = {}) {
  const NUM_NODES = 100;
  const START_NODE = 0;
  const nodes = createNetwork(NUM_NODES, config.failureRate || 0.05);

  const start = hrNow();
  await algorithm(nodes, START_NODE, (f, t) => sendMessage(f, t, config.lossRate || 0.1), hrNow);
  const end = hrNow();

  const stats = nodes.map(n => ({
    id: n.id,
    received: n.received,
    receiveTime: n.receiveTime ? +(n.receiveTime - start).toFixed(3) : null,
    failed: n.failed,
  }));

  fs.writeFileSync(`results_${name}.json`, JSON.stringify(stats, null, 2));
  console.log(`${name} completed in ${end - start}ms`);
}

async function main() {
  const algorithms = {
    broadcast: require('./algorithms/broadcast'),
    singlecast: require('./algorithms/singlecast'),
    multicast: require('./algorithms/multicast'),
    improvedGossip: require('./algorithms/improvedGossip'),
    gossip: require('./algorithms/gossip'),
  };

  for (const [name, algo] of Object.entries(algorithms)) {
    await runTest(algo, name);
  }
}

main();
