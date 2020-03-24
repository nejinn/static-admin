<template>
  <nly-sidebar-container :hover="sidebar.hover" :variant="sidebar.variant">
    <nly-sidebar-brand to="collapse" :variant="sidebar.brand.variant">
      <nly-sidebar-brandimg :src="logo" elevation circle />
      <nly-sidebar-brandtext>NLY Adminlte Vue</nly-sidebar-brandtext>
    </nly-sidebar-brand>

    <nly-sidebar>
      <nly-sidebar-userpanel class="mt-3 pb-3 mb-3 d-flex">
        <nly-sidebar-userpanel-img :src="logo" class="SSS" />
        <nly-sidebar-userpanel-info to="collapse">
          Nejinn lerity
        </nly-sidebar-userpanel-info>
      </nly-sidebar-userpanel>
      <nly-sidebar-nav
        class="mt-2"
        :flat="sidebar.sidebarShape.flat"
        :pill="sidebar.sidebarShape.pill"
        :compact="sidebar.sidebarShape.compact"
        :legacy="sidebar.sidebarShape.legacy"
        :child-indent="sidebar.sidebarShape.childIndent"
        sidebar-nav-class="zzz"
      >
        <nly-sidebar-nav-header>
          Dashboard
        </nly-sidebar-nav-header>
        <nly-sidebar-nav-item
          to="/"
          link-class="xxx zzz"
          class="sss"
          icon="nav-icon fas nlyfont nly-icon-color-palette"
          exact
        >
          home
          <nly-badge bg-variant="teal" badge-class="right">
            NEW
          </nly-badge>
        </nly-sidebar-nav-item>

        <nly-sidebar-nav-tree
          target="components-one"
          visible
          icon="nav-icon fas nlyfont nly-icon-logo-polymer"
        >
          <template slot="link">
            components-one
          </template>
          <nly-sidebar-nav-item
            to="/collapse"
            link-class="xxx zzz"
            class="sss"
            icon="nav-icon far nlyfont nly-icon-logo-chrome"
            exact
          >
            collapse
          </nly-sidebar-nav-item>
        </nly-sidebar-nav-tree>

        <nly-sidebar-nav-tree
          target="components-two"
          visible
          icon="nav-icon fas nlyfont nly-icon-logo-polymer"
        >
          <template slot="link">
            components-two
          </template>
          <nly-sidebar-nav-item
            to="/link"
            link-class="xxx zzz"
            class="sss"
            icon="nav-icon far nlyfont nly-icon-router-link"
            exact
          >
            link
          </nly-sidebar-nav-item>

          <nly-sidebar-nav-item
            to="/button"
            link-class="xxx zzz"
            class="sss"
            icon="nav-icon far nlyfont nly-icon-logo-ionic"
            exact
          >
            button
          </nly-sidebar-nav-item>

          <nly-sidebar-nav-item
            to="/switch"
            link-class="xxx zzz"
            class="sss"
            icon="nav-icon far nlyfont nly-icon-switch"
            exact
          >
            switch
          </nly-sidebar-nav-item>

          <nly-sidebar-nav-item
            to="/card"
            link-class="xxx zzz"
            class="sss"
            icon="nav-icon far nlyfont nly-icon-filing"
            exact
          >
            card
          </nly-sidebar-nav-item>

          <nly-sidebar-nav-item
            to="/badge"
            link-class="xxx zzz"
            class="sss"
            icon="nav-icon far nlyfont nly-icon-badge-small"
            exact
          >
            badge
          </nly-sidebar-nav-item>
        </nly-sidebar-nav-tree>

        <nly-sidebar-nav-tree
          target="components-three"
          visible
          icon="nav-icon fas nlyfont nly-icon-logo-polymer"
        >
          <template slot="link">
            components-three
          </template>
          <nly-sidebar-nav-item
            to="/toast"
            link-class="xxx zzz"
            class="sss"
            icon="nav-icon far nlyfont nly-icon-toaster"
            exact
          >
            toast
          </nly-sidebar-nav-item>

          <nly-sidebar-nav-item
            to="/spinner"
            link-class="xxx zzz"
            class="sss"
            icon="nav-icon far nlyfont nly-icon-logo-pinterest"
            exact
          >
            spinner
          </nly-sidebar-nav-item>

          <nly-sidebar-nav-item
            to="/progress"
            link-class="xxx zzz"
            class="sss"
            icon="nav-icon far nlyfont nly-icon-cog"
            exact
          >
            progress
          </nly-sidebar-nav-item>

          <nly-sidebar-nav-item
            to="/timeline"
            link-class="xxx zzz"
            class="sss"
            icon="nav-icon far nlyfont nly-icon-logo-ionitron"
            exact
          >
            timeline
          </nly-sidebar-nav-item>

          <nly-sidebar-nav-item
            to="/breadcrumb"
            link-class="xxx zzz"
            class="sss"
            icon="nav-icon far nlyfont nly-icon-breadcrumb-fill"
            exact
          >
            breadcrumb
            <nly-badge bg-variant="fuchsia" badge-class="right" size="sm">
              NEW
            </nly-badge>
          </nly-sidebar-nav-item>
        </nly-sidebar-nav-tree>
      </nly-sidebar-nav>
    </nly-sidebar>
  </nly-sidebar-container>
</template>
