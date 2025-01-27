

import { Router } from "express";
import { BicycleRoutes } from "../model/bicycles/bicycle.route";



const router = Router();

const moduleRoutes = [
    {
        path: '/bicycle',
        route: BicycleRoutes,
    },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;