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
    let eventTitl = React.findDOMNode(this.refs.eventTitle).value.trim();
    let file = React.findDOMNode(this.refs.eventImage).value;
    if (file) {
      this.uploadPicture(file);
    }
    
    console.log(file)
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
      eventTitle: eventTitl,
      details: text
    });
 
    // Clear form
    React.findDOMNode(this.refs.textInput).value = "";
    React.findDOMNode(this.refs.eventTitle).value = "";
  },

  uploadPicture(e) {
    that = this;
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function(upload) {
      Meteor.call("addPicture", upload.target.result, that.data.user.profile.name, Session.get('geo'), Session.get('address'))
    }
    reader.readAsDataURL(file);
  },
  takePicture() {
    that = this;
    MeteorCamera.getPicture(function(error, imagedata) {
        Meteor.call("addPicture", imagedata, that.data.user.profile.name, Session.get('geo'), Session.get('address'));
      });
  },
  isIos() {
    console.log(/iPad|iPhone|iPod/.test(navigator.platform))
    return /iPad|iPhone|iPod/.test(navigator.platform);
  },
  render() {
      return (
        <div className="list">
        {this.data.user ? 
        <form className="new-message" onSubmit={this.handleSubmit}> 
          <label className="item item-input item-floating-label">
            <span className="input-label">Title</span>
            <input type="text" ref="eventTitle" placeholder="Create a title for your new Event"/>
          </label>
          <label className="item item-input item-floating-label">
            <span className="input-label">Description</span>
            <input type="text" ref="textInput" placeholder="Create a description for your new Event"/>
          </label>
          <label className="item item-input item-floating-label">
            <span className="input-label">Picture</span>
            {this.isIos() ?
              <input type="file" ref="eventImage" accept="image/*" name="image" accept="image/*" onChange={this.uploadPicture}> Add a picture </input>
              :
              <span className="subdued icon ion-camera" onClick={this.takePicture}> Add a picture </span>
            }
          </label>
          <label className="item item-input item-floating-label">
          <input type="date" ref="eventDate">When?</input>
          </label>
          <li className="item item-toggle">
             limit to friends
            <label className="toggle toggle-calm">
              <input type="checkbox"/>
              <div className="track">
                <div className="handle"></div>
              </div>
            </label>
          </li>
          <li className="item item-toggle">
              Limit to location 
            <label className="toggle toggle-calm">
              <input type="checkbox"/>
              <div className="track">
                <div className="handle"></div>
              </div>
            </label>
          </li>
          <button className="button button-small" onClick={this.handleSubmit}>
            Submit
          </button>
        </form>
        : 'Add an account and log in to participate!'
          }
        </div>

        )
    }
      
    
  
});
