import { toArray } from '@antfu/utils'
import type { Options, ResolvedOptions } from './types'
import { getVueVersion } from './utils'

export function resolveOptions(userOptions: Options): ResolvedOptions {
  const defaultOptions: ResolvedOptions = {
    headEnabled: false,
    headField: '',
    frontmatter: true,
    excerpt: false,
    exposeFrontmatter: true,
    exposeExcerpt: false,
    escapeCodeTagInterpolation: true,
    customSfcBlocks: ['route', 'i18n', 'style'],
    componentOptions: {},
    frontmatterOptions: {},
    markdownItOptions: {},
    markdownItUses: [],
    markdownItSetup: () => {},
    wrapperComponent: null,
    transforms: {},
    vueVersion: userOptions.vueVersion || getVueVersion(),
    wrapperClasses: 'markdown-body',
    include: null,
    exclude: null,
    frontmatterPreprocess: (frontmatter, options, _id, defaults) => {
      return {
        head: defaults(frontmatter, options),
        frontmatter,
      }
    },
  }

  const options = {
    ...defaultOptions,
    ...userOptions,
  }

  options.wrapperClasses = toArray(options.wrapperClasses)
    .filter((i?: string) => i)
    .join(' ')

  return options as ResolvedOptions
}
