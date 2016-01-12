React.initializeTouchEvents(true)
// Add listener to get :active pseudoselector working. hack
document.addEventListener("touchstart", function(){}, false)

Home = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    let user = Meteor.user()
    let handle = Meteor.subscribe("myData", Session.get('geo'))
    let data = null
    if (user) { 
      data = MyData.find({"$and": [
                              { favoured: { "$nin" : [user._id]}}, 
                              { deleted: { "$nin" : [user._id]}}
                              ]}).fetch().reverse()
    } else {
      data = MyData.find().fetch().reverse()
    }
    return {
      loading: !handle.ready(),
      users: data,
      user: user
    }
  },
  handleSubmit(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    let text = React.findDOMNode(this.refs.textInput).value.trim();
    //let geo = Session.get('geo');
    let geo = Session.get('geo');
    MyData.insert({
      name: this.data.user.profile.name,
      timestamp: new Date(),
      loc: {
        type: "Point",
        coordinates: [geo.lng, geo.lat]
      }, 
      //image: faker.image.cats() + "?" + Random.hexString(24),
      details: text
    });
 
    // Clear form
    React.findDOMNode(this.refs.textInput).value = "";
  },
  takePicture() {
    MeteorCamera.getPicture(function(error, data) {
        Meteor.call("addPicture", data, that._id);
      });
  },
  removeCard(_id) {
    MyData.update({_id}, {$push: { deleted: this.data.user._id }})
    Meteor.call("repopulate")
  },
  setAffirmative(_id) {
   // MyData.update({_id}, {$set: { affirmative: true}})
    MyData.update({_id}, {$push: { favoured: this.data.user._id }})
    Meteor.call("repopulate")
  },
  renderCards() {
    return this.data.users
      .map((card) => {
        return <Card
          key={card._id}
          card={card}
          remove={ () => this.removeCard(card._id)}
          setAffirmative={ () => this.setAffirmative(card._id)}
        />
    })
  },
  render() {
    if (this.data.loading) {
      return <h1>Loading</h1>
    }
    return(
    <div className="container">
        <div className="card">
          {this.data.user ? 
            <p>
            <span className="subdued icon ion-camera" onClick={this.takePicture} />
            <form className="new-message" onSubmit={this.handleSubmit} >
              <input type="text" ref="textInput" placeholder="Say something...."/>
            </form> 
            </p> : 'Log in to write something'
          }
        </div>
    <div>{this.renderCards()}</div>
    </div>)
  }
})

Card = React.createClass({
  getInitialState() {
    return {
      x: 0,
      y: 0,
      initialX: 0,
      initialY: 0,
      dragging: "none"
    }
  },
  moveCardInit(e) {
    e.preventDefault();
    this.setState({
      initialX: e.touches[0].pageX,
      initialY: e.touches[0].pageY,
      dragging: "none"
    })
  },
  moveCard(e) {
    e.preventDefault()
    deltaX = (e.touches[0].pageX - this.state.initialX)
    deltaY = (e.touches[0].pageY - this.state.initialY)
    this.setState({
      x: deltaX,
      y: deltaY
    })
  },
  moveCardEnd(e) {
    e.preventDefault()
    if (e.changedTouches[0].pageX < 50) {
      this.setState({
        x: -1000,
        y: 0,
        dragging: "all 0.5s ease"
      })
      Meteor.setTimeout(this.props.remove, 500)
    } else if (e.changedTouches[0].pageX > (window.innerWidth - 50)) {
      this.setState({
        x: 1000,
        y: 0,
        dragging: "all 0.5s ease"
      })
      Meteor.setTimeout(this.props.setAffirmative, 500)
    } else {
      this.setState({
        x: 0,
        y: 0,
        dragging: "all 0.5s ease"
      })
    }
  },
  render() {
    let cardStyle = {
      transform: "translate(" +
        this.state.x + "px," +
        this.state.y + "px)" +
        " rotate("+this.state.x/10 + "deg)",
      transition: this.state.dragging,
      WebkitTransform: "translate(" +
        this.state.x + "px," +
        this.state.y + "px)" +
        " rotate("+this.state.x/10 + "deg)",
      WebkitTransition: this.state.dragging
    }
    if (this.state.x <= -1000 || this.state.x >= 1000) {
      cardStyle.marginBottom = "-" + (document.getElementsByClassName("card")[0].offsetHeight + 20) + "px"
    }
    return (
      <div className="list card" onTouchStart={this.moveCardInit} onTouchMove={this.moveCard} onTouchEnd={this.moveCardEnd} style={cardStyle}>
        <div className="item item-avatar">
          <img src="mcfly.jpg"></img>
          <h2>{this.props.card.name}</h2>
          <p>{moment(this.props.card.timestamp).fromNow()}</p>
        </div>
        <div className="item item-body">
          <p>{this.props.card.details}</p>
          <p>
            <span className="subdued icon ion-trash-a" onClick={this.props.remove}>  </span>
            <span className="subdued icon ion-thumbsup" onClick={this.props.setAffirmative}>  </span>
            <a href="#" className="subdued icon ion-chatboxes"> 5 Comments </a>
          </p>
        </div>
      </div>
    )
  }
});
