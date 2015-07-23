/**
 * Created by josephrichardson on 4/29/15.
 */

//
var React = require('react');
var Icon = require('react-geomicons');
var IconExample = React.createClass({
	render: function(){
		return <Icon name={this.props.name} width="60" height="60"/>
	}
});
var navBarStyling = {
	paddingLeft: 30,
	paddingRight: 30

};
var NavigationDiv = React.createClass({
	getInitialState: function()
	{
		return {showHome: true,
			showAbout:false,
			showJoin: false,
			showTutoring:false,
			showJobs: false,
			showTips:false,
			showProjects:false
		};
	},
	resetDivs:function()
	{
		this.setState({ showHome: false,
			showAbout: false,
			showJoin: false,
			showTutoring: false,
			showJobs: false,
			showTips: false,
			showProjects: false
		});
	},
	showHomeTab:function()
	{
		this.resetDivs();
		this.setState({ showHome: !this.state.showHome });
	},
	showAboutTab:function()
	{
		this.resetDivs();
		this.setState({ showAbout: !this.state.showAbout });
	},
	showJoinTab:function()
	{
		this.resetDivs();
		this.setState({ showJoin: !this.state.showJoin });
	},
	showTutoringTab:function()
	{
		this.resetDivs();
		this.setState({ showTutoring: !this.state.showTutoring });
	},
	showJobsTab:function()
	{
		this.resetDivs();
		this.setState({ showJobs: !this.state.showJobs });
	},
	showTipsTab:function()
	{
		this.resetDivs();
		this.setState({ showTips: !this.state.showTips });
	},
	showProjectsTab:function()
	{
		this.resetDivs();
		this.setState({ showProjects: !this.state.showProjects });
	},
	render:function()
	{

		return (<div>
			<button style={this.navBarStyling} onClick={this.showHomeTab}><IconExample name="home" /></button>
			<button style={navBarStyling} onClick={this.showAboutTab}><IconExample name="info" /></button>
			<button style={navBarStyling} onClick={this.showJoinTab}><IconExample name="user" /></button>
			<button style={navBarStyling} onClick={this.showTutoringTab}><IconExample name="warning" /></button>
			<button style={navBarStyling} onClick={this.showJobsTab}><IconExample name="heart" /></button>
			<button style={navBarStyling} onClick={this.showTipsTab}><IconExample name="check" /></button>
			<button style={navBarStyling} onClick={this.showProjectsTab}><IconExample name="github" /></button>
			{ this.state.showHome ? <HomeDisplay /> : null }
			{ this.state.showAbout ? <AboutDisplay /> : null }
			{ this.state.showJoin ? <JoinDisplay /> : null }
			{ this.state.showTutoring ? <TutoringDisplay /> : null }
			{ this.state.showJobs ? <JobsDisplay /> : null }
			{ this.state.showTips ? <TipsDisplay /> : null }
			{ this.state.showProjects ? <ProjectsDisplay /> : null }
			</div>);

	}
});

var postDisplayStyle = {
	maxWidth : 450,
	border: 6
};
var HomeDisplay = React.createClass({
	mixins: [ParseReact.Mixin], // Enable query subscriptions

	observe: function() {
		// Subscribe to all Comment objects, ordered by creation date
		// The results will be available at this.data.comments
		return {
			posts: (new Parse.Query('Posts'))
		};
	},
	getInitialState: function() {
		return { show: false };
	},
	render:function()
	{
		return (
			<ul>
                        {this.data.posts.map(function(c) {
	                        return(
		                        <div style={postDisplayStyle}>
			                        <img src={c.image.url()} />
		                                <li>{c.title}</li>
	                                </div>);
                        })}
			</ul>
		);
	}
});
var AboutDisplay = React.createClass({
	getInitialState: function() {
		return { show: false };
	},
	render:function()
	{
		return <h1>About</h1>;
	}
});
var JoinDisplay = React.createClass({
	getInitialState: function() {
		return { show: false };
	},
	render:function()
	{
		return <h1>Join</h1>;
	}
});
var TutoringDisplay = React.createClass({
	getInitialState: function() {
		return { show: false };
	},
	render:function()
	{
		return <h1>Tutoring</h1>;
	}
});
var JobsDisplay = React.createClass({
	getInitialState: function() {
		return { show: false };
	},
	render:function()
	{
		return <h1>Jobs</h1>;
	}
});
var TipsDisplay = React.createClass({
	getInitialState: function() {
		return { show: false };
	},
	render:function()
	{
		return <h1>Tips</h1>;
	}
});
var ProjectsDisplay = React.createClass({
	getInitialState: function() {
		return { show: false };
	},
	render:function()
	{
		return <h1>Projects</h1>;
	}
});

React.render(<NavigationDiv />, document.getElementById('navigation'));

module.exports = NavigationDiv;
