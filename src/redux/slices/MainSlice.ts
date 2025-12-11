import { createSlice } from "@reduxjs/toolkit";
import { Main } from "../../utils/types";
import { MainActions } from "../actions/MainActions";

const initialState: Main = {
  categoryData: [],
  AllCategoryData: [],
  ExcerciseCategories: [],
  Diets: {
    data: [],
    pagination: {
      total: null,
      current: null,
      first: null,
      last: null,
      previous: null,
      next: null,
      pages: null,
      from: null,
      to: null,
    },
  },
  Moods: {
    data: [],
    pagination: {
      total: null,
      current: null,
      first: null,
      last: null,
      previous: null,
      next: null,
      pages: null,
      from: null,
      to: null,
    },
  },
  Countries: [],
  States: [],
  Cities: [],
};

const MainSlice = createSlice({
  name: "Main",
  initialState,
  reducers: {
    emptyData: (state, action) => {
      state.categoryData = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(MainActions.GetCategoryData.fulfilled, (state, action) => {
      state.categoryData = action.payload;
    });
    builder.addCase(
      MainActions.FilterCategoryDataByTitle.fulfilled,
      (state, action) => {
        state.categoryData = action.payload;
      }
    );
    builder.addCase(
      MainActions.GetAllCategoryData.fulfilled,
      (state, action) => {
        state.AllCategoryData = action.payload;
      }
    );
    builder.addCase(
      MainActions.GetAllExcerciseCategory.fulfilled,
      (state, action) => {
        state.ExcerciseCategories = action.payload;
      }
    );
    builder.addCase(MainActions.GetDietService.fulfilled, (state, action) => {
      if (action.payload?.pagination?.current == 1)
        state.Diets = action.payload;
      else {
        state.Diets = {
          ...action.payload,
          data: [...state.Diets?.data, ...action.payload.data],
        };
      }
    });
    builder.addCase(MainActions.GetMoodService.fulfilled, (state, action) => {
      if (action.payload?.pagination?.current == 1)
        state.Moods = action.payload;
      else {
        state.Moods = {
          ...action.payload,
          data: [...state.Moods?.data, ...action.payload.data],
        };
      }
    });
    builder.addCase(MainActions.GetCountries.fulfilled, (state, action) => {
      state.Countries = action.payload;
    });
    builder.addCase(MainActions.GetStates.fulfilled, (state, action) => {
      state.States = action.payload;
    });
    builder.addCase(MainActions.GetCities.fulfilled, (state, action) => {
      state.Cities = action.payload;
    });
    builder.addCase(MainActions.GetCitiesByCountry.fulfilled, (state, action) => {
      state.Cities = action.payload;
    });
  },
});

export const { emptyData } = MainSlice.actions;
export default MainSlice.reducer;
