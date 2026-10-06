import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { connectDB } from "./mongodb";
import { Notice as NoticeModel } from "@/models/Notice";

export type Notice = {
  id: string;
  title: string;
  author: string;
  content: string;
  createdAt: string;
};

type NoticeDocLike = {
  _id: unknown;
  title: string;
  author: string;
  content: string;
  createdAt?: Date;
};

const localNoticesPath = path.join(process.cwd(), ".data", "notices.json");

const initialNotices: Notice[] = [
  {
    id: "seed-course-opening",
    title: "웹서버보안프로그래밍 개강 안내",
    author: "곽건우",
    content: "2학기 웹서버보안프로그래밍 수업이 시작됩니다. 강의계획서를 확인해주세요.",
    createdAt: new Date().toISOString().slice(0, 10),
  },
  {
    id: "seed-github-invite",
    title: "GitHub Organization 초대 안내",
    author: "곽건우",
    content: "과제 제출용 GitHub Organization 초대 메일을 확인하고 가입해주세요.",
    createdAt: new Date().toISOString().slice(0, 10),
  },
  {
    id: "seed-mongodb-lab",
    title: "6주차 실습 — MongoDB 연동",
    author: "곽건우",
    content: "이번 주부터 공지사항 게시판이 실제 데이터베이스에 저장됩니다.",
    createdAt: new Date().toISOString().slice(0, 10),
  },
];

async function readLocalNotices(): Promise<Notice[]> {
  try {
    return JSON.parse(await readFile(localNoticesPath, "utf8")) as Notice[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    return initialNotices;
  }
}

async function writeLocalNotices(notices: Notice[]) {
  await mkdir(path.dirname(localNoticesPath), { recursive: true });
  await writeFile(localNoticesPath, JSON.stringify(notices, null, 2), "utf8");
}

function useLocalNoticeStore() {
  console.warn("MongoDB 연결에 실패해 공지사항을 .data/notices.json에 저장합니다.");
}

function toNotice(doc: NoticeDocLike): Notice {
  return {
    id: String(doc._id),
    title: doc.title,
    author: doc.author,
    content: doc.content,
    createdAt: (doc.createdAt ?? new Date()).toISOString().slice(0, 10),
  };
}

async function seedIfEmpty() {
  const count = await NoticeModel.countDocuments();
  if (count > 0) return;

  await NoticeModel.insertMany([
    {
      title: "웹서버보안프로그래밍 개강 안내",
      author: "곽건우",
      content: "2학기 웹서버보안프로그래밍 수업이 시작됩니다. 강의계획서를 확인해주세요.",
    },
    {
      title: "GitHub Organization 초대 안내",
      author: "곽건우",
      content: "과제 제출용 GitHub Organization 초대 메일을 확인하고 가입해주세요.",
    },
    {
      title: "6주차 실습 — MongoDB 연동",
      author: "곽건우",
      content: "이번 주부터 공지사항 게시판이 실제 데이터베이스에 저장됩니다.",
    },
  ]);
}

export async function getNotices(): Promise<Notice[]> {
  try {
    await connectDB();
    await seedIfEmpty();
    const docs = await NoticeModel.find().sort({ createdAt: -1 }).lean();
    return docs.map((doc) => toNotice(doc as NoticeDocLike));
  } catch (error) {
    useLocalNoticeStore();
    return readLocalNotices();
  }
}

export async function getNotice(id: string): Promise<Notice | undefined> {
  try {
    await connectDB();
    const doc = await NoticeModel.findById(id).lean();
    return doc ? toNotice(doc as NoticeDocLike) : undefined;
  } catch {
    useLocalNoticeStore();
    return (await readLocalNotices()).find((notice) => notice.id === id);
  }
}

export async function createNotice(input: {
  title: string;
  author: string;
  content: string;
}): Promise<Notice> {
  try {
    await connectDB();
    const doc = await NoticeModel.create(input);
    return toNotice(doc);
  } catch {
    useLocalNoticeStore();
    const notices = await readLocalNotices();
    const notice: Notice = {
      id: randomUUID(),
      ...input,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    await writeLocalNotices([notice, ...notices]);
    return notice;
  }
}
