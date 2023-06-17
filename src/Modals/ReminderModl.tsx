export interface Reminder {
  id: number;
  start_time: string;
  end_time: string;
  water_qty: string;
  time_interval: number;
  uid: number;
}

export interface Notification {
  description: string;
  id: number;
  read: number;
  title: string;
  uid: number;
}