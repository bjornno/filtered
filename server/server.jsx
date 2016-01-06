Meteor.publish("myData", function() {
  return MyData.find()
})

ServiceConfiguration.configurations.remove({
    service: 'facebook'
});
 
ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '218269575036918',
    secret: '4d49348dfebbf6724d911e9e0ecd5ef4'
});

populate = function() {
  // while (MyData.find().count() < 10) {
  //   MyData.insert({
  //     name: faker.name.findName(),
  //     image: faker.image.cats() + "?" + Random.hexString(24),
  //     details: faker.lorem.sentences()
  //   })
  // }
}

Meteor.startup(function() {
  populate()
})

Meteor.methods({
  repopulate: function() {
    // MyData.insert({
    //   name: faker.name.findName(),
    //   image: faker.image.cats() + "?" + Random.hexString(24),
    //   details: faker.lorem.sentences()
    // })
  },
  reset: function() {
    MyData.remove({affirmative: true});
  }
})
