AppBody = React.createClass({
  render() {
    return (
      <div className="ionic-body">
       

        <div className="bar bar-header bar-light">
          <ReactRouter.Link className="button button-icon icon ion-chatbubble-working" to={"/settings"}></ReactRouter.Link>
          <ReactRouter.Link className="h1 title" to={"/"}>SnappyChatty</ReactRouter.Link>
          <ReactRouter.Link className="button button-icon icon ion-heart" to={"/other"}></ReactRouter.Link>
        </div>
        <AccountsUIWrapper />
        <div className="view">
          <div className="scroll-content ionic-scroll">
            <div className="content overflow-scroll has-header">
              <ReactRouter.RouteHandler />
            </div>
          </div>
        </div>
      </div>
    )
  }
})
