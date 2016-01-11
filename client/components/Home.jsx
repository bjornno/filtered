React.initializeTouchEvents(true)
// Add listener to get :active pseudoselector working. hack
document.addEventListener("touchstart", function(){}, false)

Home = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    let handle = Meteor.subscribe("myData", Geolocation.latLng())
    let data = MyData.find().fetch().reverse()
    let user = Meteor.user()
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
    let geo = Geolocation.latLng();
    console.log(geo);
    MyData.insert({
      name: this.data.user.profile.name,
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
  removeCard(_id) {
    MyData.remove(_id)
    Meteor.call("repopulate")
  },
  setAffirmative(_id) {
    MyData.update({_id}, {$set: { affirmative: true}})
    Meteor.call("repopulate")
  },
  renderCards() {
    return this.data.users
      .filter((user) =>  user.affirmative != true)
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
        {this.data.user ? 
          <div className="card">
        <form className="new-message" onSubmit={this.handleSubmit} >
          <input type="text" ref="textInput" placeholder="Say something...."/>
        </form> </div>: ''
        }
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
      <div className="card" onTouchStart={this.moveCardInit} onTouchMove={this.moveCard} onTouchEnd={this.moveCardEnd} style={cardStyle}>
        {this.props.card.name}
        <div className="item item-text-wrap">
          <p>{this.props.card.details}</p>
        </div>
          <a className="item item-icon-left item-icon-right" href="#">
            <i className="icon ion-chatboxes"></i>
            <i className="icon ion-thumbsup"></i>
          </a>
      </div>
    )
  }
});
