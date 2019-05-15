import { writeFileSync } from 'fs'
import { parserPage } from '../source'




parserPage(5544838611)
    .then($ => { writeFileSync(`${__dirname}/5544838611.md`, $) })