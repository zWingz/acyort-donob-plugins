// 即时通讯服务

function LeanApi() {
  var { Query, Object } = AV
  this.Object = Object
  this.Query = Query
  this.AV = AV
}

LeanApi.prototype.init = function(app_id, app_key) {
  AV.init(app_id, app_key)
}

LeanApi.prototype.get = function(id) {
  const query = new this.Query('Counter')
  return query
    .equalTo('node_id', id)
    .find()
    .then(e => e[0])
}

LeanApi.prototype.create = function(id, title) {
  const Counter = this.Object.extend('Counter')
  const counter = new Counter()
  counter.set('node_id', id)
  counter.set('title', title)
  counter.set('count', 1)
  return counter.save()
}

LeanApi.prototype.update = function(id, title) {
  var counter = AV.Object.createWithoutData('Counter', id)
  counter.increment('count', 1)
  counter.set('title', title)
  counter.fetchWhenSave(true)
  return counter.save()
}

LeanApi.prototype.addCount = function(id, title) {
  return this.get(id).then(r => {
    if (r) {
      return this.update(r.id, title)
    } else {
      return this.create(id, title)
    }
  })
}

const _lean = new LeanApi()
