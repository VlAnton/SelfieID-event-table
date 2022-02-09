<template>
  <v-container fluid class="page-container pt-10 px-10">
    <h2 class="mb-10">Список событий</h2>
    <v-row justify="space-between" dense>
      <v-col cols="5">
        <v-text-field
          v-model="searchStr"
          class="search"
          label="Поиск по записям"
          prepend-inner-icon="mdi-magnify"
          dense
          solo
          @input="e => searchStr = e"
        ></v-text-field>
      </v-col>

      <v-col cols="4">
        <v-btn color="primary">
          <download-csv
            :data="eventsData"
          >
            Выгрузить данные
          </download-csv>
        </v-btn>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="4">
        <FilterDatePicker @setDateValue="setDateValue" />
      </v-col>

      <v-col cols="5">
        <v-select
          v-model="selectedTypes"
          class="ml-4"
          :items="eventTypes"
          placeholder="Выберите названия событий"
          multiple
          outlined
          dense
        >
        </v-select>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="eventsData"
      :loading="$fetchState.pending"
      :items-per-page="itemsPerPage"
      :sort-by.sync="currentSort"
      :sort-desc.sync="currentSortOrder"
      hide-default-footer
    >
      <template v-slot:top="">
        <v-row dense>
          <v-col cols="1" class="mr-4">
            <v-select
              v-model="itemsPerPage"
              :items="itemsPerPageOptions"
              dense
            >
            </v-select>
          </v-col>

          <v-col class="nav-buttons" cols="3">
            <v-btn
              @click="currentPage -= 1"
              :disabled="currentPage === 1"
              fab
              small
            >
              <v-icon>
                mdi-arrow-left
              </v-icon>
            </v-btn>

            <div
              class="ma-0 mx-4"
              style="user-select: none"
            >
              {{ currentPage }}
            </div>

            <v-btn
              @click="currentPage += 1"
              :disabled="itemsPerPage > eventsData.length"
              fab
              small
            >
              <v-icon>
                mdi-arrow-right
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      eventTypes: [],
      headers: [
        { text: 'Имя', value: 'name' },
        { text: 'Логин', value: 'login' },
        { text: 'Время', value: 'time' },
        { text: 'Тип события', value: 'eventType' },
        { text: 'Температура', value: 'temperature' },
      ],
      itemsPerPageOptions: [10, 25, 50, 100],

      eventsData: [],

      currentSortOrder: [],
      currentSort: [],

      itemsPerPage: 10,
      currentPage: 1,
      searchStr: '',
      selectedDates: [],
      selectedTypes: [],
    }
  },

  watch: {
    currentPage (newVal) {
      this.fetchEventsData()
    },

    selectedDates (newVal) {
      this.fetchEventsData()
      this.currentPage = 1
    },
    selectedTypes (newVal) {
      this.fetchEventsData()
      this.currentPage = 1
    },
    searchStr (newVal) {
      this.fetchEventsData()
      this.currentPage = 1
    },

    currentSortOrder (newVal) {
      this.fetchEventsData()
    }
  },

  async fetch () {
    this.fetchEventsData()
  },

  methods: {
    setDateValue (val) {
      this.selectedDates = val
    },

    async fetchEventsData () {
      const {
        itemsPerPage, currentPage,
        selectedDates, selectedTypes, searchStr,
        currentSortOrder, currentSort
      } = this
      const { eventsData, eventTypes } = await this.$axios.$get(`http://localhost:3001/events`, {
        params: {
          itemsPerPage,
          currentPage,
          filters: {
            selectedDates,
            selectedTypes,
            searchStr
          },
          sortData: {
            currentSort: currentSort[0],
            currentSortOrder: currentSortOrder[0]
          }
        }
      })
      this.eventsData = eventsData
      this.eventTypes = eventTypes
    }
  }
}
</script>

<style scoped>
.page-container {
  width: 100vw;
}

.nav-buttons {
  display: flex;
  align-items: center;
  height: 40px;
}

td {
  user-select: none;
}
</style>
