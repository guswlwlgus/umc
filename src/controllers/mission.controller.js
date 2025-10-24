import * as missionService from "../services/mission.service.js";

export const addMission = async (req, res) => {
  try {
    const missionId = await missionService.createMission(req.body);
    res.status(201).json({
      message: "미션 등록 완료",
      mission_id: missionId,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
