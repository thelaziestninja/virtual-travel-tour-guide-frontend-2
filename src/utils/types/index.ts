type ObjectId = string;

export interface Destination {
  _id: ObjectId;
  name: string;
  description: string;
  image_url?: string;
  country: string;
  best_time_to_visit: string;
}


export interface Feedback {
  _id: ObjectId;
  destination_id: string;  
  feedback_text: string;
  left_by: string;
  feedback_date: Date;
}