import { promisify } from 'util'
import { pipeline, Transform } from 'stream'
import { createReadStream, createWriteStream } from 'fs'

const pipelineAsync = promisify(pipeline)

console.time('time:')
const combinedStreams = createReadStream('coupons.csv')
const finalStream = createWriteStream('output.csv')
const handleStream = new Transform({
    transform: (chunk, encoding, cb) => {
        const output = chunk.toString().replace(/(CUP)/g, "$1-").replace(/CUP/g, 'TEST')
        return cb(null, output)
    }
})

await pipelineAsync(
    combinedStreams,
    handleStream,
    finalStream
)

console.timeEnd('time:')