import * as request from 'request-promise'
import * as cheerio from 'cheerio'
import { parseFloor } from './parser'

export interface Tiezi {
    title: string
    id: number
    click?: number
    reply?: number
    date?: string
}

// 精品 lm=4, 否则 lm=1
async function getSelector(name: string, offset: number) {
    const options = {
        uri: encodeURI(`https://tieba.baidu.com/mo/m?kw=${name}&lm=4$pn=${offset}`),
        transform: function (body: string) {
            return cheerio.load(body, { xmlMode: true })
        }
    }
    const selector = await request(options) as CheerioStatic
    return selector
}

export async function parsePage(name: string) {
    async function getArray(page: number) {
        const selector = await getSelector(name, 20 * page) // 当前 API 单次获取上限为 20
        const floors = selector('body > div')
        return floors.children().map(parseFloor).toArray()
    }
    const selector = await getSelector(name, 0)
    const floors = selector('body > div')
    const pages = selector('body > div > form:nth-child(21) > div > input[type=text]:nth-child(2)')
    let list = floors.children().map(parseFloor).toArray()
    // first catch
    for (let index = 1; index < parseInt(pages.attr().value); index++) {
        list = await getArray(index).then(_ => { return list.concat(_) })
    }
    return list as unknown as Tiezi[]
}