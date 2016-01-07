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
        <div className="container">
          <AccountsUIWrapper />
        </div>)
    }
      
    
  
});
