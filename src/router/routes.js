const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/front/HomePage.vue'),
        meta: {
          title: 'moOo',
          login: false,
          admin: false
        }
      },
      {
        path: 'films',
        component: () => import('pages/front/public/AllFilms.vue'),
        meta: {
          title: 'moOo | All Films',
          login: false,
          admin: false
        }
      },
      {
        path: 'films/:id',
        component: () => import('pages/front/public/FilmDetails.vue'),
        meta: {
          title: 'moOo | Film Details',
          login: false,
          admin: false
        }
      },
      {
        path: 'reviews',
        component: () => import('pages/front/public/AllReviews.vue'),
        meta: {
          title: 'moOo | All Reviews',
          login: false,
          admin: false
        }
      },
      {
        path: 'users',
        component: () => import('pages/front/public/TopUsers.vue'),
        meta: {
          title: 'moOo | Popular Users',
          login: false,
          admin: false
        }
      },
      {
        path: 'lists',
        component: () => import('pages/front/public/TopLists.vue'),
        meta: {
          title: 'moOo | Popular Lists',
          login: false,
          admin: false
        }
      },
      {
        path: 'profile',
        component: () => import('pages/front/user/UserProfile.vue'),
        meta: {
          title: 'moOo | Profile',
          login: true,
          admin: false
        }
      },
      {
        path: 'diary',
        component: () => import('pages/front/user/UserDiary.vue'),
        meta: {
          title: 'moOo | Diary',
          login: true,
          admin: false
        }
      },
      {
        path: 'watchlist',
        component: () => import('pages/front/user/UserWatchlist.vue'),
        meta: {
          title: 'moOo | Watchlist',
          login: true,
          admin: false
        }
      },
      {
        path: 'likes',
        component: () => import('pages/front/user/UserFavorites.vue'),
        meta: {
          title: 'moOo | Favorites',
          login: true,
          admin: false
        }
      },
      {
        path: 'settings',
        component: () => import('pages/front/user/UserSettings.vue'),
        meta: {
          title: 'moOo | Settings',
          login: true,
          admin: false
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
          title: 'moOo | Admin',
          login: true,
          admin: true
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
