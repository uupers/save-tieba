import * as request from 'request-promise'
import * as cheerio from 'cheerio'
import { writeFileSync } from 'fs'

import { parserFloor } from '../source'

let options = {
    uri: 'http://tieba.baidu.com/mo/m?kz=5544838611',
    transform: function (body: string) {
        return cheerio.load(body, { xmlMode: true })
    }
}


const markdown = request(options)
    .then(($: CheerioStatic) => {
        const floors = $('body > div > div:nth-child(4)')
        return floors.children()
    })
    .then($ => {
        const list = $.map(parserFloor).toArray()
        return list.join('\n\n------------------------------------------\n\n')
    })

markdown.then($ => { writeFileSync(`${__dirname}/5544838611.md`, $) })