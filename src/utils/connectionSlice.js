// import { createSlice } from "@reduxjs/toolkit";

// const connectionSlice = createSlice({
//   name: "connection",
//   initialState: null,
//   reducers: {
//     addConnections: (state, action) => action.payload,
//     removeConnections: () => null,
//   },
// });

// export const { addConnections, removeConnections } = connectionSlice.actions;

// export default connectionSlice.reducer;




import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connection",
  initialState: {
    connections: null,      // ← previously this was the whole state
    onlineFriends: [],      // ← new field for SSE real-time online friend tracking
  },
  reducers: {
    addConnections: (state, action) => {
      state.connections = action.payload;
    },
    removeConnections: (state) => {
      state.connections = null;
    },

    // ✅ SSE-related reducers
    setOnlineFriends: (state, action) => {
      state.onlineFriends = action.payload;
    },
    addOnlineFriend: (state, action) => {
      const id = action.payload;
      if (!state.onlineFriends.includes(id)) {
        state.onlineFriends.push(id);
      }
    },
    removeOnlineFriend: (state, action) => {
      const id = action.payload;
      state.onlineFriends = state.onlineFriends.filter((uid) => uid !== id);
    },
  },
});

export const {
  addConnections,
  removeConnections,
  setOnlineFriends,
  addOnlineFriend,
  removeOnlineFriend,
} = connectionSlice.actions;

export default connectionSlice.reducer;

