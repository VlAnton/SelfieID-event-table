export function sort (eventsData, { currentSort, currentSortOrder }) {
  if (!currentSort) {
    return eventsData
  }

  const compare = (a, b) => {
    if (a[currentSort] < b[currentSort]) {
      if (currentSortOrder) {
        return 1
      }
      return -1
    }
    if (a[currentSort] > b[currentSort]) {
      if (currentSortOrder) {
        return -1
      }
      return 1
    }
    return 0
  }

  return eventsData.sort(compare)
}

export function getEventTypes (eventsData) {
  const result = []
  eventsData.forEach(({ eventType }) => {
    if (!result.includes(eventType)) {
      result.push(eventType)
    }
  })
  return result
}

export function filterBySearch (eventsData, searchStr) {
  if (!searchStr) {
    return eventsData.slice()
  }
  return eventsData.filter(
    ({ name, login }) =>
      name.toLowerCase().includes(searchStr.toLowerCase()) ||
      login.toLowerCase().includes(searchStr.toLowerCase())
  )
}

export function filterByDate (eventsData, selectedDates) {
  if (!selectedDates || !selectedDates.length) {
    return eventsData.slice()
  }
  const [startDate, endDate] = selectedDates
  return eventsData.filter(({ time }) => {
    return time >= new Date(startDate) && time <= new Date(endDate)
  })
}

export function filterByType (eventsData, selectedTypes) {
  if (!selectedTypes || !selectedTypes.length) {
    return eventsData.slice()
  }
  return eventsData.filter(e => selectedTypes && selectedTypes.length && selectedTypes.includes(e.eventType))
}
