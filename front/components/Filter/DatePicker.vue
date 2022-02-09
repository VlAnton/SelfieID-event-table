<template>
  <div>
    <div
      class="datepicker-input"
      @click="open"
    >
      <v-icon class="mr-2">mdi-calendar</v-icon>
      <div class="datepicker-placeholder">
        <template v-if="!newVal.length">
          Выберите дату
        </template>
        <template v-else>
          {{ newVal.join(', ') }}
        </template>
      </div>
    </div>
    <div
      v-if="opened"
      class="datepicker-container"
    >
      <v-date-picker
        v-model="newVal"
        v-click-outside="closeAndSave"
        class="pb-2"
        range
      >
        <v-btn
          class="ml-4 mr-2"
          @click="closeAndSave"
        >
          Ок
        </v-btn>
        <v-btn @click="close">
          Отмена
        </v-btn>
      </v-date-picker>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      opened: false,
      newVal: [],
    }
  },

  methods: {
    open () {
      this.opened = true
    },

    close () {
      this.newVal = []
      this.opened = false
    },

    closeAndSave () {
      this.opened = false
      this.$emit('setDateValue', this.newVal)
    }
  },
}
</script>

<style scoped>
.datepicker-input {
  display: flex;
  align-items: center;

  border: 1px solid #969696;
  border-radius: 4px;
  width: 100%;
  height: 40px;
  padding: 8px 12px;

  user-select: none;
  cursor: pointer;
}

.datepicker-placeholder {
  display: inline-block;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  color: #666666;
}

.datepicker-container {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;

  background: rgba(29, 32, 35, .4);

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
}
</style>
