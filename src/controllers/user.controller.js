import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";
import { challengeMission } from "../services/user.service.js";

export const handleUserSignUp = async (req, res, next) => {
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const user = await userSignUp(bodyToUser(req.body));
  res.status(StatusCodes.OK).json({ result: user });
};

export const handleChallengeMission = async (req, res) => {
  try {
    const { userId, missionId } = req.body;
    const memberMissionId = await challengeMission(userId, missionId);
    res.status(201).json({
      message: "미션 도전 시작!",
      member_mission_id: memberMissionId,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
