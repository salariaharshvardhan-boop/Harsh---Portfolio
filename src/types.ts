export interface ServiceItem {
  id: string;
  number: string;
  name: string;
  description: string;
}

export interface ProjectItem {
  id: string;
  number: string;
  name: string;
  category: string;
  type: string;
  liveUrl?: string;
  col1Image1: string;
  col1Image2: string;
  col2Image: string;
}
