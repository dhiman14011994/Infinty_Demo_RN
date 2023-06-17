export interface Story {
  id: number;
  title: string;
  description: string;
  enabled: number;
  pace?: any;
  equipment_req?: any;
  image: string;
  tags: string[];
}