import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { IndustryBrief } from '@/components/industries/industry-brief'
import { IndustryPageTemplate } from '@/components/industries/industry-page-template'
import { JsonLd } from '@/components/ui/json-ld'
import { allSubRoutes, getArticle, getSub, industryHref } from '@/lib/industries'
import { pageMetadata } from '@/lib/metadata'
import { articleSchema, serviceSchema } from '@/lib/structured-data'

export const dynamicParams = false

export function generateStaticParams() {
  return allSubRoutes()
}

export async function generateMetadata(props: PageProps<'/industries/[industry]/[subindustry]'>): Promise<Metadata> {
  const { industry, subindustry } = await props.params
  const found = getSub(industry, subindustry)
  if (!found) return {}
  const article = getArticle(industry, subindustry)
  const path = industryHref(industry, subindustry)
  if (article) {
    return pageMetadata({ title: article.metaTitle, description: article.metaDescription, path, type: 'article' })
  }
  return pageMetadata({
    title: `${found.sub.name} — Industry brief`,
    description: `${found.sub.summary} How DeepSuite approaches enterprise software for ${found.sub.name.toLowerCase()}.`,
    path,
    index: false,
  })
}

export default async function SubIndustryPage(props: PageProps<'/industries/[industry]/[subindustry]'>) {
  const { industry, subindustry } = await props.params
  const found = getSub(industry, subindustry)
  if (!found) notFound()
  const article = getArticle(industry, subindustry)
  if (!article) return <IndustryBrief group={found.group} sub={found.sub} />

  const path = industryHref(industry, subindustry)
  return (
    <>
      <IndustryPageTemplate article={article} group={found.group} sub={found.sub} />
      <JsonLd
        data={[
          articleSchema({ title: article.title, description: article.metaDescription, path, section: found.group.name }),
          serviceSchema({ name: `Enterprise software for ${found.sub.name}`, description: article.intro, path, audience: found.sub.name }),
        ]}
      />
    </>
  )
}
