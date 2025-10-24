import { pool } from "../db.config.js";

export const addMission = async (data) => {
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

    // mission 추가
    const [result] = await conn.query(
      "INSERT INTO mission (store_id, reward, deadline, mission_spec, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(6), NOW(6))",
      [data.store_id, data.reward, data.deadline, data.mission_spec]
    );

    return { success: true, missionId: result.insertId };
  } catch (err) {
    throw new Error(`DB 오류: ${err}`);
  } finally {
    conn.release();
  }
};
