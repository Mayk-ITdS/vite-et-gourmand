export type ClientOpinion = {
  _id: { $id: string };
  order_id: string;
  pseudo: string;
  avatar: string;
  content: string;
  score: number;
  createdAt: { $date: string };
};

export type Opinions = {
  opinions: ClientOpinion[];
};
