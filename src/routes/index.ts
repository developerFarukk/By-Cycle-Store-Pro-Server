

import { Router } from "express";
import { BicycleRoutes } from "../model/bicycles/bicycle.route";
import { UserRoutes } from "../model/users/user.router";



const router = Router();

const moduleRoutes = [
    {
        path: '/bicycle',
        route: BicycleRoutes,
    },
    {
        path: '/users',
        route: UserRoutes,
    },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;