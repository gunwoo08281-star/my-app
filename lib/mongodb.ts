import mongoose from 'mongoose'

// MongoDB Atlas 클러스터 접속 문자열은 코드에 직접 적지 않고
// 환경변수(.env.local)로만 관리합니다 — 이것 자체가 이번 학기
// 계속 강조할 "시크릿 관리" 보안 습관의 첫걸음입니다.
const MONGODB_URI = process.env.MONGODB_URI

type MongooseCache = {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

// Next.js 개발 서버는 파일을 저장할 때마다 모듈을 다시 불러옵니다.
// 그때마다 매번 새로 mongoose.connect()를 호출하면 연결이 계속 쌓이는
// 문제가 생기므로, globalThis에 연결(정확히는 연결 Promise)을 캐시해
// 서버 프로세스가 완전히 재시작되기 전까지는 기존 연결을 재사용합니다.
declare global {
  var mongooseCache: MongooseCache | undefined
}

const cached: MongooseCache = global.mongooseCache ?? {
  conn: null,
  promise: null,
}
global.mongooseCache = cached

export async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error(
      'MONGODB_URI 환경변수가 없습니다. .env.local.example을 참고해 .env.local을 만들어주세요.',
    )
  }

  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI)
  }

  try {
    cached.conn = await cached.promise
  } catch (err) {
    // 연결에 실패했는데 실패한 Promise를 그대로 캐시해두면, 클러스터가
    // 다시 살아나도 서버를 재시작하기 전까지 영원히 같은 에러만 반복됩니다.
    // 실패 시에는 캐시를 비워서 다음 요청이 새로 연결을 시도하게 합니다.
    cached.promise = null
    throw err
  }

  return cached.conn
}