import { terser } from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";

const copyRight = `/**
* -------------------------------------------------------------------------------------------
* Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
* See License in the project root for license information.
* -------------------------------------------------------------------------------------------
*/`;
const config = [
	{
		input: ["lib/es/src/browser/rollupEntry.js"],
		output: {
			file: "lib/graph-js-sdk.js",
			format: "iife",
			name: "MicrosoftGraph",
		},
		plugins: [
			resolve(),
			babel({
				babelHelpers: "runtime",
				exclude: "node_modules/**",
			}),
			commonjs({ include: "node_modules/**" }),
			terser({
				format: {
					comments: false,
					preamble: copyRight,
				},
			}),
		],
	},
	{
		input: ["authProviders/es/azureTokenCredentials/index.js"],
		output: {
			file: "lib/graph-client-tokenCredentialAuthProvider.js",
			format: "iife",
			name: "MicrosoftGraph.TokenCredentialAuthProvider",
		},
		plugins: [
			resolve({ browser: true, preferBuiltins: false }),
			babel({
				babelHelpers: "runtime",
				exclude: "node_modules/**",
			}),
			commonjs({ include: "node_modules/**" }),
			terser({
				format: {
					comments: false,
					preamble: copyRight,
				},
			}),
		],
	},
	{
		input: ["authProviders/es/msal/index.js"],
		external: ["msal"],
		output: {
			file: "lib/msal-Token.js",
			format: "iife",
			name: "ms",
			globals: {
				msal: "Msal",
			},
		},
		plugins: [
			resolve({ browser: true, preferBuiltins: false, skip: "msal" }),
			babel({
				babelHelpers: "runtime",
				exclude: "node_modules/**",
			}),
			commonjs({ include: "node_modules/**" }),
			// terser({
			// 	format: {
			// 		comments: false,
			// 		preamble: copyRight,
			// 	},
			// }),
		],
	},
	// sample browser token
	{
		input: ["lib/es/src/browser/TokenSample.js"],
		output: {
			file: "lib/token.js",
			format: "iife",
			name: "sample",
		},
		plugins: [
			resolve(),
			babel({
				babelHelpers: "runtime",
				exclude: "node_modules/**",
			}),
			commonjs({ include: "node_modules/**" }),
		],
	},
];

export default config;
