const request = require('sync-request')

if (process.argv.length != 6) {
    return
}

let host = process.argv[2],
    address = process.argv[3], 
    from = parseInt(process.argv[4]),
    to = parseInt(process.argv[5])

console.log('   host', host)
console.log('address', address)
console.log('   from', from)
console.log('     to', to)

let i = from
let ii = i
console.log('ii', ii)
while (ii <= to){
    let res = request(
        'POST', 
        host,
        {
            headers: {
                'Content-Type': 'application/json'
            },
            json: {
                id: ii,
                jsonrpc: '2.0',
                method: 'eth_getBalance',
                params: [
                    address,
                    ii
                ]
            }
        }
    )
    console.log(JSON.parse(res.getBody('utf8')))
    ii++
}