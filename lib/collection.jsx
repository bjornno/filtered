MyData = new Mongo.Collection("myData");

Meteor.methods({
  addPicture: function (url, name, geo) {
    console.log("adding photo" + name + geo)
    MyData.insert({
      name: name,
      timestamp: new Date(),
      loc: {
        type: "Point",
        coordinates: [geo.lng, geo.lat]
      }, 
      //image: faker.image.cats() + "?" + Random.hexString(24),
      //details: text
      image_url: url
    });
    MyData.insert({
      url: url,
      beerdleId: beerdle_id,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().profile.name
    });
  }
})