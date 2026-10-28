import { PageHeader } from '@/components/ui/page-header'
import { pageMetadata } from '@/lib/metadata'
import { site } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'Privacy Notice',
  description: 'How DeepSuite handles information submitted through this website.',
  path: '/privacy',
  index: false,
})

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: 'Privacy notice', href: '/privacy' }]}
        eyebrow="Privacy"
        title="Privacy notice"
        lead="How information submitted through this website is handled."
      />
      <section className="bg-white py-16 lg:py-20">
        <div className="container-site">
          <div className="mb-10 max-w-[44rem] rounded-lg border border-amber/50 bg-[#fff8ec] p-4 text-[0.88rem] text-[#6b4510]">
            This notice is a working summary and is subject to legal review before it is finalized.
          </div>
          <div className="prose-ds max-w-[44rem]">
            <h2 className="!mt-0">Information we collect</h2>
            <p>
              When you submit the consultation form, we receive the details you enter: your name, work email, company, role,
              industry, optional organization size, project type, optional information about current systems, your description of
              goals and an optional preferred meeting time.
            </p>
            <h2>How we use it</h2>
            <p>
              We use these details only to respond to your enquiry and to prepare for any conversation that follows. We do not add
              enquiry details to marketing lists and we do not sell personal information.
            </p>
            <h2>Analytics and cookies</h2>
            <p>This website does not set advertising or analytics cookies.</p>
            <h2>Retention</h2>
            <p>Enquiry details are retained only as long as needed to respond and to manage any resulting business relationship.</p>
            <h2>Your choices</h2>
            <p>
              You can ask us to access, correct or delete the information you submitted
              {site.contactEmail ? (
                <>
                  {' '}
                  by writing to <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
                </>
              ) : (
                <> by replying to any email we send you.</>
              )}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
