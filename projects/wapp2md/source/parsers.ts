function fixLink(src: string) {
    if (src.endsWith('.jpg')) {
        const img = decodeURIComponent(src.split('src=')[1])
        return `![](${img})`
    }
}


export function parserLine(o: CheerioElement, i: number) {
    switch (o.type) {
        case 'text': return o.data
        case 'tag':
            switch (o.name) {
                case 'br': return '\n\n'
                case 'a': return fixLink(o.attribs.href)
                case 'table': return `@unknow(${i + 1}楼 ${o})`
            }
        default:
            //调试
            //console.log(o)
            break;
    }
}

export function parserFloor(i: number, o: CheerioElement) {
    return o.children.map(_ => parserLine(_, i)).join("")
}