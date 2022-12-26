import { Strapi } from '@strapi/strapi'

import pluginId from '../admin/src/pluginId'

export default ({ strapi }: { strapi: Strapi }) => {
  strapi.customFields.register({
    name: 'code-editor-json',
    plugin: pluginId,
    type: 'json',
  })
  strapi.customFields.register({
    name: 'code-editor-text',
    plugin: pluginId,
    type: 'text',
  })
}
