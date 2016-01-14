Other = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    let user = Meteor.user()
    let handle = Meteor.subscribe("myData", Geolocation.latLng())
    let data = null
    if (user) { 
      data = MyData.find({ favoured: { "$in" : [user._id]}}, {sort: {timestamp: -1}}).fetch()
    } else {
      data = MyData.find({ foo: "bar"}).fetch()
    }
    return {
      loading: !handle.ready(),
      users: data
    }
  },
  reset() {
    Meteor.call('reset')
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
            <p>{moment(user.timestamp).fromNow()} from {user.place}</p>
          </div>
          <div className="item item-body">
            <p>{user.details}</p>
            <img src={user.image_url} height="200"/>
          </div>
          <div className="item item-divider">
            <span className="button icon ion-trash-a"></span>
            <span className="button icon ion-thumbsup" > Skal </span>
            <span className="button icon ion-thumbsdown" > Skal ikke </span>
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
