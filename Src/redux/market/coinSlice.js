import {createSlice,createSelector } from '@reduxjs/toolkit';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {getData} from '../../../constants/hooks/ApiHelper';

let lastRequestTime = null;

export const fetchCoinData = createAsyncThunk('fetchCoin', async () => {
  try {
    const currentTime = new Date();
    const elapsed = lastRequestTime ? currentTime - lastRequestTime : 0;

    if (elapsed < 5000) {
      await new Promise(resolve => setTimeout(resolve, 5000 - elapsed));
    }
    const response = await getData(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=true&price_change_percentage=7d&locale=en',
    );
    lastRequestTime = new Date();
    return response;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
});

export const coinSlice = createSlice({
  name: 'coin',
  initialState: {
    data: null,
    isLoader: false,
    isError: false,
    isTradeModalVisible: false,
  },
  reducers: {
    setIsTradeModalVisible: (state, action) => {
      state.isTradeModalVisible = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchCoinData.pending, (state, action) => {
      state.isLoader = true;
    });
    builder.addCase(fetchCoinData.fulfilled, (state, action) => {
      state.isLoader = false;
      state.data = action.payload;
    });
    builder.addCase(fetchCoinData.rejected, (state, action) => {
      state.isLoader = false;
      state.isError = true;
    });
  },
});



export const { setIsTradeModalVisible } = coinSlice.actions;
export default coinSlice.reducer;
export const selectIsTradeModalVisible = state => state.coin.isTradeModalVisible;

// Selector
// export const selectIsTradeModalVisible = createSelector(
//   state => state.coin.isTradeModalVisible,
//   isTradeModalVisible => isTradeModalVisible
// );

// function mapStateToProps(state){
//   return {
//     isTradeModalVisible:state.tabReducer.isTradeModalVisible
//   }
// }

// function mapDispatchToProps(dispatch){
//   return {
//     setIsTradeModalVisible:(isVisible)=>{return dispatch(setIsTradeModalVisible(isVisible))}
//   }
// }