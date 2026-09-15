import { Counter } from "@/components/Counter";
import Link from 'next/link';

export default function Home() {
  return (
  <main>
    <h1>웹서버보안프로그래밍 - 곽건우</h1>
    <Counter />

    <br />
    <Link href="/about"> /about 페이지로 이동하기 </Link>
    </main>
  );
}
