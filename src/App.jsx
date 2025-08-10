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
import Chat from "./components/Chat";
import { BASE_URL } from "./utils/constants";
import LandingPage from "./components/LandingPage";
import PublicRoute from "./components/PublicRoute";

function App() {

  
 

  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
            {/* Landing Page (Main Route) */}
          <Route path="/" element={<LandingPage/>} />

            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp/>} />
           </Route>

        

          {/* Protected Layout for Logged-In Users */}
          <Route path="/app" element={<Body />}>
            <Route index element={<Feed />} />
            <Route path="profile" element={<Profile />} />
            <Route path="connections" element={<Connections />} />
            <Route path="requests" element={<Requests />} />
            <Route path="chat/:targetUserId" element={<Chat />} />
          </Route>


        </Routes>
      </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;