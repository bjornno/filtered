Settings = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    let data = Meteor.user()
    return {
      user: data
    }
  },
  render() {
      return (

        <div className="list">
          <div className="item item-icon-left">
            <AccountsUIWrapper />
          </div>
          <a className="item item-icon-left" href="#">
            <i className="icon ion-person-stalker"></i>
              Friends
            <span className="badge badge-assertive">0</span>
          </a>
          <a className="item item-icon-left item-icon-right" href="#">
            <i className="icon ion-chatbubble-working"></i>
            Active chats
            <i className="icon ion-ios-telephone-outline"></i>
          </a>
        </div>)
    }
      
    
  
});
