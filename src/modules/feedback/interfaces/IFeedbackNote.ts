export interface IFeedbackNote {
  id: string;
  content: string;
  createdAt: Date;
  author: {
    id: string;
    name: string;
  };
}
