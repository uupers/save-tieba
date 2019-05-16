import { writeFileSync } from 'fs'
import { parseTieba } from '../source'

parseTieba('数学')
    .then($ => { writeFileSync(`${__dirname}/数学吧.json`, JSON.stringify($, null, 4)) })


parseTieba('galgame')
    .then($ => { writeFileSync(`${__dirname}/galgame 吧.json`, JSON.stringify($, null, 4)) })
