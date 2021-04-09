import nodeResolve from '@rollup/plugin-node-resolve';
import commonJs from '@rollup/plugin-commonjs';
import typeScript from '@rollup/plugin-typescript';

export const input = 'src/main.ts'
export const output = [{ file: 'docs/app.js', format: 'cjs' }]
export const plugins = [
    nodeResolve(), // подключение модулей node
    commonJs(), // подключение модулей commonjs
    typeScript({ tsconfig: "tsconfig.json" }), // подключение typescript
]
export default [{ input, output , plugins}];