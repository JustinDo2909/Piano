import React, { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LayOut from "./Pages/layout/Layout";
import { LoadingOutlined } from "@ant-design/icons";
import Detail from "./Pages/detail";
import MusicTypeDetail from "./Pages/musicTypeDetail";

const Home = lazy(() => import("./Pages/dashboard"));
const Customer = lazy(() => import("./Pages/customer"));
const Artist = lazy(() => import("./Pages/artist"));
const Profile = lazy(() => import("./Pages/profile"));
const TypeMusic = lazy(() => import("./Pages/typeofmusic"));
const Compose = lazy(() => import("./Pages/compose"));
const MyAlbum = lazy(() => import("./Pages/album"));
const Login = lazy(() => import("./Pages/login"));

const Loading = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <LoadingOutlined />
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route element={<LayOut />}>
            <Route path="/" element={<Navigate to="/Home" replace />} />
            <Route
              path="Home"
              element={
                <Suspense fallback={<Loading />}>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="Profile"
              element={
                <Suspense fallback={<Loading />}>
                  <Profile />
                </Suspense>
              }
            />
            <Route
              path="Customers"
              element={
                <Suspense fallback={<Loading />}>
                  <Customer />
                </Suspense>
              }
            />
            <Route
              path="Artist"
              element={
                <Suspense fallback={<Loading />}>
                  <Artist />
                </Suspense>
              }
            />
            <Route
              path="Artist/:id"
              element={
                <Suspense fallback={<Loading />}>
                  <Detail />
                </Suspense>
              }
            />
            <Route
              path="MyAlbum"
              element={
                <Suspense fallback={<Loading />}>
                  <MyAlbum />
                </Suspense>
              }
            />
            {/* <Route
              path="myalbum/:id"
              element={
                <Suspense fallback={<Loading />}>
                  <Detail />
                </Suspense>
              }
            /> */}
            <Route
              path="TypeOfMusic"
              element={
                <Suspense fallback={<Loading />}>
                  <TypeMusic />
                </Suspense>
              }
            />
            <Route
              path="TypeOfMusic/:id"
              element={
                <Suspense fallback={<Loading />}>
                  <MusicTypeDetail />
                </Suspense>
              }
            />
            <Route
              path="Compose"
              element={
                <Suspense fallback={<Loading />}>
                  <Compose />
                </Suspense>
              }
            />
          </Route>
          <Route
            path="/Login"
            element={
              <Suspense fallback={<Loading />}>
                <Login />
              </Suspense>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
