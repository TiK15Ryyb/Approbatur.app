import { UserBarVisitedController } from "./controller/user-bar-visited.controller";

export const Routes = [
  {
    method: "get",
    route: "/visits",
    controller: UserBarVisitedController,
    action: "getAll",
  },
  {
    method: "get",
    route: "/user/:id",
    controller: UserBarVisitedController,
    action: "getByUserId",
  },
  {
    method: "post",
    route: "/user/:userId/bar/:barId",
    controller: UserBarVisitedController,
    action: "saveOne",
  },
];
