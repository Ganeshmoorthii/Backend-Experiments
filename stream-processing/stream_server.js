//Building a Multi-Stage Pipeline with On-the-Fly Gzip Compression and Network Streaming.
const http = require('http');
const zlib = require('zlib');
const fs = require('fs');

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Content-Encoding': 'gzip',
        'Content-Disposition': 'attachment; filename="compressed_data.txt.gz"'
    });

    console.log("Client connected. Starting high-performance stream...");
    const startTime = Date.now();

    const readStream = fs.createReadStream('large_file.txt');
    const gzipStream = zlib.createGzip();

    const memoryInterval = setInterval(() => {
        const memory = process.memoryUsage();
        console.log({
            rss: memory.rss,
            heapTotal: memory.heapTotal,
            heapUsed: memory.heapUsed,
            external: memory.external,
            arrayBuffers: memory.arrayBuffers
        });
    }, 100);

    readStream
        .pipe(gzipStream)
        .pipe(res)
        .on('finish', () => {
            clearInterval(memoryInterval);
            const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);
            console.log(`➔ Success! File compressed and streamed in ${timeTaken} seconds.`);
        });
        
});

server.listen(3000,() => {
    console.log('Server is running on http://localhost:3000');
});