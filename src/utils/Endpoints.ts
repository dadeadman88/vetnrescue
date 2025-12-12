export const BASE_URL = "https://vetnrescue.com/api/";

export const endpoints = {
  Login: "user/login",
  Register: "user/register",
  Logout: "user/logout",
  SocialLogin: "social-login",
  ResetPassword: "user/resetpassword",
  ForgotPassword: "user/forgotpassword",
  VerifyCode: "verify-code",
  Category: (id: string) => "category/list?parent_id=" + id,
  FilterCategoryByTitle: (title: string) =>
    "category/list?filter_by_title=" + title,
  AllCategory:
    "category/list?parent_id=eyJpdiI6ImNDT0g3M0Rxd25zdGJcL0lPU1hiUHNnPT0iLCJ2YWx1ZSI6IkcydkpXZlwvam1Ed3NDSGdEeGV5OHJ3PT0iLCJtYWMiOiJjY2FjYTI0M2MwN2UyZjA3NjJjNmM4NmZjNzExN2RhYjhkYjc0ODUwNGE0NTQ1M2UyNmU4MTRlZTg0NTA3ZjNiIn0=",
  ExcerciseCategories: "work/list?is_parent=0",
  Bookings: (date) => "booking/list?filter_by_date=" + date,
  BookSlot: "booking/user/add",
  DietAdd: "food/user/add",
  GetDiet: "food/list",
  MoodAdd: "mood/user/add",
  GetMood: "mood/list",
  GetCountries: "v1/countries",
  GetStates: (countryCode: string) => `v1/states/${countryCode}`,
  GetCities: (stateCode: string) => `v1/cities/${stateCode}`,
  GetCitiesByCountry: (countryId: string | number) => `v1/cities-by-country/${countryId}`,
  GetVetClinics: (cityId?: string | null) => {
    let url = "v1/facilities?is_vet_clinic=1";
    if (cityId) {
      url += `&city_id=${encodeURIComponent(cityId)}`;
    }
    return url;
  },
  GetRescueShelters: (cityId?: string | null) => {
    let url = "v1/facilities?is_rescue_shelter=1";
    if (cityId) {
      url += `&city_id=${encodeURIComponent(cityId)}`;
    }
    return url;
  },
  GetAdvertisements: "v1/advertisements",
  AdvertisementClick: (id: string | number) => `v1/advertisements/${id}/click`,
  SearchFacilities: (keyword: string, cityId?: string | null) => {
    let url = `v1/facilities/search?keyword=${encodeURIComponent(keyword)}`;
    if (cityId) {
      url += `&city_id=${encodeURIComponent(cityId)}`;
    }
    return url;
  },
  SubmitContact: "v1/contact/submit",
};
