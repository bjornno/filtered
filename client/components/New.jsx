New = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    let data = Meteor.user()
    return {
      user: data
    }
  },
  handleSubmit(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    let text = React.findDOMNode(this.refs.textInput).value.trim();
    //let geo = Session.get('geo');
    let geo = Session.get('geo');
    let address = Session.get('address');
    MyData.insert({
      name: this.data.user.profile.name,
      timestamp: new Date(),
      loc: {
        type: "Point",
        coordinates: [geo.lng, geo.lat]
      }, 
      place: address,
      //image: faker.image.cats() + "?" + Random.hexString(24),
      details: text
    });
 
    // Clear form
    React.findDOMNode(this.refs.textInput).value = "";
  },
  takePicture() {
    that = this;
    MeteorCamera.getPicture(function(error, imagedata) {
        Meteor.call("addPicture", imagedata, that.data.user.profile.name, Session.get('geo'), Session.get('address'));
      });
  },
  render() {
      return (

        <div className="card">

          {this.data.user ? 
            <p>
            <span className="subdued icon ion-camera" onClick={this.takePicture} />
            <form className="new-message" onSubmit={this.handleSubmit} >
              <input type="text" ref="textInput" placeholder="Create a new Event"/>
              <input type="date" ref="eventDate">When?</input>
              <input type="file" ref="eventImage" accept="image/*" name="image" accept="image/*" capture/>
            </form> 
            </p> : 'Add an account and log in to participate!'
          }
        </div>)
    }
      
    
  
});
