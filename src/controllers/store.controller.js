import * as storeService from "../services/store.service.js";

export const addStore = async (req, res) => {
  try {
    const storeId = await storeService.createStore(req.body);
    res.status(201).json({
      message: "가게가 성공적으로 추가되었습니다.",
      store_id: storeId,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
