import { terser } from 'rollup-plugin-terser';

import { input, output, plugins } from './rollup.dev.config';
export default [{
    input,
    output,
    plugins: plugins.concat([terser()])
}];