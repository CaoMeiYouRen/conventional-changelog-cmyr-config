import { createParserOpts } from './parser'
import { createWriterOpts } from './writer'
import { whatBump } from './whatBump'

export default async function createPreset() {
    return {
        parser: createParserOpts(),
        writer: await createWriterOpts(),
        whatBump,
    }
}
