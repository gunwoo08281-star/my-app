"use client";

import { useEffect } from "react";

export default function NewNoticeError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex max-w-2xl flex-1 flex-col items-start gap-4 px-8 py-16">
      <h1 className="text-2xl font-semibold">공지사항을 저장하지 못했습니다.</h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        잠시 후 다시 시도해주세요. 문제가 계속되면 데이터베이스 연결을 확인해주세요.
      </p>
      <button
        type="button"
        onClick={() => retry()}
        className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
      >
        다시 시도
      </button>
    </main>
  );
}
