Settings = React.createClass({
  handleSubmit(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    var text = React.findDOMNode(this.refs.textInput).value.trim();
 
    MyData.insert({
      name: "Bjørn Nordlund",
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
        {Meteor.user ? 
        <div className="card" >
        <div className="item item-avatar">
          <h2>Bjørn Nordlund</h2>
        </div>
        <form className="new-message" onSubmit={this.handleSubmit} >
          <input type="text" ref="textInput" placeholder="Say something...."/>
        </form>
        </div> : ''
        }
      </div>)
    }
      
    
  
});
