import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import cssBundle from 'rollup-plugin-css-bundle'
import external from 'rollup-plugin-peer-deps-external';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import json from 'rollup-plugin-json';
import pkg from './package.json';
import path from "path";

export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true
      },
      {
        file: pkg.module,
        format: 'es',
        sourcemap: true
      }
    ],
    plugins: [
      babel({
        exclude: 'node_modules/**',
        runtimeHelpers: true
      }),
      cssBundle({
        include: ['**/*.scss'],
        output: path.resolve('dist/style.scss')
      }),
      json()
    ]
  },
  {
    input: 'src/index.js',
    output: [
      {
        file: pkg.umd,
        name: 'ReactForm',
        format: 'umd',
        sourcemap: true
      },
      {
        file: pkg['umd:min'],
        name: 'ReactForm',
        format: 'umd',
        sourcemap: true,
        plugins: [terser()]
      }
    ],
    plugins: [
      external(),
      babel({
        exclude: 'node_modules/**',
        runtimeHelpers: true
      }),
      resolve(),
      commonjs(),
      cssBundle({
        include: ['**/*.scss'],
        output: path.resolve('dist/style.scss')
      }),
      json()
    ]
  }
];
