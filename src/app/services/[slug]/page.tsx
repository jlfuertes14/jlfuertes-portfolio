import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceArticleView from "@/components/services/ServiceArticleView";
import {
  getAdjacentServices,
  getServiceBySlug,
  services,
} from "@/lib/services-data";
import { projects, siteConfig } from "@/lib/site-data";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: `Service Not Found — ${siteConfig.name}`,
    };
  }

  return {
    title: `${service.title} — ${siteConfig.name}`,
    description: service.shortDesc,
    openGraph: {
      title: `${service.title} — ${siteConfig.name}`,
      description: service.description,
      type: "article",
      images: [
        {
          url: service.proof.image,
          alt: service.proof.alt,
        },
      ],
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const { prev, next } = getAdjacentServices(service.slug);

  const relatedProjects = service.relatedProjectTitles
    .map((title) => projects.find((project) => project.title === title))
    .filter((project): project is (typeof projects)[number] =>
      Boolean(project)
    );

  return (
    <ServiceArticleView
      service={service}
      prevService={prev}
      nextService={next}
      relatedProjects={relatedProjects}
    />
  );
}
