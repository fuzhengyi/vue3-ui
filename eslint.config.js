import globals from 'globals'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import importSort from 'eslint-plugin-simple-import-sort'

export default tseslint.config({
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx,js}'],
    ignores: ['docs/**/*/{tmp,.dumi}/**/*', '*.js', '**/*/build/**/*', '**/*/es/**/*', '**/*/dist/**/*'],
    rules: {
        '@typescript-eslint/array-type': 'error',
        '@typescript-eslint/no-for-in-array': 'error',
        'no-unused-vars': 'error',
        'no-undef': 'warn',
        'no-console': 'off',
        'simple-import-sort/imports': [
            'error',
            {
                groups: [
                    ['^\\w'],
                    ['^@\\w'],
                    ['^@/'],
                    ['^\\u0000'],
                    ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                    ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$']
                ]
            }
        ],
        'simple-import-sort/exports': 'error'
    },
    languageOptions: {
        parser: tseslint.parser,//此配置指定了 ESLint 要使用的解析器，tseslint.parser 一般指的是 @typescript-eslint/parser，
        globals: {//通过展开 globals.browser 和 globals.node，你把浏览器环境和 Node.js 环境的全局变量都包含进来了。这样，ESLint 在检查代码时就不会把这些全局变量当作未定义的变量
            ...globals.browser,
            ...globals.node
        },
        parserOptions: {
            project: ['./tsconfig.eslint.json', '**/*/tsconfig.json'],//该选项告知 @typescript-eslint/parser 要使用哪些 TypeScript 项目配置文件（即 tsconfig.json）。这里指定了两个配置文件路径，一个是当前目录下的 tsconfig.eslint.json，另一个是所有子目录下的 tsconfig.json 文件。
            tsconfigRootDir: import.meta.dirname//此选项指定了 TypeScript 项目配置文件的根目录，import.meta.dirname 表示当前模块所在的目录。不过要注意，import.meta 只能在 ES 模块中使用。
        }
    },
    plugins: { 'simple-import-sort': importSort }
})
