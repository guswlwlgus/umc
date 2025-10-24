import * as missionRepository from "../repositories/mission.repository.js";

export const createMission = async (data) => {
  // 필수 필드 체크
  if (!data.store_id || data.reward === undefined || !data.deadline || !data.mission_spec) {
    throw new Error("필수 필드 누락");
  }

  const result = await missionRepository.addMission(data);

  if (!result.success) {
    throw new Error(result.message);
  }

  return result.missionId;
};
