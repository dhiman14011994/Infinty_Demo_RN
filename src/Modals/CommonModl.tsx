export interface Answer {
  id: number;
  title: string;
  resource_url: string;
  isSelected: boolean;
}

export interface TransactionModl {
  id: number;
  plan_id: number;
  title: string;
  created_at: string;
  order_id: string;
  plan_type: string;
  transaction_amount: number;
  transaction_currency: string;
  transaction_identifier: string;
}

export interface TransactionDtlsModl {
  id: number;
  plan_id: number;
  title: string;
  start_date: string;
  end_date: string;
  duration: number;
  created_at: string;
  order_id: string;
  plan_type: string;
  transaction_amount: number;
  transaction_currency: string;
  transaction_identifier: string;
}

export interface MCQModl {
  title: string;
  id: number;
  answers: Answer[];
}

export interface McqQuestion {
  title: string;
  id: number;
  answers: Answer[];
  ChildQuestion: MCQModl[];
}

export interface QuestionsModl {
  questions: MCQModl[];
  mcqQuestion: McqQuestion[];
}
