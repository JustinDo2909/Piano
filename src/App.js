// src/App.js
import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import LayOut from "./Pages/layout/Layout";
import Detail from "./Pages/detail";
import MusicTypeDetail from "./Pages/musicTypeDetail";
import ProtectedRoute from "../src/PrivateRouter/PrivateRouter";
import NotFound from "../src/PrivateRouter/NotFound";

const Home = lazy(() => import("./Pages/dashboard"));
const Users = lazy(() => import("./Pages/users"));
const Artist = lazy(() => import("./Pages/artist"));
const Profile = lazy(() => import("./Pages/profile"));
const TypeMusic = lazy(() => import("./Pages/typeofmusic"));
const Compose = lazy(() => import("./Pages/compose"));
const Sheet = lazy(()=> import("./Pages/sheet"))
const MyAlbum = lazy(() => import("./Pages/album"));
const Login = lazy(() => import("./Pages/login"));
const LoginAdmin = lazy(() => import("./Pages/login/admin"));

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
                  <ProtectedRoute element={Home} requiredRole={"Admin"}/>
                </Suspense>
              }
            />
            <Route
              path="Profile"
              element={
                <Suspense fallback={<Loading />}>
                  <ProtectedRoute element={Profile} />
                </Suspense>
              }
            />
            <Route
              path="Users"
              element={
                <Suspense fallback={<Loading />}>
                  <ProtectedRoute element={Users} />
                </Suspense>
              }
            />
            <Route
              path="Artist"
              element={
                <Suspense fallback={<Loading />}>
                  <ProtectedRoute element={Artist}requiredRole={"Admin"} />
                </Suspense>
              }
            />
            <Route
              path="Artist/:id"
              element={
                <Suspense fallback={<Loading />}>
                  <ProtectedRoute element={Detail} />
                </Suspense>
              }
            />
            <Route
              path="MyAlbum"
              element={
                <Suspense fallback={<Loading />}>
                  <ProtectedRoute element={MyAlbum} requiredRole={"Artist"} />
                </Suspense>
              }
            />
            <Route
              path="TypeOfMusic"
              element={
                <Suspense fallback={<Loading />}>
                  <ProtectedRoute element={TypeMusic}requiredRole={"Artist"} />
                </Suspense>
              }
            />
            <Route
              path="TypeOfMusic/:id"
              element={
                <Suspense fallback={<Loading />}>
                  <ProtectedRoute element={MusicTypeDetail} />
                </Suspense>
              }
            />
            <Route
              path="Compose"
              element={
                <Suspense fallback={<Loading />}>
                  <ProtectedRoute element={Compose} requiredRole={"Artist"}/>
                </Suspense>
              }
            />
          <Route
              path="Sheet"
              element={
                <Suspense fallback={<Loading />}>
                  <ProtectedRoute element={Sheet} requiredRole={"Artist"}/>
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
            path="/Login/Admin"
            element={
              <Suspense fallback={<Loading />}>
                <LoginAdmin />
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
