import { pool } from "../db.config.js";

export const addStore = async (data) => {
  const conn = await pool.getConnection();

  try {
    // region 존재 여부 확인
    const [region] = await conn.query(
      "SELECT * FROM region WHERE id = ?",
      [data.region_id]
    );

    if (region.length === 0) {
      return { success: false, message: "존재하지 않는 지역입니다." };
    }

    // store 추가
    const [result] = await conn.query(
      "INSERT INTO store (region_id, name, address, score) VALUES (?, ?, ?, ?)",
      [data.region_id, data.name, data.address, data.score]
    );

    return { success: true, storeId: result.insertId };
  } catch (err) {
    throw new Error(`DB 오류: ${err}`);
  } finally {
    conn.release();
  }
};
