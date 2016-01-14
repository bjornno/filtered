AppBody = React.createClass({
  render() {
    return (
      <div className="ionic-body">
       

        <div className="tabs bar-header">
          <ReactRouter.Link className="tab-item button button-icon icon ion-home" to={"/"}> Snappy </ReactRouter.Link>
          <ReactRouter.Link className="tab-item button button-icon icon ion-heart" to={"/other"}> Liked </ReactRouter.Link>
          <ReactRouter.Link className="tab-item button button-icon icon ion-plus-circled" to={"/new"}> New Event </ReactRouter.Link>
          <ReactRouter.Link className="tab-item button button-icon icon ion-at" to={"/settings"}> Accounts </ReactRouter.Link>
        </div>
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
