import { BrowserRouter, Routes, Route } from "react-router";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import { appStore } from "./utils/appStore";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import SignUp from "./components/SignUp";

function App() {
  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Body />}>

            <Route path="/" element={<Feed/>} />
      
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Requests />} />



          </Route>


        </Routes>
      </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;