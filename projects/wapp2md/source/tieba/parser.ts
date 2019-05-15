class Info {
    title?: string
    click?: number
    reply?: number
    author?: string
    date?: string
}


function parseHead(o: CheerioElement, info: Info) {
    const s = o.firstChild.data
    info.title = s.substring(s.indexOf('.') + 2)
}

function parseTail(o: CheerioElement, info: Info) {
    const s = o.firstChild.data.split(' ') // fuck!!! 全角空格!
    info.click = parseInt(s[0].substring(1))
    info.reply = parseInt(s[1].substring(1))
    info.author = s[2]
    info.date = s[3]
}


export function parseFloor(i: number, o: CheerioElement) {
    let info = {}
    switch (o.name) {
        case 'div':
            if (!['i', 'i x'].includes(o.attribs.class)) { return '' }
            parseHead(o.firstChild, info)
            parseTail(o.lastChild, info)
            console.log(info)
            return info
        default:
            //调试
            //console.log(o)
            break
    }
}
