const routes = (
  <ReactRouter.Route name="root" handler={AppBody}>
    <ReactRouter.Route name="home" path="/" handler={Home} />
    <ReactRouter.Route name="other" path="/other" handler={Other} />
    <ReactRouter.Route name="settings" path="/settings" handler={Settings} />
    <ReactRouter.DefaultRoute handler={AppLoading} />
    <ReactRouter.NotFoundRoute handler={AppNotFound} />
        
  </ReactRouter.Route>
)

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});

Meteor.startup(function () {
  ReactRouter.run(routes, ReactRouter.HistoryLocation, function (Handler, state) {
    React.render(<Handler />, document.getElementById("app"));
  });
  Tracker.autorun(function () {
    var geo = Geolocation.latLng();
    Session.set('geo', geo);
    //console.log(geo);
  }); 
});
