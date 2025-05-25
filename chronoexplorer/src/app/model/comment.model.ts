export interface Comment {
    id:number;
    event_id: number;
    content: string;
    user_id: number;
    isApproved: boolean;
    User: {
        id: number;
        username: string;
        email: string;
      };
  }