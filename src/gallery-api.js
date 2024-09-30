import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com";

const ACCESS_KEY = "ImJThSqnxr1elE2y2xLuuhzuZHLu7cyCFzidm5P-rpg";

export default async function fetchGalleryWithInput(input, page = 1) {
  const response = await axios.get(`/search/photos`, {
    params: { page, query: input },
    headers: {
      Authorization: `Client-ID ${ACCESS_KEY}`,
    },
  });

  const { results, total_pages } = response.data;
  return {
    hits: results,
    totalPages: total_pages,
  };
}
