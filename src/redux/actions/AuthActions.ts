import {
  ReducerCreators,
  UnknownAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { setLoading } from '../slices/OtherSlice';
import client from '../../utils/AxiosInterceptor';
import { endpoints } from '../../utils/Endpoints';
import { convertDataToFormData } from '../../utils/Constants';
import { Auth, States } from '../../utils/types';
import DeviceInfo from 'react-native-device-info';

export const AuthActions = {
  Login: createAsyncThunk('auth/login', async (data, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    let apiCall = await client.post(endpoints.Login, data);
    return apiCall.data?.response?.data;
  }),
  SocialLogin: createAsyncThunk('auth/SocialLogin', async (data, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    let formData = convertDataToFormData(data);
    let apiCall = await client.post(endpoints.SocialLogin, formData);
    return apiCall.data?.response?.data;
  }),
  Register: createAsyncThunk('auth/register', async (data, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    let apiCall = await client.post(endpoints.Register, data);
    return apiCall.data?.response?.data;
  }),
  Logout: createAsyncThunk('auth/login', async (data, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    let formData = new FormData();
    formData.append('udid', DeviceInfo.getDeviceId());
    let apiCall = await client.post(endpoints.Logout, formData);
    return apiCall.data?.response?.data;
  }),
  ForgotPass: createAsyncThunk(
    'auth/ForgotPass',
    async (data: { email: string }, thunkApi) => {
      thunkApi.dispatch(setLoading(true));
      let apiCall = await client.post(endpoints.ForgotPassword, data);
      return apiCall.data?.response?.data;
    },
  ),
  ChangeNotification: createAsyncThunk(
    'auth/ChangeNotification',
    async (data, thunkApi) => {
      let apiCall = await client.post(endpoints.NotificationSetting);
      return apiCall.data?.response?.data;
    },
  ),
  ChangePrivacy: createAsyncThunk(
    'auth/ChangePrivacy',
    async (data, thunkApi) => {
      let apiCall = await client.post(endpoints.PrivacySetting);
      return apiCall.data?.response?.data;
    },
  ),
  ChangePass: createAsyncThunk(
    'auth/ChangePass',
    async (data: { new_password: string; old_password: string }, thunkApi) => {
      thunkApi.dispatch(setLoading(true));
      let apiCall = await client.post(endpoints.ResetPassword, data);
      return apiCall.data?.response?.data;
    },
  ),
  EditProfile: createAsyncThunk(
    'auth/EditProfile',
    async (data: Auth['user'], thunkApi) => {
      thunkApi.dispatch(setLoading(true));
      let formData = convertDataToFormData(data);
      let apiCall = await client.post(endpoints.UpdateProfile, formData);
      return apiCall.data?.response?.data;
    },
  ),
  Vote: createAsyncThunk(
    'auth/Vote',
    async (
      data: { post_id: string; poll_option: number; type: string },
      thunkApi,
    ) => {
      let formData = convertDataToFormData(data);
      let apiCall = await client.post(endpoints.Vote, formData);
      return apiCall.data?.response?.data;
    },
  ),
  ContactUs: createAsyncThunk(
    'auth/ContactUs',
    async (data: any, thunkApi) => {
      thunkApi.dispatch(setLoading(true));
      let formData = convertDataToFormData(data);
      let apiCall = await client.post(endpoints.ContactUs, formData);
      return apiCall.data?.response?.data;
    },
  ),
  Notifications: createAsyncThunk(
    'auth/Notifications',
    async (data: { page: string | number }, thunkApi) => {
      let apiCall = await client.get(
        endpoints.Notifications + '?page=' + data.page,
      );
      return apiCall.data?.response?.data;
    },
  ),
  DeleteNotifi: createAsyncThunk(
    'auth/DeleteNotifi',
    async (data: { id: string }, thunkApi) => {
      let apiCall = await client.delete(
        endpoints.Notifications + '/' + data.id,
      );
      return apiCall.data?.response?.data;
    },
  ),
  getMyExperience: createAsyncThunk(
    'auth/getMyExperience',
    async (data: { page: string | number }, thunkApi) => {
      let apiCall = await client.get(
        endpoints.Experiences + '?page=' + data.page,
      );
      return apiCall.data?.response?.data;
    },
  ),
  getMyPosts: createAsyncThunk(
    'auth/getMyPosts',
    async (data: { page: number | string }, thunkApi) => {
      let apiCall = await client.get(
        endpoints.MyPost + '?type=post' + '&page=' + data.page,
      );
      return apiCall.data?.response?.data;
    },
  ),
  getMyPolls: createAsyncThunk(
    'auth/getMyPolls',
    async (data: { page: number | string }, thunkApi) => {
      let apiCall = await client.get(
        endpoints.MyPost + '?type=poll' + '&page=' + data.page,
      );
      return apiCall.data?.response?.data;
    },
  ),
  getContent: createAsyncThunk(
    'auth/getContent',
    async (data: { type: string }, thunkApi) => {
      thunkApi.dispatch(setLoading(true));
      let apiCall = await client.get(
        endpoints.GetContent + '?type=' + data.type,
      );
      return apiCall.data?.response?.data[0];
    },
  ),
  getCards: createAsyncThunk('auth/getCards', async (data, thunkApi) => {
    let apiCall = await client.get(endpoints.Cards);
    return apiCall.data?.response?.data?.cards;
  }),
  SaveCard: createAsyncThunk(
    'auth/SaveCard',
    async (data: { stripe_token: string }, thunkApi) => {
      thunkApi.dispatch(setLoading(true));
      let formData = convertDataToFormData(data);
      let apiCall = await client.post(endpoints.AddCard, formData);
      thunkApi.dispatch(AuthActions.getCards());
      return apiCall.data?.response?.data?.cards;
    },
  ),
  ChangeDefaultCard: createAsyncThunk(
    'auth/ChangeDefaultCard',
    async (data: { stripe_source_id: string }, thunkApi) => {
      let formData = convertDataToFormData(data);
      let apiCall = await client.post(endpoints.MakeDefaultCard, formData);
      thunkApi.dispatch(AuthActions.getCards());
      return apiCall.data?.response?.data?.cards;
    },
  ),
};
