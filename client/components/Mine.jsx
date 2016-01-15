Mine = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    let user = Meteor.user()
    let handle = Meteor.subscribe("myData", Geolocation.latLng())
    let data = null
    if (user) { 
      data = MyData.find({ user_id: user._id}).fetch()
    } else {
      data = MyData.find({ user_id: "bar"}).fetch()
    }
    return {
      loading: !handle.ready(),
      users: data
    }
  },
  removeEvent() {
    MyData.remove(_id);
  },
  render() {
    if (this.data.loading) {
      return <h1>Loading</h1>
    }
    let list = this.data.users.map((user) => {
      return (
        <div className="list card">
          <div className="item item-avatar">
            <img src="mcfly.jpg"></img>
            <h2>{user.name}</h2>
            <p>{moment(user.timestamp).fromNow()}</p>
          </div>
          <div className="item item-divider">
            <h2>{user.eventTitle}</h2>
            <p>{moment(user.eventTime).format('MMMM Do YYYY, h:mm:ss a')}</p>
            <p>{user.place}</p>
          </div>
          <div className="item item-image">
            <img src={user.category_image}/>
          </div>
          <div className="item item-body">
            <p>{user.details}</p>
          </div>
          <div className="item item-divider">
            <span className="button icon ion-trash-a" onClick={this.removeEvent}></span>
          </div>
        </div>
      )
    })
    return (
      <div className="list">
        <div className="item item-divider">
          <span className="database-reset-button" onClick={this.reset}>Reset</span>
        </div>
        {list}
      </div>
    )
  }
});
