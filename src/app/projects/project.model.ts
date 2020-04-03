export interface Project {
  name: string;
  description: string[];
  stack: string[];
  urls: { [key: string]: Urls };
  clip?: string;
  img: string;
}

interface Urls {
  app: string;
  github: string;
  postman?: string;
}
