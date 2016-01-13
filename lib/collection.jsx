MyData = new Mongo.Collection("myData");

Meteor.methods({
  addPicture: function (url, name, geo, address) {
    console.log("adding photo" + name + geo)
    MyData.insert({
      name: name,
      timestamp: new Date(),
      loc: {
        type: "Point",
        coordinates: [geo.lng, geo.lat]
      }, 
      place: address,

      //image: faker.image.cats() + "?" + Random.hexString(24),
      //details: text
      image_url: url
    });
  }
})