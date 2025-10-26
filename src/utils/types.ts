import { ToastProps } from "react-native-ui-lib";

export interface Others {
  loading: boolean;
  toast: ToastProps | null;
  language: 'en' | 'ar';
}

export interface ListingApis {
  // response: {
  //     code: string,
  //   data: {
  current_page: number;
  data: Array<any>;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<any>;
  next_page_url: null | string;
  path: string;
  per_page: number;
  prev_page_url: null | string;
  to: number;
  total: number;
  //   },
  //     messages: Array<string>
  // }
}

export interface Main {
  Diets: {
    data: Array<any>;
    pagination: {
      total: number | null;
      current: number | null;
      first: number | null;
      last: number | null;
      previous: number | null;
      next: number | null;
      pages: number | null;
      from: number | null; 
      to: number | null;
    };
  };
}

export interface OtherUser {
  id: string;
  user_type: string | null;
  first_name: string | null;
  last_name: string | null;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  gender: string | null;
  account: string | null;
  social_id: string | null;
  provider: string | null;
  profile_picture: string | null;
  token: string | null;
  token_type: string | null;
  status: number | null;
  experiences: Array<ExperienceRecord>;
  body_count: number;
  posts: Array<any>;
  polls: Array<any>;
  total_poll_votes: number;
}

export interface Auth {
  user: {
    id: string;
    user_type: string | null;
    first_name: string | null;
    last_name: string | null;
    full_name: string | null;
    email: string | null;
    mobile_number: string | null;
    gender: string | null;
    account: string | null;
    social_id: string | null;
    provider: string | null;
    profile_picture: string | null;
    token: string | null;
    token_type: string | null;
    status: number | null;
  } | null;
  isLoggedIn: boolean;
  token: string;
  content: {
    id: string;
    type: string;
    value: string;
  } | null;
  cards: Array<any> | null;
  notifications: ListingApis | null;
}

export interface ExperienceRecord {
  id: string;
  user_id: string;
  title: string;
  experience: string;
  rating: string;
  privacy: string;
  status: number;
  experience_date: string;
}

export interface States {
  Others: Others;
  Auth: Auth;
  Main: Main;
}

export interface PollOptions {
  text: string;
  emoji: string;
}

export interface PollApiOptions {
  option_text: string;
  option_emoji: string;
  option_votes: number;
  option_percentage: number;
}
