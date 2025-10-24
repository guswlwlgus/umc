export const bodyToUser = (body) => {
  const birth = new Date(body.birth); //날짜 변환

  return {
    email: body.email, //필수 
    name: body.name, // 필수
    gender: body.gender, // 필수
    birth, // 필수
    address: body.address || "", //선택 
    detailAddress: body.detailAddress || "", //선택 
    phoneNumber: body.phoneNumber,//필수
    preferences: body.preferences,// 필수 
  };
};

export const responseFromUser = ({ user, preferences }) => {
  return {
    id: user._id || user.id,
    email: user.email,
    name: user.name,
    gender: user.gender,
    birth: user.birth ? new Date(user.birth).toISOString().split("T")[0] : null,
    address: user.address || "",
    detailAddress: user.detailAddress || "",
    phoneNumber: user.phoneNumber || "",
    preferences: preferences || user.preferences || [],
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
