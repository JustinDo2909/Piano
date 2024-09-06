// src/App.js
import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import LayOut from "./Pages/layout/Layout";
import Detail from "./Pages/detail";
import MusicTypeDetail from "./Pages/musicTypeDetail";
import PrivateRouter from "../src/PrivateRouter/PrivateRouter";
import NotFound from "../src/PrivateRouter/NotFound";

const Home = lazy(() => import("./Pages/dashboard"));
const Users = lazy(() => import("./Pages/users"));
const Artist = lazy(() => import("./Pages/artist"));
const Profile = lazy(() => import("./Pages/profile"));
const TypeMusic = lazy(() => import("./Pages/typeofmusic"));
const Compose = lazy(() => import("./Pages/compose"));
const Sheet = lazy(()=> import("./Pages/sheet"))
const SheetArtist = lazy(() => import("./Pages/sheetArtist"))
const MyAlbum = lazy(() => import("./Pages/album"));
const Instruments = lazy(() => import("./Pages/instrument"));
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
                  <PrivateRouter element={Home} />
                </Suspense>
              }
            />
            <Route
              path="Profile"
              element={
                <Suspense fallback={<Loading />}>
                  <PrivateRouter element={Profile} />
                </Suspense>
              }
            />
            <Route
              path="Users"
              element={
                <Suspense fallback={<Loading />}>
                  <PrivateRouter element={Users} />
                </Suspense>
              }
            />
            <Route
              path="Artist"
              element={
                <Suspense fallback={<Loading />}>
                  <PrivateRouter element={Artist} />
                </Suspense>
              }
            />
            <Route
              path="MyAlbum"
              element={
                <Suspense fallback={<Loading />}>
                  <PrivateRouter element={MyAlbum} />
                </Suspense>
              }
            />
            <Route
              path="TypeOfMusic"
              element={
                <Suspense fallback={<Loading />}>
                  <PrivateRouter element={TypeMusic} />
                </Suspense>
              }
            />
            <Route
              path="TypeOfMusic/:id"
              element={
                <Suspense fallback={<Loading />}>
                  <PrivateRouter element={MusicTypeDetail} />
                </Suspense>
              }
            />
            <Route
              path="instrument"
              element={
                <Suspense fallback={<Loading />}>
                  <PrivateRouter element={Instruments} />
                </Suspense>
              }
            />
            <Route
              path="Compose"
              element={
                <Suspense fallback={<Loading />}>
                  <PrivateRouter element={Compose} />
                </Suspense>
              }
            />
          <Route
              path="Sheet"
              element={
                <Suspense fallback={<Loading />}>
                  <PrivateRouter element={Sheet} requiredRole={"Artist"}/>
                </Suspense>
              }
            />
          <Route
              path="SheetArtist"
              element={
                <Suspense fallback={<Loading />}>
                  <PrivateRouter element={SheetArtist} requiredRole={"Artist"}/>
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

          <Route
            path="/404"
            element={
              <Suspense fallback={<Loading />}>
                <NotFound />
              </Suspense>
            }
          />

          {/* <Route path="*" element={<Navigate to="/404" replace />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
