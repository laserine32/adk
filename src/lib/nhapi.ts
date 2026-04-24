export const API_URL = `aHR0cHM6Ly9uaGVudGFpLm5ldA==`

export type CDNType = {
  image_servers: string[]
  thumb_servers: string[]
}

export interface NHMainPageType {
  result:    ResultNHMainPageType[];
  num_pages: number;
  per_page:  number;
  total:     number;
}

export interface ResultNHMainPageType {
  id:               number;
  media_id:         string;
  english_title:    string;
  japanese_title:   null | string;
  thumbnail:        string;
  thumbnail_width:  number;
  thumbnail_height: number;
  num_pages:        number;
  tag_ids:          number[];
  blacklisted:      boolean;
}

interface Cover {
  path:   string;
  width:  number;
  height: number;
}
interface Page {
  number:           number;
  path:             string;
  width:            number;
  height:           number;
  thumbnail:        string;
  thumbnail_width:  number;
  thumbnail_height: number;
}
export interface NHTag {
  id:    number;
  type:  string;
  name:  string;
  slug:  string;
  url:   string;
  count: number;
}
interface Title {
  english:  string;
  japanese: string;
  pretty:   string;
}
export interface GalleryType {
  id:            number;
  media_id:      string;
  title:         Title;
  cover:         Cover;
  thumbnail:     string | Cover;
  scanlator:     string;
  upload_date:   number;
  tags:          NHTag[] | [];
  num_pages:     number;
  num_favorites: number;
  pages:         Page[] | [];
}

export async function fetchData<T>(
  url: string,
  defaultValue: T
): Promise<T> {
  try {
    const response = await fetch(url, { 
      cache: 'force-cache',
      headers: {
        'User-Agent': 'ADK/2.0'
      }
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return defaultValue;
  }
}

export const getCDN = async () => {
  return await fetchData<CDNType>(
    `${atob(API_URL)}/api/v2/cdn`,
    JSON.parse(atob(`eyJpbWFnZV9zZXJ2ZXJzIjpbImh0dHBzOi8vaTEubmhlbnRhaS5uZXQiLCJodHRwczovL2kyLm5oZW50YWkubmV0IiwiaHR0cHM6Ly9pMy5uaGVudGFpLm5ldCIsImh0dHBzOi8vaTQubmhlbnRhaS5uZXQiXSwidGh1bWJfc2VydmVycyI6WyJodHRwczovL3QxLm5oZW50YWkubmV0IiwiaHR0cHM6Ly90Mi5uaGVudGFpLm5ldCIsImh0dHBzOi8vdDMubmhlbnRhaS5uZXQiLCJodHRwczovL3Q0Lm5oZW50YWkubmV0Il19`))
  )
} 

export const getMainPage = async (page: number) => {
  const query = atob(`JTJCbWlsZiUyMCUyQmZ1bGwlMjBjb2xvciUyMCUyQmVuZ2xpc2g=`)
  return await fetchData<NHMainPageType>(
    `${atob(API_URL)}/api/v2/search?query=${query}&sort=date&page=${page}`,
    {
      result: [],
      num_pages: 0,
      per_page: 0,
      total: 0
    }
  )
}

export const getGallery = async (id: number) => {
  return await fetchData<GalleryType>(
    `${atob(API_URL)}/api/v2/galleries/${id}`,
    {
      id:0,
      media_id:"",
      title: {
        english: "",
        japanese: "",
        pretty: ""
      },
      cover: {  
        path: "",
        width: 0,
        height: 0
      },
      thumbnail: "",
      scanlator: "",
      upload_date: 0,
      tags: [],
      num_pages: 0,
      num_favorites: 0,
      pages: []
    }
  )
}

export type NHGallery = Awaited<ReturnType<typeof getGallery>>