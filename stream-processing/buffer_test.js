const fs = require('fs');

console.log('\n===== INITIAL MEMORY =====');

let memory = process.memoryUsage();

console.log({
    rss: memory.rss,
    heapTotal: memory.heapTotal,
    heapUsed: memory.heapUsed,
    external: memory.external,
    arrayBuffers: memory.arrayBuffers
});

fs.readFile('large_file.txt', (err, data) => {
    if (err) throw err;

    console.log('\n===== AFTER FILE READ =====');

    memory = process.memoryUsage();

    console.log({
        rss: memory.rss,
        heapTotal: memory.heapTotal,
        heapUsed: memory.heapUsed,
        external: memory.external,
        arrayBuffers: memory.arrayBuffers
    });

    const processedData = data.toString().toUpperCase();

    console.log('\n===== AFTER PROCESSING =====');

    memory = process.memoryUsage();

    console.log({
        rss: memory.rss,
        heapTotal: memory.heapTotal,
        heapUsed: memory.heapUsed,
        external: memory.external,
        arrayBuffers: memory.arrayBuffers
    });

    setTimeout(() => {}, 5000);
});