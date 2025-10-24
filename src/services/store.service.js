import * as storeRepository from "../repositories/store.repository.js";

export const createStore = async (data) => {
  if (!data.region_id || !data.name || !data.address || data.score === undefined) {
    throw new Error("필수 필드 누락");
  }

  const result = await storeRepository.addStore(data);

  if (!result.success) {
    throw new Error(result.message);
  }

  return result.storeId;
};
