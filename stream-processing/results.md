# Results

## Buffer

Initial RSS: 34 MB

After Read RSS: 236 MB

After Processing RSS: 636 MB

## Stream

Initial RSS: 34 MB

Final RSS: 44 MB


PS D:\Experiments\Backend Experiments\stream-processing> node buffer_test.js    

===== INITIAL MEMORY =====
{
  rss: 35328000,
  heapTotal: 6107136,
  heapUsed: 4535008,
  external: 1604317,
  arrayBuffers: 10511
}

===== AFTER FILE READ =====
{
  rss: 246517760,
  heapTotal: 7155712,
  heapUsed: 4247880,
  external: 211332406,
  arrayBuffers: 209725497
}

===== AFTER PROCESSING =====
{
  rss: 666116096,
  heapTotal: 216870912,
  heapUsed: 213985848,
  external: 421047392,
  arrayBuffers: 209725497
}



PS D:\Experiments\Backend Experiments\stream-processing> node stream_test.js    

===== INITIAL MEMORY =====
{
  rss: 35483648,
  heapTotal: 6107136,
  heapUsed: 4537160,
  external: 1604317,
  arrayBuffers: 10511
}

===== FINAL MEMORY =====
{
  rss: 46030848,
  heapTotal: 10301440,
  heapUsed: 5486624,
  external: 2299402,
  arrayBuffers: 534443
}