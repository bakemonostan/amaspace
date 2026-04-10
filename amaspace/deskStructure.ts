import type {StructureResolver} from 'sanity/structure'

/** Legacy doc for stats / certifications only. */
const SITE_SETTINGS_DOCUMENT_ID = 'af2e3130-399a-4b81-a63f-a9281dd51001'

export const deskStructure: StructureResolver = async (S, context) => {
  const client = context.getClient({ apiVersion: '2024-01-01' })
  const [contactId, heroId] = await Promise.all([
    client.fetch<string | null>(`*[_type == "siteContact"] | order(_updatedAt desc) [0]._id`),
    client.fetch<string | null>(`*[_type == "homeHero"] | order(_updatedAt desc) [0]._id`),
  ])

  return S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site contact')
        .id('singleton-siteContact')
        .child(
          contactId
            ? S.document().schemaType('siteContact').documentId(contactId)
            : S.documentList()
                .title('Site contact')
                .filter('_type == "siteContact"')
                .child((id) => S.document().documentId(id).schemaType('siteContact')),
        ),
      S.listItem()
        .title('Home hero')
        .id('singleton-homeHero')
        .child(
          heroId
            ? S.document().schemaType('homeHero').documentId(heroId)
            : S.documentList()
                .title('Home hero')
                .filter('_type == "homeHero"')
                .child((id) => S.document().documentId(id).schemaType('homeHero')),
        ),
      S.listItem()
        .title('Site settings')
        .id('singleton-siteSettings')
        .child(S.document().schemaType('siteSettings').documentId(SITE_SETTINGS_DOCUMENT_ID)),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId()
        return id !== 'siteContact' && id !== 'homeHero' && id !== 'siteSettings'
      }),
    ])
}
