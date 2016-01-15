React.initializeTouchEvents(true)
// Add listener to get :active pseudoselector working. hack
document.addEventListener("touchstart", function(){}, false)

Home = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    let user = Meteor.user()
    let geo = Session.get('geo')
    if (!geo) {
      loading: true;
    }
    let handle = Meteor.subscribe("myData", geo)
    let data = null
    if (user) { 
      data = MyData.find({"$and": [
                              { favoured: { "$nin" : [user._id]}}, 
                              { deleted: { "$nin" : [user._id]}}
                              ]}, {sort: {timestamp: -1}, limit: 3}).fetch()
    } else {
      data = MyData.find({}, {sort: {timestamp: -1}, limit: 3}).fetch()
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
  removeCard(_id) {
    MyData.update({_id}, {$push: { deleted: this.data.user._id }})
  },
  setAffirmative(_id) {
    MyData.update({_id}, {$push: { favoured: this.data.user._id }})
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
        {
          this.data.user ? 
          ''
           :
        <div className="card"> <p> Showing the most liked event near you. Add an account and log in to participate!</p></div>
        }           
    <div>{this.renderCards()}</div>
    </div>)
  }
})

Card = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    let user = Meteor.user()
    return {
      user: user
    }
  },
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
    if (!this.data.user) {return}
    e.preventDefault();
    this.setState({
      initialX: e.touches[0].pageX,
      initialY: e.touches[0].pageY,
      dragging: "none"
    })
  },
  moveCard(e) {
    if (!this.data.user) {return}
    e.preventDefault()
    deltaX = (e.touches[0].pageX - this.state.initialX)
    deltaY = (e.touches[0].pageY - this.state.initialY)
    this.setState({
      x: deltaX,
      y: deltaY
    })
  },
  moveCardEnd(e) {
    if (!this.data.user) {return}
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
    let isTouchScreen = (('ontouchstart' in window)
      || (navigator.maxTouchPoints > 0)
      || (navigator.msMaxTouchPoints > 0));
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
        <div className="item item-divider">
            <h1>{this.props.card.eventTitle}</h1>
            <p>{moment(this.props.card.eventTime).format('MMMM Do YYYY, h:mm:ss a')}</p>
            <p>{this.props.card.place}</p>
        </div>
        <div className="item item-image">
          <img src={this.props.card.category_image}/>
        </div>
        <div className="item item-body">
          <p>{this.props.card.details}</p>
          {this.props.card.image_url?
          <img src={this.props.card.image_url} height="150"/>
          : ''
          }
        </div>
        {isTouchScreen ? 
           <span>&nbsp; {this.props.card.favoured ? this.props.card.favoured.length : 0} likes </span>
         : 
        <div className="item item-divider bar bar-footer bar-dark">
          <span className="button icon ion-trash-a" onClick={this.props.remove}></span>
          <span className="button icon ion-thumbsup" onClick={this.props.setAffirmative}> {this.props.card.favoured ? this.props.card.favoured.length : 0} likes </span>
        </div>
        }
      </div>
    )
  }
});
