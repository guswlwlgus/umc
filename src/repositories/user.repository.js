import { pool } from "../db.config.js";

// User 데이터 삽입
export const addUser = async (data) => {
  const conn = await pool.getConnection();

  try {
    const [confirm] = await pool.query(
      `SELECT EXISTS(SELECT 1 FROM user WHERE email = ?) as isExistEmail;`,
      data.email
    );

    if (confirm[0].isExistEmail) {
      return null;
    }

    const [result] = await pool.query(
      `INSERT INTO user (email, name, gender, birth, address, detail_address, phone_number) VALUES (?, ?, ?, ?, ?, ?, ?);`,
      [
        data.email,
        data.name,
        data.gender,
        data.birth,
        data.address,
        data.detailAddress,
        data.phoneNumber,
      ]
    );

    return result.insertId;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

// 사용자 정보 얻기
export const getUser = async (userId) => {
  const conn = await pool.getConnection();

  try {
    const [user] = await pool.query(`SELECT * FROM user WHERE id = ?;`, userId);

    console.log(user);

    if (user.length == 0) {
      return null;
    }

    return user;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

// 음식 선호 카테고리 매핑
export const setPreference = async (userId, foodCategoryId) => {
  const conn = await pool.getConnection();

  try {
    await pool.query(
      `INSERT INTO user_favor_category (food_category_id, user_id) VALUES (?, ?);`,
      [foodCategoryId, userId]
    );

    return;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (userId) => {
  const conn = await pool.getConnection();

  try {
    const [preferences] = await pool.query(
      "SELECT ufc.id, ufc.food_category_id, ufc.user_id, fcl.name " +
        "FROM user_favor_category ufc JOIN food_category fcl on ufc.food_category_id = fcl.id " +
        "WHERE ufc.user_id = ? ORDER BY ufc.food_category_id ASC;",
      userId
    );

    return preferences;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

// member_mission 테이블 사용
export const addMissionToUser = async (userId, missionId) => {
  const conn = await pool.getConnection();
  try {
    // 이미 도전 중인지 확인
    const [exist] = await conn.query(
      `SELECT COUNT(*) as count FROM member_mission WHERE member_id = ? AND mission_id = ?;`,
      [userId, missionId]
    );

    if (exist[0].count > 0) {
      return { success: false, message: "이미 도전 중인 미션입니다." };
    }

    // 도전 추가
    const [result] = await conn.query(
      `INSERT INTO member_mission (member_id, mission_id, status, created_at, updated_at)
       VALUES (?, ?, 'IN_PROGRESS', NOW(6), NOW(6));`,
      [userId, missionId]
    );

    return { success: true, memberMissionId: result.insertId };
  } catch (err) {
    throw new Error(`DB 오류: ${err}`);
  } finally {
    conn.release();
  }
};

