export const BASE_URL = "https://vetnrescue.com/api/";

export const endpoints = {
  GetVetClinics: (cityId?: string | null, countryId?: string | number | null) => {
    let url = "v1/facilities?is_vet_clinic=1";
    const country_id = countryId || "1"; // Default to 1 if no country is selected
    url += `&country_id=${encodeURIComponent(country_id)}`;
    if (cityId) {
      url += `&city_id=${encodeURIComponent(cityId)}`;
    }
    return url;
  },
  GetRescueShelters: (cityId?: string | null, countryId?: string | number | null) => {
    let url = "v1/facilities?is_rescue_shelter=1";
    const country_id = countryId || "1"; // Default to 1 if no country is selected
    url += `&country_id=${encodeURIComponent(country_id)}`;
    if (cityId) {
      url += `&city_id=${encodeURIComponent(cityId)}`;
    }
    return url;
  },
  GetAdvertisements: (countryId?: string | number | null) => {
    let url = "v1/advertisements";
    if (countryId) {
      url += `?country_id=${encodeURIComponent(countryId)}`;
    }
    return url;
  },
  AdvertisementClick: (id: string | number) => `v1/advertisements/${id}/click`,
  SearchFacilities: (keyword: string, cityId?: string | null, countryId?: string | number | null) => {
    let url = `v1/facilities/search?keyword=${encodeURIComponent(keyword)}`;
    const country_id = countryId || "1"; // Default to 1 if no country is selected
    url += `&country_id=${encodeURIComponent(country_id)}`;
    if (cityId) {
      url += `&city_id=${encodeURIComponent(cityId)}`;
    }
    return url;
  },
};
