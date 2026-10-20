import assert from 'node:assert/strict'
import test from 'node:test'
import { averageResolution, categoryData, stats, statusData } from '../src/lib/metrics.js'

const records = [
  { category:'Wi-Fi & Networking', status:'Pending' },
  { category:'Laboratory Equipment', status:'In Progress' },
  { category:'Wi-Fi & Networking', status:'Resolved' },
]
test('counts actual statuses without inventing records',()=>assert.deepEqual(stats(records),{total:3,pending:1,progress:1,resolved:1}))
test('returns zeroed statistics for an empty campus',()=>assert.deepEqual(stats([]),{total:0,pending:0,progress:0,resolved:0}))
test('groups category records and omits categories without data',()=>assert.deepEqual(categoryData(records),[{name:'Wi-Fi',count:2},{name:'Labs',count:1}]))
test('creates chart labels from the same records',()=>assert.deepEqual(statusData(records),[{name:'Pending',value:1},{name:'In progress',value:1},{name:'Resolved',value:1}]))
test('averages actual resolution timestamps',()=>assert.equal(averageResolution([{status:'Resolved',createdAt:new Date('2026-01-01T00:00:00Z'),resolvedAt:new Date('2026-01-02T03:00:00Z')},{status:'Resolved',createdAt:new Date('2026-01-01T00:00:00Z'),resolvedAt:new Date('2026-01-02T01:00:00Z')}]),'1d 2h'))
test('does not invent an average when no resolved timestamps exist',()=>assert.equal(averageResolution([]),'—'))
