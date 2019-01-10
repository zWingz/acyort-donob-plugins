let id = 0
let number = 100
const labels = [{
  id: 'label-1',
  name: 'label-name-1',
}, {
  id: 'label-2',
  name: 'label-name-2',
}]
function mockIssues(date) {
  id += 1
  number += 1
  return {
    id,
    number,
    title: `issus-${id} title`,
    user: {
      avatar_url: 'avatar_url',
      html_url: 'html_url',
    },
    labels: [{ ...labels[0] }],
    created_at: `${date}T11:07:18Z`,
    updated_at: `${date}T08:25:34Z`,
    body: `## Header \r\n ### Issues${id} Content`,
  }
}
module.exports = [
  mockIssues('2018-11-20'),
  mockIssues('2018-10-19'),
  mockIssues('2017-10-19'),
  mockIssues('2016-10-19'),
]
