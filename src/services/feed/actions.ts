import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '../../utils/burger-api';

export const getFeed = createAsyncThunk('feed/getFeed', getFeedsApi);
