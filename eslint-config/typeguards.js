import { noCustomTypeguardPlugin } from './src/noCustomTypeguardPlugin.js'

/**
 * A custom ESLint configuration to suggest using narrowland instead of implementing custom typeguards.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const noCustomTypeguardConfig = [
  {
    plugins: {
      typeguards: noCustomTypeguardPlugin,
    },
    rules: {
      "typeguards/typeguard-warning": "warn",
    }
  }
]
