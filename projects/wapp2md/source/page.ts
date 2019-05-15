import * as request from 'request-promise'
import * as cheerio from 'cheerio'
import { parserFloor } from './parsers'

export async function parserPage(id: number) {
    const options = {
        uri: `http://tieba.baidu.com/mo/m?kz=${id}`,
        transform: function (body: string) {
            return cheerio.load(body, { xmlMode: true })
        }
    }
    const selector = await request(options)
    const floors = selector('body > div > div:nth-child(4)')
    const list = floors.children().map(parserFloor).toArray()
    return list.join('\n\n------------------------------------------\n\n')
}