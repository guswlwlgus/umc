import { pool } from "../db.config.js";

export const addReview = async (data) => {
  const conn = await pool.getConnection();
  try {
    // store 존재 여부 확인
    const [store] = await conn.query(
      "SELECT id FROM store WHERE id = ?",
      [data.store_id]
    );

    if (store.length === 0) {
      return { success: false, message: "해당 가게가 존재하지 않습니다." };
    }

    // 리뷰 추가
    const [result] = await conn.query(
      "INSERT INTO review (member_id, store_id, body, score, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(6), NOW(6))",
      [data.member_id, data.store_id, data.body, data.score]
    );

    return { success: true, reviewId: result.insertId };
  } catch (err) {
    throw new Error(`DB 오류: ${err}`);
  } finally {
    conn.release();
  }
};
