const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      {
        path: "usertodos/:id",
        component: () => import("components/UserTodos.vue"),
        props: true
      },
      {
        path: "admintodos/naved",
        component: () => import("components/AdminTodos.vue")
      },
      {
        path: "registration",
        component: () => import("components/RegisterUser.vue")
      }
    ]
  },

  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
