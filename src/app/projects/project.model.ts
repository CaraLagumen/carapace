export interface Project {
  name: string;
  description: string[];
  stack?: string[];
  urls: { [key: string]: Urls };
}

interface Urls {
  app: string;
  github: string;
}
