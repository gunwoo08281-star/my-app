import Link from "next/link";

export default function AboutPage() {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <h1> 이 페이지는 app/about/page.tsx입니다. </h1>
        <Link href="/">/ Home으로 이동하기 </Link>
      </div>
    );
    }