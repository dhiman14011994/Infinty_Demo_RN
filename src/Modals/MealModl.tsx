export interface MealPlan {
  id: number;
  title: string;
  about: string;
  duration: number;
  duration_type: string;
  duration_description: string;
  price: number;
  enabled: number;
  image: string;
}

export interface MealPlanDetail {
  id: number;
  title: string;
  about: string;
  three_months_description: string;
  six_months_description: string;
  three_months_price: number;
  six_months_price: number;
  one_month_description: string;
  one_month_price: number;
  min_bmi: number;
  max_bmi: number;
  enabled: number;
  image: string;
  count: number;
}
//-------------------------------
//User Meal Plan Modl......
export interface WeeksData {
  title: string;
  image: string;
  sub_title: string;
  week_no: number;
}

export interface MainData {
  mtitle: string;
  current_week: number;
}

export interface UserMealPlan {
  weeksData: WeeksData[];
  mainData: MainData;
}
//-------------------------------
//User Week Day Meal Plan Modl......
export interface FooItem {
  id: number;
  title: string;
  total_calories: number;
  time: string;
  serving: string;
  carbs: number;
  fibre: number;
  protien: number;
  saturated_fat: number;
  sugar: number;
  unsaturated_fat: number;
}

export interface DaysData {
  day: string;
  fooItems: FooItem[];
}

export interface MainDataWeek {
  week: number;
  current_day: string;
}

export interface UserWeekDayMeal {
  daysData: DaysData[];
  mainData: MainDataWeek;
}
//-------------------------------------
//Foods Modl

export interface Food {
  total_calories: number;
  saturated_fat: number;
  carbs: number;
  protien: number;
  id: number;
  title: string;
  about: string;
  qty: number;
}

export interface FoodDtls {
  about: string;
  carbs: number;
  enabled: number;
  fibre: number;
  id: number;
  image: string;
  kcal: number;
  protien: number;
  saturated_fat: number;
  sugar: number;
  title: string;
  total_calories: number;
  unsaturated_fat: number;
  qty: number;
}
//-------------------------------------
//Foods Modl
export interface LoggedMeal {
  foods: LoggedFood[];
  title: string;
}

export interface LoggedFood {
  serving: string;
  schedule_time: number;
  id: number;
  title: string;
  about: string;
  total_calories: number;
  protien: number;
  carbs: number;
  saturated_fat: number;
}
//-------------------------------------
//Graph Meal Modl

export interface GraphData {
  date: string;
  total_calories: number;
  day: string;
}

export interface MealLogged {
  planGraphData: GraphData[];
  logGraphData: GraphData[];
  suggested_total_calories: number;
}
