const fs = require('fs');
const { Transform } = require('stream');

console.log('\n===== INITIAL MEMORY =====');

let memory = process.memoryUsage();

console.log({
    rss: memory.rss,
    heapTotal: memory.heapTotal,
    heapUsed: memory.heapUsed,
    external: memory.external,
    arrayBuffers: memory.arrayBuffers
});

const readStream = fs.createReadStream('large_file.txt');
const writeStream = fs.createWriteStream('clean_data.txt');

const uppercaseTransform = new Transform({
    transform(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase());
        callback();
    }
});

readStream
    .pipe(uppercaseTransform)
    .pipe(writeStream)
    .on('finish', () => {

        console.log('\n===== FINAL MEMORY =====');

        const memory = process.memoryUsage();

        console.log({
            rss: memory.rss,
            heapTotal: memory.heapTotal,
            heapUsed: memory.heapUsed,
            external: memory.external,
            arrayBuffers: memory.arrayBuffers
        });
    });