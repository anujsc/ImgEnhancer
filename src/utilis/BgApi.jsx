import axios from "axios";

const API_KEY =import.meta.env.VITE_API_KEY;
const BASE_URL = "https://techhk.aoscdn.com/";
const MAX_RETRIES = 20;

export const BgApi = async (file) => {
  try {
    const taskId = await upload(file);
    const result = await waitForResult(taskId);
    return result;
  } catch (error) {
    console.error("Error removing background:", error.message);
  }
};

const upload = async (file) => {
  const formData = new FormData();
  formData.append("image_file", file);

  const { data } = await axios.post(`${BASE_URL}/api/tasks/visual/segmentation`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "X-API-KEY": API_KEY,
    },
  });

  if (!data?.data?.task_id) throw new Error("Upload failed.");
  return data.data.task_id;
};

const waitForResult = async (taskId) => {
  let retries = 0;
  while (retries < MAX_RETRIES) {
    const result = await checkStatus(taskId);
    if (result.state !== 4) return result;
    await new Promise((res) => setTimeout(res, 2000));
    retries++;
  }
  throw new Error("Too many retries.");
};

const checkStatus = async (taskId) => {
  const { data } = await axios.get(`${BASE_URL}/api/tasks/visual/segmentation/${taskId}`, {
    headers: { "X-API-KEY": API_KEY },
  });
  if (!data?.data) throw new Error("Failed to get result.");
  return data.data;
};

export default BgApi