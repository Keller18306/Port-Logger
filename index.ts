import { appendFileSync } from 'fs'
import { createServer, Socket } from 'net'

const ports: number[] = [
    20,
    22,
    23,
    1111,
    2222,
    3333,
    4444,
    5555,
    6666,
    7777,
    8888,
    9999,
    19132,
    22980,
    23231,
    25565,
    27010,
    27015,
    44707,
    65535
]

function connection(socket: Socket) {
    const date = new Date()

    if (socket.remoteAddress == undefined) {
        if (!socket.destroyed) socket.destroy()
        return;
    }

    const ipParts = socket.remoteAddress.split(':')
    const ip = ipParts[ipParts.length - 1]

    const port = socket.localPort

    const time = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')},${date.getMilliseconds().toString().padStart(3, '0')}`

    appendFileSync('logs.txt', `[${time}]: ${ip} on port ${port}\n`)

    socket.write('Idi nahui')

    socket.destroy()
}

for (const port of ports) createServer(connection).listen(port, () => {
    console.log(`Start server on ${port}`)
})