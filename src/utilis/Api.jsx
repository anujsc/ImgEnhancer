import axios from "axios";

const API_KEY = "wxrmo3alnlldsdqjq";
console.log('API Key:', API_KEY);

const BASE_URL = "https://techhk.aoscdn.com/";
const MAX_RETRIES = 20;

// Main function to enhance image
export const enhancedImageAPI = async (file) => {
  try {
    const taskId = await upload(file);
    console.log("Uploaded. Task ID:", taskId);

    const result = await waitForResult(taskId);
    console.log("Enhanced Image Ready:", result);

    return result;
  } catch (error) {
    console.error("Error enhancing image:", error.message);
  }
};

// Upload image and get task ID
const upload = async (file) => {
  const formData = new FormData();
  formData.append("image_file", file);

  const { data } = await axios.post(`${BASE_URL}/api/tasks/visual/scale`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "X-API-KEY": API_KEY,
    },
  });

  if (!data?.data?.task_id) throw new Error("Upload failed, no Task ID.");
  return data.data.task_id;  //task id return krdi
};

// Keep checking if the enhanced image is ready
const waitForResult = async (taskId) => {
  let retries = 0;

  while (retries < MAX_RETRIES) {
    const result = await checkStatus(taskId);

    if (result.state !== 4) {
      // If not processing (i.e., it's done), return the result
      return result;
    }

    console.log(`Still processing... (${retries})`);

    // Wait for 2 seconds before checking again
    await new Promise((res) => setTimeout(res, 2000));

    retries++;
  }

  throw new Error("Too many retries.");
};


// Check current status of the task
const checkStatus = async (taskId) => {
  const { data } = await axios.get(`${BASE_URL}/api/tasks/visual/scale/${taskId}`, {
    headers: {
      "X-API-KEY": API_KEY,
    },
  });

  if (!data?.data) throw new Error("Failed to get result.");
  return data.data;
};
