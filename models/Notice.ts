import { Schema, model, models } from "mongoose";

// Mongoose 스키마 — MongoDB는 원래 스키마가 없는(schemaless) DB지만,
// 애플리케이션 코드에서는 이렇게 스키마를 정의해두는 것이 실수를 줄이고
// 타입 안전성을 얻는 실무 표준입니다.
const noticeSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    content: { type: String, required: true },
  },
  { timestamps: true } // createdAt / updatedAt 필드를 자동으로 추가
);

// Next.js 개발 모드의 hot-reload로 이 파일이 여러 번 로드되면
// model("Notice", ...)을 중복 정의하려다 에러가 납니다.
// models.Notice가 이미 있으면 그것을 재사용합니다.
export const Notice = models.Notice || model("Notice", noticeSchema);