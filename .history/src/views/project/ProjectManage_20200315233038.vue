<template>
  <nly-container fluid>
    <nly-row>
      <nly-col>
        <nly-card header-variant="navy" header-outline id="cardmaximzed">
          <nly-card-header>
            项目管理
            <nly-card-tool>
              <nly-button
                tool
                v-nly-card-maximized.cardmaximzed="{
                  afterIcon: 'fas fa-compress',
                  beforeIcon: 'fas fa-expand',
                  order: 1
                }"
              >
                <nly-icon icon="fas fa-expand" />
              </nly-button>
            </nly-card-tool>
          </nly-card-header>
          <nly-card-body>
            <nly-table> </nly-table>
          </nly-card-body>
        </nly-card>
      </nly-col>
    </nly-row>
  </nly-container>
</template>
