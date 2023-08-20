<template>
  <q-layout view="hHh lpR fFf">

    <q-header bordered class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <router-link to="/">
            <img style="height: 6vh;"
              src="https://cdn.discordapp.com/attachments/1109403221245571167/1140443471002488943/5a3fc2d4e5a78829.png">
          </router-link>
          Admin
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>
