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
        </div>)
    }
      
    
  
});
