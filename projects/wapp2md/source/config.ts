
import { writeFileSync } from 'fs'
import { parseTiezi } from '../source'




parseTiezi(5544838611)
    .then($ => { writeFileSync(`${__dirname}/5544838611.md`, $) })
