/* eslint-disable @typescript-eslint/no-unused-vars */
import { bundle } from '@adminjs/bundler'
import { componentLoader } from './component-loader.js';

(async () => {
  const files = await bundle({
    componentLoader,
    destinationDir: './public',
  });

  console.log(files);
})();