import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { extname, join } from 'node:path'

const ROOT = new URL('.', import.meta.url).pathname
const PORT = process.env.PORT || 4321

const MIME = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
}

createServer(async (req, res) => {
    const urlPath = req.url === '/' ? '/index.html' : req.url.split('?')[0]
    const filePath = join(ROOT, urlPath)

    try {
        const body = await readFile(filePath)
        res.writeHead(200, { 'Content-Type': MIME[extname(filePath)] || 'application/octet-stream' })
        res.end(body)
    } catch {
        res.writeHead(404)
        res.end('Not found')
    }
}).listen(PORT, () => {
    console.log(`e2e harness serving on http://localhost:${PORT}`)
})
