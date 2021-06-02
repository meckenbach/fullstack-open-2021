import { resolve } from 'path';
import fs from 'fs';
import * as TJS from 'typescript-json-schema';

const outDir = "./src/validators/schemas";

const settings: TJS.PartialArgs = {
  required: true
};

const program = TJS.getProgramFromFiles([resolve("./src/types.ts")]);

const generator = TJS.buildGenerator(program, settings);

if (generator) {
  const [,, ...types] = process.argv;
  types.forEach(type => {
    const schema = generator.getSchemaForSymbol(type);
    fs.writeFileSync(resolve(outDir, `${type}.json`), JSON.stringify(schema));
  });  
}
