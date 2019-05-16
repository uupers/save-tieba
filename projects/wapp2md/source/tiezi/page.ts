import * as request from 'request-promise'
import * as cheerio from 'cheerio'
import { parseFloor } from './parser'


async function getSelector(id: number, offset: number) {
    const options = {
        uri: `https://tieba.baidu.com/mo/m?kz=${id}&pn=${offset}`,
        transform: function (body: string) {
            return cheerio.load(body, { xmlMode: true })
        }
    }
    const selector = await request(options) as CheerioStatic
    return selector
}

export async function parsePage(id: number) {
    async function getArray(page: number) {
        const selector = await getSelector(id, 30 * page) // 当前 API 单次获取上限为 30
        const floors = selector('body > div > div:nth-child(4)')
        return floors.children().map(parseFloor).toArray()
    }
    const selector = await getSelector(id, 0)
    const floors = selector('body > div > div:nth-child(4)')
    const pages = selector('body > div > div:nth-child(4) > form > div > input[type=text]:nth-child(7)')
    let list = floors.children().map(parseFloor).toArray()
    // first catch
    for (let index = 1; index < parseInt(pages.attr().value); index++) {
        list = await getArray(index).then(_ => { return list.concat(_) })
    }
    return list.join('\n\n')
}