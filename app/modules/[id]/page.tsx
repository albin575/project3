import { notFound } from "next/navigation";
import { modules } from "@/lib/course-content";
import { NoteReader } from "@/components/note-reader";
import type { Metadata } from "next";

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ topic?: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const module = modules.find((item) => String(item.id) === id);
  return { title: module ? `${module.title} · padippu.` : "Module not found · padippu." };
}

export default async function ModulePage({ params, searchParams }: Props) {
  const { id } = await params;
  const { topic: topicId } = await searchParams;
  const module = modules.find((item) => String(item.id) === id);
  if (!module) notFound();
  const topic = topicId ? module.topics.find((item) => item.id === topicId) : module.topics[0];
  if (topicId && !topic) notFound();
  return <NoteReader module={module} topic={topic} />;
}
