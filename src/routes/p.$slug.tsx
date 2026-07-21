import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { cmsService } from "@/services/cms.service";
import { Container } from "@/components/layout/Container";
import { Spinner } from "@/components/feedback/Spinner";
import { APP } from "@/constants/app";

export const Route = createFileRoute("/p/$slug")({
  component: CmsPageRender,
  loader: async ({ params: { slug } }) => {
    try {
      const page = await cmsService.getPageBySlug(slug);
      return { page };
    } catch (e) {
      // In a real SSR app, we'd throw a 404 here
      return { page: null };
    }
  },
  head: ({ loaderData }) => {
    const page = loaderData?.page;
    if (!page) {
      return {
        meta: [{ title: `Page Not Found — ${APP.name}` }],
      };
    }
    
    return {
      meta: [
        { title: page.seo?.metaTitle || `${page.title} — ${APP.name}` },
        { name: "description", content: page.seo?.metaDescription || page.title },
      ],
    };
  },
});

function CmsPageRender() {
  const { slug } = Route.useParams();
  
  // We use initialData from the loader, but this also handles client-side refetches
  const { data: page, isLoading, isError } = useQuery({
    queryKey: ["cms-page", slug],
    queryFn: () => cmsService.getPageBySlug(slug),
    initialData: Route.useLoaderData()?.page,
    retry: 1,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isError || !page) {
    return (
      <Container className="py-20 text-center">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="mt-4 text-lg text-muted-foreground">The page you're looking for doesn't exist or is inactive.</p>
      </Container>
    );
  }

  return (
    <div className="bg-background min-h-[60vh]">
      {/* We can add a simple header banner if needed, but standard text pages often just have a clean header */}
      <div className="bg-slate-900 py-16">
        <Container>
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">{page.title}</h1>
        </Container>
      </div>
      
      <Container className="py-12">
        {/* Render Rich Text Content */}
        {/* We use prose classes from Tailwind Typography to format the raw HTML */}
        <div 
          className="prose prose-slate max-w-none dark:prose-invert prose-headings:font-display"
          dangerouslySetInnerHTML={{ __html: page.content || "" }}
        />
      </Container>
    </div>
  );
}
