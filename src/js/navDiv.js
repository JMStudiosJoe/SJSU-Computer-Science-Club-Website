/**
 * Created by josephrichardson on 4/29/15.
 */

//
var React = require('react');
var Icon = require('react-geomicons');
// 
var IconExample = React.createClass({
	render: function(){
		return <Icon name={this.props.name} width="30" height="30"/>
	}
});
var contentPositioning = {
	 "padding-top" : "15%",
	 "padding-left" : "10%",
	 backgroundImage : "url('../img/EDITBackground.jpg')"
};
//backgroundImage: 'url(' + imgUrl + ')'
var postDisplayStyle = {
	maxWidth : 450,
	border : 6,
	padding :60,
	margin : 60,
	backgroundColor: 'white',
	"box-shadow" : "6px 6px 6px"
};
var navBarStyling = {
	marginLeft: 10,
	marginRight: 10

};
var NavigationDiv = React.createClass({
	mixins: [ParseReact.Mixin], // Enable query subscriptions

	observe: function() {
		// Subscribe to all Comment objects, ordered by creation date
		// The results will be available at this.data.comments
		return {
			posts: (new Parse.Query('Posts')),
			tutors: (new Parse.Query('Tutors')),
			
		};
	},
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

		return (<div style={contentPositioning}>
			<button style={navBarStyling} onClick={this.showHomeTab}><IconExample name="home" /></button>
			<button style={navBarStyling} onClick={this.showAboutTab}><IconExample name="info" /></button>
			<button style={navBarStyling} onClick={this.showTutoringTab}><IconExample name="warning" /></button>
			<button style={navBarStyling} onClick={this.showJobsTab}><IconExample name="heart" /></button>
			<button style={navBarStyling} onClick={this.showProjectsTab}><IconExample name="github" /></button>
			<button style={navBarStyling} onClick={this.showTipsTab}><IconExample name="check" /></button>
			{ this.state.showHome ? <HomeDisplay posts={this.data.posts} /> : null }
			{ this.state.showAbout ? <AboutDisplay /> : null }
			{ this.state.showTutoring ? <TutoringDisplay tutors={this.data.tutors} /> : null }
			{ this.state.showJobs ? <JobsDisplay posts={this.data.posts} /> : null }
			{ this.state.showTips ? <TipsDisplay posts={this.data.posts} /> : null }
			{ this.state.showProjects ? <ProjectsDisplay posts={this.data.posts} /> : null }
			</div>);

	}
});
//////////////////////////////////////END NAVIGATION DIV


var HomeDisplay = React.createClass({
	
	getInitialState: function() {
		return { show: false };
	},
	render:function()
	{
		return (
			<ul>
                        {this.props.posts.map(function(post) 
                        	{
                        		if(post.isPinned == true)
                        		{
			                        return(
				                        <div style={postDisplayStyle}>
				                        	<li><h3>{post.title}</h3></li>
					                        <img src={post.image.url()} />
					                        
				                            <br />
				                            <br />
				                            <br />
				                            <hr />
				                            <span>{post.body}</span>
				                            <hr />
				                            
			                            </div>);
	                    		}
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
		return (
			<ul>
                        {this.props.tutors.map(function(tutor) 
                        	{
                        		
			                        return(
				                        <div style={postDisplayStyle}>
					                        <img src={tutor.image.url()} />
				                                <li>{tutor.firstName} {tutor.lastName}</li>
			                            </div>);
	                    		
                        })}
			</ul>
		);
	}
});
var JobsDisplay = React.createClass({
	getInitialState: function() {
		return { show: false };
	},
	render:function()
	{
		return (
			<ul>
                        {this.props.posts.map(function(post) 
                        	{
                        		if(post.isJob == true )
                        		{
			                        return(
				                        <div style={postDisplayStyle}>

					                        <img src={post.image.url()} />
				                                <li>{post.title}</li>
			                                </div>);
	                    		}
                        })}
			</ul>
		);
	}
});
var TipsDisplay = React.createClass({
	getInitialState: function() {
		return { show: false };
	},
	render:function()
	{
		return (
			<ul>
                        {this.props.posts.map(function(post) 
                        	{
                        		if(post.isUsefulPost == true )
                        		{
			                        return(
				                        <div style={postDisplayStyle}>
				                        	
					                        <img src={post.image.url()} />
				                                <li>{post.title}</li>
			                                </div>);
	                    		}
                        })}
			</ul>
		);
	}
});
var ProjectsDisplay = React.createClass({
	getInitialState: function() {
		return { show: false };
	},
	render:function()
	{
		return (
			<ul>
                        {this.props.posts.map(function(post) 
                        	{
                        		if(post.isProject == true )
                        		{
			                        return(
				                        <div style={postDisplayStyle}>
				                        	
					                        <img src={post.image.url()} />
				                                <li>{post.title}</li>
			                                </div>);
	                    		}
                        })}
			</ul>
		);
	}
});

React.render(<NavigationDiv />, document.getElementById('navigation'));

module.exports = NavigationDiv;
