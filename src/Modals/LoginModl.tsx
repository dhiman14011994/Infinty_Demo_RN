export interface LoginModl {
  token: string;
  type: string;
  mealplan: string;
  workoutplan: string,
}

export interface UserInfo {
  id: number;
  name: string;
  email: string;
  email_verified_at: null;
  provider: null;
  provider_id: number;
  mobile: string;
  age: string;
  image: string;
  gender: number;
  height: string;
  weight: string;
  stripe_customer_id: string;
  created_at: string;
  updated_at: string;
  country_code: string;
  dob: string;
  meal_plan_id: string;
  workout_plan_id: string;
  plan_id: string;
  step_target: number;
  verified: any;
  carbs: string;
  fat: string;
  protien: string;
  total_calories: number;
}