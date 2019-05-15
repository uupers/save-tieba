function fixLink(src: string) {
    if (src.endsWith('.jpg')) {
        const img = decodeURIComponent(src.split('src=')[1])
        return `![](${img})`
    }
}

function fixEmoji(src: string) {
    const img = decodeURIComponent(src)
    return `![](${img})`
}

function fixText(s: string) {
    return s.substring(s.indexOf('楼. ') + 3) // 因为是三个字符
}

function parserTable(o: CheerioElement) {
    console.log(o.children)
    return ''
}

function parserSpan(o: CheerioElement) {
    console.log(o.children)
    return ''
}

function parserHead(o: CheerioElement) {
    switch (o.type) {
        case 'text':
            const s = o.data.indexOf('楼. ')
            const rest = o.data.substring(s + 3)
            const head = o.data.substring(0, s)
            return `## ${head}楼\n${rest}`
        default:
            //调试
            //console.log(o)
            break
    }
}

function parserTail(o: CheerioElement) {
    switch (o.type) {
        case 'tag':
            const part = o.firstChild.children
            switch (part.length) {
                case 0: return ''
                case 2:
                    const who = part[0].firstChild.firstChild.firstChild.data
                    const when = part[0].lastChild.firstChild.data
                    return `- Author: ${who}\n- Date: ${when}`
                default:
                    //调试
                    //console.log(o)
                    break
            }
        default:
            //调试
            //console.log(o)
            break
    }
}


export function parserLine(o: CheerioElement) {
    switch (o.type) {
        case 'text': return o.data
        case 'tag':
            switch (o.name) {
                case 'br': return '\n\n'
                case 'a': return fixLink(o.attribs.href)
                case 'img': return fixEmoji(o.attribs.src)
                case 'span': return parserSpan(o)
            }
        default:
            //调试
            //console.log(o)
            break
    }
}

export function parserFloor(i: number, o: CheerioElement) {
    const cells = o.children
    let element: string[] = [parserHead(cells[0])]
    for (let x = 1; x < cells.length - 1; x++) {
        element = element.concat(parserLine(cells[x]))
    }
    return element.concat(parserTail(cells.slice(-1)[0])).join('')
}