const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/front/HomePage.vue'),
        meta: {
          title: 'moOo'
        }
      },
      {
        path: 'register',
        component: () => import('pages/front/UserRegister.vue'),
        meta: {
          title: 'moOo | Register'
        }
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/admin/HomePage.vue'),
        meta: {
          title: 'moOo | Admin'
        }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
