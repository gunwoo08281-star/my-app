export type Notice = {
  id: string;
  title: string;
  author: string;
  content: string;
  createdAt: string;
};

const notices: Notice[] = [
  {
    id: "1",
    title: "웹서버보안프로그래밍 개강 안내",
    author: "곽건우",
    content: "2학기 웹서버보안프로그래밍 수업이 시작됩니다. 강의계획서를 확인해주세요.",
    createdAt: "2026-09-01",
  },
  {
    id: "2",
    title: "GitHub Organization 초대 안내",
    author: "곽건우",
    content: "과제 제출용 GitHub Organization 초대 메일을 확인하고 가입해주세요.",
    createdAt: "2026-09-03",
  },
  {
    id: "3",
    title: "5주차 실습 — 공지사항 게시판",
    author: "곽건우",
    content: "이번 주부터 만드는 공지사항 게시판이 학기 내내 성장하는 코스 프로젝트입니다.",
    createdAt: "2026-09-24",
  },
];

let nextId = 4;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getNotices(): Promise<Notice[]> {
  await delay(600);
  return [...notices].sort((a, b) => (a.id < b.id ? 1 : -1));
}

export async function getNotice(id: string): Promise<Notice | undefined> {
  await delay(400);
  return notices.find((n) => n.id === id);
}

export async function createNotice(input: {
  title: string;
  author: string;
  content: string;
}): Promise<Notice> {
  await delay(300);
  const notice: Notice = {
    id: String(nextId++),
    title: input.title,
    author: input.author,
    content: input.content,
    createdAt: new Date().toISOString().slice(0, 10),
  };
  notices.push(notice);
  return notice;
}