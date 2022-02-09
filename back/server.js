import express from 'express'
import cors from 'cors'

import { eventsData } from './data.js'
import { sort, filterBySearch, filterByDate, filterByType, getEventTypes } from './handlers.js'

const PORT = process.env.PORT || 3001

const app = express()

app.use(cors())

app.get('/events', (req, res) => {
  const { query: { itemsPerPage, currentPage, filters, sortData } } = req

  const { searchStr, selectedDates, selectedTypes } = JSON.parse(filters)
  let result = sort(eventsData.slice(), JSON.parse(sortData))
  result = filterBySearch(result, searchStr)
  result = filterByDate(result, selectedDates)
  result = filterByType(result, selectedTypes)

  const eventTypes = getEventTypes(eventsData)

  const start = itemsPerPage * (currentPage - 1)
  const end = itemsPerPage * currentPage
  return res.send({
    eventTypes,
    eventsData: result.slice(start, end)
  })
})

app.listen(PORT, () => {
  console.log(`Running app on port ${PORT}`)
})