import { createBrowserRouter, type RouteObject } from "react-router";
import { AuthRoutes } from "../features/auth/auth.routes";
import { CourseRoutes } from "../features/courses/course.routes";
import { InstructorRoutes } from "../features/instructor/instructor.routes";
import Home from "../components/Layouts/Home";
import Dashboard from "../features/courses/components/Dashboard";
import Notfoundpage from "../components/Layouts/Notfound";


const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
    
    children: [
      {
        path: "/dashboard",
        element: <Dashboard/>, 
      }, 
      {
        path: "*",
        element: <Notfoundpage/>, 
      }, 
      {
        path: "/users/*",
        element: <AuthRoutes/>, 
      }, 
      {
        path: "/courses/*",
        element: <CourseRoutes />
      },
      {
        path: "/instructor/*",
        element: <InstructorRoutes />
      }
    ],
  },
];

export const router = createBrowserRouter(routes);
