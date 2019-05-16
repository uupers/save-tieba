class Info {
    title?: string
    id?: number
    click?: number
    reply?: number
    author?: string
    date?: string
}


function parseHead(o: CheerioElement, info: Info) {
    const s = o.firstChild.data
    const href = o.attribs.href.split('/m?kz=')[1]
    info.title = s.substring(s.indexOf('.') + 2)
    info.id = parseInt(href.substring(0, href.indexOf('&')))
}

function parseTail(o: CheerioElement, info: Info) {
    const s = o.firstChild.data.split(' ') // fuck!!! 全角空格!
    info.click = parseInt(s[0].substring(1))
    info.reply = parseInt(s[1].substring(1))
    //info.author = s[2] // 最终回复者
    info.date = s[3]
}


export function parseFloor(i: number, o: CheerioElement) {
    let info = {}
    switch (o.name) {
        case 'div':
            if (!['i', 'i x'].includes(o.attribs.class)) { return }
            parseHead(o.firstChild, info)
            // parseTail(o.lastChild, info)
            return info
        default:
            //调试
            //console.log(o)
            break
    }
}

export function parsePageNumber(floors: Cheerio) {
    function parseNumber(i: number, o: CheerioElement) {
        if (o.name != 'form') { return }
        const c = o.firstChild
        if (c.attribs.class != 'bc p') { return }
        return parseInt(c.children[3].attribs.value)
    }
    const answer = floors.children().map(parseNumber)
    return answer.toArray()[0] as unknown as number
}