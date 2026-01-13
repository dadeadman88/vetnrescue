import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../utils/AxiosInterceptor";
import { convertDataToFormData } from "../../utils/Constants";
import { endpoints } from "../../utils/Endpoints";
import { setLoading } from "../slices/OtherSlice";
import { AuthActions } from "./AuthActions";

export const MainActions = {
  GetCategoryData: createAsyncThunk(
    "main/category",
    async ({ id }: { id: string }, thunkApi) => {
      let apiCall = await client.get(endpoints.Category(id));
      return apiCall.data?.response?.data;
    }
  ),
  FilterCategoryDataByTitle: createAsyncThunk(
    "main/category_filter_title",
    async ({ title }: { title: string }, thunkApi) => {
      let apiCall = await client.get(endpoints.FilterCategoryByTitle(title));
      return apiCall.data?.response?.data[0];
    }
  ),
  GetAllCategoryData: createAsyncThunk(
    "main/all_category",
    async (data, thunkApi) => {
      let apiCall = await client.get(endpoints.AllCategory);
      return apiCall.data?.response?.data;
    }
  ),
  GetAllExcerciseCategory: createAsyncThunk(
    "main/GetAllExcerciseCategory",
    async (data, thunkApi) => {
      let apiCall = await client.get(endpoints.ExcerciseCategories);
      return apiCall.data?.response?.data;
    }
  ),
  GetAllExcercises: createAsyncThunk(
    "main/GetAllExcercises",
    async (data, thunkApi) => {
      let apiCall = await client.get(endpoints.ExcerciseCategories);
      return apiCall.data?.response?.data;
    }
  ),
  GetAllAvailableDates: createAsyncThunk(
    "main/GetAllAvailableDates",
    async (data, thunkApi) => {
      let apiCall = await client.get(endpoints.Bookings(data?.date));
      return apiCall.data?.response?.data;
    }
  ),
  BookSlot: createAsyncThunk("main/BookSlot", async (data, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    try {
      let apiCall = await client.post(endpoints.BookSlot, {
        booking_id: data?.booking_id,
      });
      return apiCall.data?.response?.data;
    } finally {
      thunkApi.dispatch(setLoading(false));
    }
  }),
  GetDietService: createAsyncThunk(
    "main/GetDietService",
    async (data, thunkApi) => {
      let apiCall = await client.get(endpoints.GetDiet);
      return apiCall.data?.response;
    }
  ),
  AddDietService: createAsyncThunk(
    "main/AddDietService",
    async (data, thunkApi) => {
      thunkApi.dispatch(setLoading(true));
      try {
        let apiCall = await client.post(endpoints.DietAdd, data);
        return apiCall.data?.response?.data;
      } finally {
        thunkApi.dispatch(setLoading(false));
      }
    }
  ),
  GetMoodService: createAsyncThunk(
    "main/GetMoodService",
    async (data, thunkApi) => {
      let apiCall = await client.get(endpoints.GetMood);
      return apiCall.data?.response;
    }
  ),
  AddMoodService: createAsyncThunk(
    "main/AddMoodService",
    async (data, thunkApi) => {
      thunkApi.dispatch(setLoading(true));
      try {
        let apiCall = await client.post(endpoints.MoodAdd, data);
        return apiCall.data?.response?.data;
      } finally {
        thunkApi.dispatch(setLoading(false));
      }
    }
  ),
  GetCountries: createAsyncThunk(
    "main/GetCountries",
    async (data, thunkApi) => {
      thunkApi.dispatch(setLoading(true));
      try {
        let apiCall = await client.get(endpoints.GetCountries);
        return apiCall.data?.response?.data || apiCall.data?.data || apiCall.data;
      } finally {
        thunkApi.dispatch(setLoading(false));
      }
    }
  ),
  GetStates: createAsyncThunk(
    "main/GetStates",
    async ({ countryCode }: { countryCode: string }, thunkApi) => {
      thunkApi.dispatch(setLoading(true));
      try {
        let apiCall = await client.get(endpoints.GetStates(countryCode));
        thunkApi.dispatch(setLoading(false));
        // Check if API returned an error response
        if (apiCall.data?.success === false) {
          return { error: true, message: apiCall.data?.message || "No states found for this country" };
        }
        return apiCall.data?.response?.data || apiCall.data?.data || apiCall.data;
      } catch (error: any) {
        thunkApi.dispatch(setLoading(false));
        // Handle error response
        if (error?.response?.data?.success === false) {
          return { error: true, message: error.response.data?.message || "No states found for this country" };
        }
        throw error;
      }
    }
  ),
  GetCities: createAsyncThunk(
    "main/GetCities",
    async ({ stateCode }: { stateCode: string }, thunkApi) => {
      thunkApi.dispatch(setLoading(true));
      try {
        let apiCall = await client.get(endpoints.GetCities(stateCode));
        thunkApi.dispatch(setLoading(false));
        // Check if API returned an error response
        if (apiCall.data?.success === false) {
          return { error: true, message: apiCall.data?.message || "No cities found for this state" };
        }
        return apiCall.data?.response?.data || apiCall.data?.data || apiCall.data;
      } catch (error: any) {
        thunkApi.dispatch(setLoading(false));
        // Handle error response
        if (error?.response?.data?.success === false) {
          return { error: true, message: error.response.data?.message || "No cities found for this state" };
        }
        throw error;
      }
    }
  ),
  GetCitiesByCountry: createAsyncThunk(
    "main/GetCitiesByCountry",
    async ({ countryId }: { countryId: string | number }, thunkApi) => {
      thunkApi.dispatch(setLoading(true));
      try {
        let apiCall = await client.get(endpoints.GetCitiesByCountry(countryId));
        thunkApi.dispatch(setLoading(false));
        // Check if API returned an error response
        if (apiCall.data?.success === false) {
          return { error: true, message: apiCall.data?.message || "No cities found for this country" };
        }
        return apiCall.data?.response?.data || apiCall.data?.data || apiCall.data;
      } catch (error: any) {
        thunkApi.dispatch(setLoading(false));
        // Handle error response
        if (error?.response?.data?.success === false) {
          return { error: true, message: error.response.data?.message || "No cities found for this country" };
        }
        throw error;
      }
    }
  ),
  GetVetClinics: createAsyncThunk(
    "main/GetVetClinics",
    async ({ cityId, countryId }: { cityId?: string | null; countryId?: string | number | null } = {}, thunkApi) => {
      thunkApi.dispatch(setLoading(true));
      try {
        let apiCall = await client.get(endpoints.GetVetClinics(cityId, countryId));
        thunkApi.dispatch(setLoading(false));
        // Try different response structures
        return apiCall.data?.response?.data || apiCall.data?.response || apiCall.data?.data || apiCall.data;
      } catch (error: any) {
        thunkApi.dispatch(setLoading(false));
        throw error;
      }
    }
  ),
  SubmitContact: createAsyncThunk(
    "main/SubmitContact",
    async (data: {
      full_name: string;
      phone_number: string;
      message: string;
      email: string;
      country_id?: number | null;
      state_id?: number | null;
      city_id?: number | null;
    }, thunkApi) => {
      thunkApi.dispatch(setLoading(true));
      try {
        let apiCall = await client.post(endpoints.SubmitContact, data);
        thunkApi.dispatch(setLoading(false));
        return apiCall.data?.response?.data || apiCall.data?.data || apiCall.data;
      } catch (error: any) {
        thunkApi.dispatch(setLoading(false));
        throw error;
      }
    }
  ),
};
