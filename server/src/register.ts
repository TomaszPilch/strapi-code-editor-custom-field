import type { Core } from '@strapi/strapi'

import { PLUGIN_ID } from '../../admin/src/pluginId'

export default ({ strapi }: { strapi: Core.Strapi }) => {
  strapi.customFields.register({
    name: 'code-editor-json',
    plugin: PLUGIN_ID,
    type: 'json',
  })
  strapi.customFields.register({
    name: 'code-editor-text',
    plugin: PLUGIN_ID,
    type: 'text',
  })
}
