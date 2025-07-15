import { createBrowserRouter, type RouteObject } from "react-router";
import { AuthRoutes } from "../features/auth/auth.routes";
import {CourseRoutes} from "../features/courses/course.routes";
import Home from "../components/Layouts/Home";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/users/*",
        element: <AuthRoutes/>, 
      }, 
      {
        path: "/dashboard/*",
        element: <CourseRoutes />
      }
    ],
  },
];

export const router = createBrowserRouter(routes);
