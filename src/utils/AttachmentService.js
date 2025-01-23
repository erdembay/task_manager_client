import { nodeApiAxiosTaff } from "./appAxios";
import { tokenFunc } from "./tokenService";
export const deleteService = async (id) => {
  try {
    const { data, status, statusText } = await nodeApiAxiosTaff.delete(
      `/attachments/${id}`,
      {
        headers: {
          Authorization: await tokenFunc(),
        },
      }
    );
    if (!data)
      return {
        status: false,
        statusCode: status,
        message: statusText,
        data: null,
      };
    return { status: true, statusCode: status, message: statusText, data };
  } catch (error) {
    return {
      status: false,
      statusCode: error?.response?.status || 500,
      message: error?.response?.data?.error?.message || error?.message,
      data: null,
    };
  }
};
