export interface Blogs {
  id: number;
  title: string;
  sub_title: string;
  tag_line: string;
  description: string;
  tags: string[];
  enabled: number;
  pace?: any;
  equipment_req?: any;
  image: string;
  video_url: string;
}