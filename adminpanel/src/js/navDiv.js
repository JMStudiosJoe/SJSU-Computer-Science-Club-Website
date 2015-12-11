/**
 * Created by josephrichardson on 4/29/15.
 */

//
var React = require('react');
var Icon = require('react-geomicons');
// 

var NavigationDiv = React.createClass({
	mixins: [ParseReact.Mixin], // Enable query subscriptions

	observe: function() {
		// Subscribe to all Comment objects, ordered by creation date
		// The results will be available at this.data.comments
		return {
			posts: (new Parse.Query('Posts')).ascending("displayOrder"),
			tutors: (new Parse.Query('Tutors')),
			
		};
	},
	getInitialState: function()
	{
		return {
		};
	},
	
	render:function()
	{

			return <h1>FUCK YOU</h1>;
		// return (<ul>

		// 	{this.data.posts.map(function(post) {
  //                       return (
  //                           <div class="z-depth-4 card">
  //                               <div class="card-image waves-effect waves-block waves-light">
  //                                   <img src={post.image.url()} />
  //                               </div>
  //                               <div class="card-content">
  //                                   <span class="card-title grey-text text-darken-4"><h4>{post.title}</h4>
  //                                   //if()
  //                                       //<h6 class="right">Sept 17, 2015</h6>
  //                                   </span>
  //                               //<h5>{post.summary}</h5>
  //                               </div>
  //                               <div class="card-action">
  //                                   <p class="flow-text">HackingEDU coming to SJSU to discuss the upcoming Hackathon and Jobs within the company.</p>
  //                               </div>
  //                           </div>
  //                           );
  //                   }
  //               )}
		// 	</ul>);

	}
});
//////////////////////////////////////END NAVIGATION DIV



React.render(<NavigationDiv />, document.getElementById('home'));

module.exports = NavigationDiv;
