Settings = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    let data = Meteor.user()
    let id = Meteor.userId()
    return {
      user: data,
      id: id
    }
  },
  handleSubmit(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    var text = React.findDOMNode(this.refs.textInput).value.trim();
 
    MyData.insert({
      name: this.data.user.profile.name,
      //image: faker.image.cats() + "?" + Random.hexString(24),
      details: text
    });
 
    // Clear form
    React.findDOMNode(this.refs.textInput).value = "";
  },
  render() {
      return (
        <div className="container">
        <AccountsUIWrapper />
        {this.data.user ? 
        <div className="card" >
        <div className="item item-avatar">
          <img className="full-image" src={"http://graph.facebook.com/" + this.data.id + "/picture/?type=large"} />
          
          <h2>{this.data.user.profile.name}</h2>
        </div>
        <form className="new-message" onSubmit={this.handleSubmit} >
          <input type="text" ref="textInput" placeholder="Say something...."/>
        </form>
        </div> : ''
        }
      </div>)
    }
      
    
  
});
