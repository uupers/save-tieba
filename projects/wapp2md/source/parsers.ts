function fixLink(src: string) {
    if (src.endsWith('.jpg')) {
        const img = decodeURIComponent(src.split('src=')[1])
        return `![](${img})`
    }
}

function fixText(s: string, i: number) {
    if (i == 0) {
        return s.substring(s.indexOf('楼. ') + 3) // 因为是三个字符
    }
    else {
        return s
    }
}


export function parserLine(o: CheerioElement, i: number) {
    switch (o.type) {
        case 'text': return fixText(o.data, i)
        case 'tag':
            switch (o.name) {
                case 'br': return '\n\n'
                case 'a': return fixLink(o.attribs.href)
                case 'table': return `@unknow(${i + 1}楼 ${o})`
            }
        default:
            //调试
            //console.log(o)
            break
    }
}

export function parserFloor(index: number, o: CheerioElement) {
    return o.children.map(parserLine).join('')
}