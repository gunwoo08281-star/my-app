import { createNoticeAction } from "@/lib/actions";
import { SubmitButton } from "@/components/SubmitButton";

export default function NewNoticePage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-1 flex-col gap-6 px-8 py-16">
      <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">새 공지 작성</h1>
      <form action={createNoticeAction} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="title" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            제목
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            className="rounded-md border border-black/[.08] px-3 py-2 text-sm outline-none focus:border-zinc-400 dark:border-white/[.145] dark:bg-transparent"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="author" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            작성자
          </label>
          <input
            id="author"
            name="author"
            type="text"
            required
            className="rounded-md border border-black/[.08] px-3 py-2 text-sm outline-none focus:border-zinc-400 dark:border-white/[.145] dark:bg-transparent"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="content" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            내용
          </label>
          <textarea
            id="content"
            name="content"
            rows={6}
            required
            className="resize-none rounded-md border border-black/[.08] px-3 py-2 text-sm outline-none focus:border-zinc-400 dark:border-white/[.145] dark:bg-transparent"
          />
        </div>
        <SubmitButton label="등록하기" />
      </form>
    </div>
  );
}