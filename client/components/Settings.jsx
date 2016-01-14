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
        <div className="list card">
        <ul className="list">
          <li className="item item-toggle">
             Location
            <label className="toggle toggle-calm">
              <input type="checkbox" checked/>
              <div className="track">
                <div className="handle"></div>
              </div>
            </label>
          </li>
          <li className="item item-toggle">
             Friends
            <label className="toggle toggle-calm">
              <input type="checkbox"/>
              <div className="track">
                <div className="handle"></div>
              </div>
            </label>
          </li>
          <li className="item item-toggle">
              My Categories
            <label className="toggle toggle-calm">
              <input type="checkbox"/>
              <div className="track">
                <div className="handle"></div>
              </div>
            </label>
          </li>
          <li className="item item-toggle">
              Invitations
            <label className="toggle toggle-calm">
              <input type="checkbox"/>
              <div className="track">
                <div className="handle"></div>
              </div>
            </label>
          </li>
          <li>
          <div className="item item-icon-left">
            <AccountsUIWrapper />
          </div>
          </li>
        </ul></div>)
        
    }
      
    
  
});
