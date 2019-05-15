function parseHead(o: CheerioElement, info: object) {
    const s = o.firstChild.data
    console.log(s.substring(s.indexOf('.') + 2))
    return s.substring(s.indexOf('.') + 2)
}

function parseTail(o: CheerioElement, info: object) {

}


export function parseFloor(i: number, o: CheerioElement) {
    let info = {}
    switch (o.name) {
        case 'div':
            if (!['i', 'i x'].includes(o.attribs.class)) { return '' }
            parseHead(o.firstChild, info)
            return ''
        default:
            //调试
            //console.log(o)
            return ''
    }
}
