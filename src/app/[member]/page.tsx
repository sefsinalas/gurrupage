import type { Metadata } from "next";
import { notFound } from "next/navigation";
import memberPages from "@/data/member-pages.json";

type MemberPage = {
  displayName: string;
  slug: string;
};

const members = memberPages.members as MemberPage[];

export const dynamicParams = false;

export function generateStaticParams() {
  return members.map(({ slug }) => ({ member: slug }));
}

function findMember(slug: string) {
  return members.find((member) => member.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ member: string }>;
}): Promise<Metadata> {
  const { member: slug } = await params;
  const member = findMember(slug);

  if (!member) {
    return {};
  }

  return {
    title: `${member.displayName} | Gurruboys`,
    robots: { index: false, follow: false },
  };
}

export default async function MemberPage({
  params,
}: {
  params: Promise<{ member: string }>;
}) {
  const { member: slug } = await params;
  const member = findMember(slug);

  if (!member) {
    notFound();
  }

  return (
    <main
      style={{
        width: "100%",
        height: "100dvh",
        margin: 0,
        overflow: "hidden",
        background: "#ffffff",
      }}
    >
      <iframe
        src={`/member-sites/${member.slug}/index.html`}
        title={`Página de ${member.displayName}`}
        sandbox="allow-scripts"
        referrerPolicy="no-referrer"
        style={{ width: "100%", height: "100%", border: 0, display: "block" }}
      />
    </main>
  );
}
