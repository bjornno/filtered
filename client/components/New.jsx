New = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    let data = Meteor.user()
    let address = Session.get('address')
    return {
      user: data,
      address: address
    }
  },
  handleSubmit(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    let text = React.findDOMNode(this.refs.textInput).value.trim();
    let eventTitl = React.findDOMNode(this.refs.eventTitle).value.trim();
    let address = React.findDOMNode(this.refs.address).value.trim();
    let category = React.findDOMNode(this.refs.selectedValue).value;
    let eventDate = React.findDOMNode(this.refs.eventDate).value;
    let geo = Session.get('geo'); // todo: get lat/lng from address 
    MyData.insert({
      name: this.data.user.profile.name,
      timestamp: new Date(),
      loc: {
        type: "Point",
        coordinates: [geo.lng, geo.lat]
      }, 
      place: address,
      category_image: category,
      eventTitle: eventTitl,
      eventTime: eventDate,
      details: text
    });
 
    // Clear form
    React.findDOMNode(this.refs.textInput).value = "";
    React.findDOMNode(this.refs.eventTitle).value = "";
  },
  
  uploadPicture(e) {
    that = this;
    var file = e.target.files[0];
    this.file = e.target.files[0];
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
        <div className="list card">
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
          <label className="item item-input item-select">
              <div className="input-label">
                Category
              </div>
              <select ref="selectedValue">
              <option value="concert.jpeg" >Any Event</option>
              <option value="lunch.jpeg">Lunch</option>
              <option value="cafe.jpeg">Cafe</option>
              <option value="beer.jpeg">Pub</option>
              <option value="concert.jpeg">concert</option>
            </select>
          </label>
          <label className="item item-input item-floating-label">
            <span className="input-label">Address</span>
            <input type="text" ref="address" placeholder={this.data.address}/>
          </label>
          <label className="item item-input item-floating-label">
            <span className="input-label">When</span>
            <input type="date" ref="eventDate"></input>
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
