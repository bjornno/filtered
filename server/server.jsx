Meteor.publish("myData", function() {
  return MyData.find()
})

populate = function() {
  while (MyData.find().count() < 10) {
    MyData.insert({
      name: faker.name.findName(),
      image: faker.image.cats() + "?" + Random.hexString(24),
      details: faker.lorem.sentences()
    })
  }
}

Meteor.startup(function() {
  populate()
})

Meteor.methods({
  repopulate: function() {
    MyData.insert({
      name: faker.name.findName(),
      image: faker.image.cats() + "?" + Random.hexString(24),
      details: faker.lorem.sentences()
    })
  },
  reset: function() {
    MyData.remove({affirmative: true});
  }
})
