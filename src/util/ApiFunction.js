import axios from "axios";

export const api = axios.create({
  baseURL: "https://pianoai.somee.com",
  withCredentials: true,
});

export async function getSong() {
  try {
    const result = await api.get(`/api/Songs`);
    return result.data;
  } catch (error) {
    throw new Error(`Error fetching Songs : ${error.message}`);
  }
}
