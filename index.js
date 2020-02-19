const request = require('sync-request')
const bn = require('bignumber.js')
const decimal = new bn(1000000000000000000)

if (process.argv.length != 7) {
    return
}

let host = process.argv[2],
    address = process.argv[3], 
    from = parseInt(process.argv[4]),
    to = parseInt(process.argv[5]),
    balance = parseInt(process.argv[6])

console.log('          host', host)
console.log('       address', address)
console.log('          from', from)
console.log('            to', to)
console.log('balance-filter', balance)

let ii = from
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

    let body = JSON.parse(res.getBody('utf8'))
    
    if(body.result) {
        let b = parseInt((new bn(body.result)).dividedBy(decimal).toFixed(0))
        if (ii % 1000 == 0) {
            console.log('checking at block', ii)
        }
        if (b < balance)
            console.log('block', ii, 'balance', b)
    }

    ii++
}