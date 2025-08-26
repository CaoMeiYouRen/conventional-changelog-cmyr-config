import { createParserOpts, ParserOptions } from './parser'
import { createWriterOpts, WriterOptions } from './writer'
import { whatBump } from './whatBump'

export default async function createPreset(): Promise<{
    parser: ParserOptions
    writer: WriterOptions
    whatBump: typeof whatBump
}> {
    return {
        parser: createParserOpts(),
        writer: await createWriterOpts(),
        whatBump,
    }
}
