import * as request from 'request-promise'
import * as cheerio from 'cheerio'
import { parserFloor } from './parsers'

export function parserPage(id: number) {
    const options = {
        uri: `http://tieba.baidu.com/mo/m?kz=${id}`,
        transform: function (body: string) {
            return cheerio.load(body, { xmlMode: true })
        }
    }
    return request(options)
        .then(($: CheerioStatic) => {
            const floors = $('body > div > div:nth-child(4)')
            return floors.children()
        })
        .then($ => {
            const list = $.map(parserFloor).toArray()
            return list.join('\n\n------------------------------------------\n\n')
        })
}