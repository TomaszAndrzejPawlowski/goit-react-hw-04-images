import axios from 'axios';

const apiKey = `39664886-734d85d446af9c48bd55da1f3`;
const baseUrl = `https://pixabay.com/api`;
const imgPerPage = 12;

export const getImages = async (query, page) => {
  let fetchLimit = page * imgPerPage;
  if (fetchLimit >= 500) {
    alert("You've reached the end of search results.");
    return;
  }
  const url = `${baseUrl}/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${imgPerPage}`;
  const resp = await axios.get(url);
  return resp.data.hits;

  //SYMULACJIA DŁUŻSZEGO LOADINGU

  // return new Promise(res => {
  //   setTimeout(async () => {
  //     const url = `${baseUrl}/?key=${apiKey}&q=${query}`;
  //     const resp = await axios.get(url);
  //     res(resp.data.hits);
  //   }, 2000);
  // });

  ///////////////////////////////
};
