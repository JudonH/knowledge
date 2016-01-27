 var drunk = esun.use("drunk");
 var Application = esun.use("drunk.application");
 drunk.Component.define("home-page", {
     template: '<div><h1>Home page</h1><a href="#/subpage1">To sub page 1</a></div>',
     onEnter: function (state) {
         console.log(state.params.matchid);
     }
 });
 drunk.Component.define("sub-page1", {
     template: '<div>Sub page 1</div>'
 });
 Application.start(document.querySelector('application'));