import { createSlice } from '@reduxjs/toolkit';
import { AuthActions } from '../actions/AuthActions';
import { Auth } from '../../utils/types';

const initialState: Auth = {
  user: null,
  isLoggedIn: false,
  token: '',
  content: null,
  cards: [],
  notifications: null,
};

const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    UpdateReducer: (state, action) => {
      state.user = action.payload;
    },
    LoginUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.token = action.payload.access_token;
    },
    deleteNotification: (state, action) => {
      let data = [...state.notifications?.data];
      data.splice(action.payload, 1);
      state.notifications = {
        ...state.notifications,
        data,
      };
    },
    LogoutUser: (state, action) => {
      state.user = null;
      state.isLoggedIn = false;
      state.token = '';
      state.content = null;
      state.cards = [];
      state.notifications = null;
    },
    makeDefaultCard: (state, action) => {
      let cards = [...state.cards];
      let card = cards.findIndex(v => v.default_card == 1);
      cards[card].default_card = 0;
      cards[action.payload].default_card = 1;
      state.cards = cards;
    },
  },
  extraReducers: builder => {
    builder.addCase(AuthActions.Login.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.token = action.payload.access_token;
    });

    builder.addCase(AuthActions.SocialLogin.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.token = action.payload.access_token;
    });

    builder.addCase(AuthActions.Register.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.token = action.payload.access_token;
    });

    builder.addCase(AuthActions.EditProfile.fulfilled, (state, action) => {
      state.user = action.payload;
    });

    builder.addCase(AuthActions.Notifications.fulfilled, (state, action) => {
      if (action.payload.current_page == 1) {
        state.notifications = action.payload;
      } else {
        state.notifications = {
          ...action.payload,
          data: [...state.notifications?.data, ...action.payload.data],
        };
      }
    });

    builder.addCase(AuthActions.getContent.fulfilled, (state, action) => {
      state.content = action.payload;
    });

    builder.addCase(AuthActions.ChangePrivacy.fulfilled, (state, action) => {
      state.user = {
        ...state.user,
        account: action.payload.account,
      };
    });

    builder.addCase(AuthActions.getCards.fulfilled, (state, action) => {
      state.cards = action.payload;
    });
  },
});

export const {
  UpdateReducer,
  LoginUser,
  LogoutUser,
  deleteNotification,
  makeDefaultCard,
} = AuthSlice.actions;
export default AuthSlice.reducer;
