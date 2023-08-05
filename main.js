import excel from 'xlsx'
import { writeFile } from 'fs/promises'
import { default as glob } from 'fast-glob'
import pako from 'pako'
import { pack } from 'msgpackr';
function compress(json) {
    const keys = Object.keys(json[0]);
    const data = json.flatMap(item => Object.values(item))
    const compressed = {
        keys, data
    };
    return compressed;
}

(async () => {
    const files = await glob('xlsx/*.xlsx', { objectMode: true })
    console.log('List of files:')
    console.log(files.map(file => file.name))

    let allHeaders = []
    let allData = []
    for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const workBook = excel.readFile(file.path)
        const [firstSheet] = workBook.SheetNames


        // Convert to JSON
        let data = excel.utils.sheet_to_json(workBook.Sheets[firstSheet])

        // Make different columns equal Gbp*Gy -> Gy*Gbp
        data = data.map((item) => {
            if ('DSBs/(Gbp*Gy)' in item) {
                item['DSBs/(Gy*Gbp)'] = item['DSBs/(Gbp*Gy)']
                delete item['DSBs/(Gbp*Gy)']
            }
            if ('nonDSBClusters/(Gbp*Gy)' in item) {
                item['nonDSBClusters/(Gy*Gbp)'] = item['nonDSBClusters/(Gbp*Gy)']
                delete item['nonDSBClusters/(Gbp*Gy)']
            }

            item['TypeofRadiation'] = file.name.replace('.xlsx', '')
            return item
        })

        const headers = Object.keys(data[0])
        await writeFile(`./headers/${file.name.replace('xlsx', 'txt')}`, Buffer.from(headers.join('\n')))

        // Save plain json
        await writeFile(`./json/${file.name.replace('xlsx', 'json')}`, Buffer.from(JSON.stringify(data)))

        // Make it a little bit optimized
        const compressedData = compress(data)
        await writeFile(`./json-optimized/${file.name.replace('xlsx', 'json')}`, Buffer.from(JSON.stringify(compressedData)))

        // Make it more optimized
        const msgPack = pack(compressedData)
        await writeFile(`./json-optimized-msgpack/${file.name.replace('xlsx', 'mpk')}`, msgPack)

        // Make it most optimized
        const gzip = pako.deflate(msgPack, { to: 'string', level: 9 })
        await writeFile(`./json-optimized-msgpack-gzip/${file.name.replace('xlsx', 'mpk.gz')}`, gzip)


        allHeaders = allHeaders.concat(headers)
        allData = allData.concat(data)
    }
    allHeaders = [...new Set(allHeaders)]

    const checkIfExists = (header, item) => (Object.keys(item).includes(header)) ? true : false
    allData = allData.map(data => {
        allHeaders.forEach(header => {
            if (!checkIfExists(header, data)) {
                data[header] = 'N/A'
            }
        })
        return data
    })
    await writeFile(`./all-json/all.json`, Buffer.from(JSON.stringify(allData)))
    await writeFile(`./all-json-optimized-msgpack-gzip/all.mpk.gz`, pako.deflate(pack(compress(allData)), { to: 'string', level: 9 }))

})()