const { generateApi } = require('swagger-typescript-api');
const path = require('path');
const fs = require('fs');

const ENTITIES_FOLDER_PATH = 'src/entities/';

fs.readdirSync(path.resolve(__dirname, ENTITIES_FOLDER_PATH)).forEach(
  async (estimatedEntityFolder) => {
    const directoryAbsolutePath = path.join(__dirname, ENTITIES_FOLDER_PATH, estimatedEntityFolder);

    if (fs.statSync(directoryAbsolutePath).isDirectory()) {
      const fileAbsolutePath = path.join(directoryAbsolutePath, 'specification.yaml');

      if (fs.existsSync(fileAbsolutePath)) {
        await generateApi({
          name: 'generatedApi.ts',
          output: directoryAbsolutePath,
          input: fileAbsolutePath,
          httpClientType: 'axios',
          moduleNameIndex: -1,
          templates: './templates',
        });
      }
    }
  },
);
