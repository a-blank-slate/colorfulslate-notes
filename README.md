# Note taking app with cloudflare worker and KV

This note taking app calls the cloudflare workers for data, which in turn uses the cloudflare KV to read and write data.
Cloudflare worker is protected by a password, which caller needs to pass in header (hackingCode) 

This entire app is hosted on Cloudflare Pages
