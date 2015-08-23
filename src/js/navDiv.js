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
	 "padding-top" : "3%",
	 "padding-left" : "40%",
	 backgroundImage : "url('../src/img/EDITBackground.jpg')",
	 "background-position-x": "-10%",
	 "background-repeat": "no-repeat"
};
//backgroundImage: 'url(' + imgUrl + ')'
var postDisplayStyle = {
	maxWidth : 400,
	border : 6,
	padding :60,
	margin : 60,
	backgroundColor: 'white',
	"box-shadow" : "6px 6px 36px"
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
		
		
		this.setState({ showHome: true,
			showAbout: false,
			showJoin: false,
			showTutoring: false,
			showJobs: false,
			showTips: false,
			showProjects: false
		});
		
	},
	showAboutTab:function()
	{
		//this.setState({ showAbout: !this.state.showAbout });
		
		this.setState({ showHome: false,
			showAbout: true,
			showJoin: false,
			showTutoring: false,
			showJobs: false,
			showTips: false,
			showProjects: false
		});
	},
	showJoinTab:function()
	{
		
		//this.setState({ showJoin: !this.state.showJoin });
		//this.resetDivs();
		this.setState({ showHome: false,
			showAbout: false,
			showJoin: true,
			showTutoring: false,
			showJobs: false,
			showTips: false,
			showProjects: false
		});
	},
	showTutoringTab:function()
	{
		
		//this.setState({ showTutoring: !this.state.showTutoring });
		this.setState({ showHome: false,
			showAbout: false,
			showJoin: false,
			showTutoring: true,
			showJobs: false,
			showTips: false,
			showProjects: false
		});
	},
	showJobsTab:function()
	{
		
		// this.setState({ showJobs: !this.state.showJobs });
		this.setState({ showHome: false,
			showAbout: false,
			showJoin: false,
			showTutoring: false,
			showJobs: true,
			showTips: false,
			showProjects: false
		});
	},
	showTipsTab:function()
	{
		
		//this.setState({ showTips: !this.state.showTips });
		this.setState({ showHome: false,
			showAbout: false,
			showJoin: false,
			showTutoring: false,
			showJobs: false,
			showTips: true,
			showProjects: false
		});
	},
	showProjectsTab:function()
	{
		
		// this.setState({ showProjects: !this.state.showProjects });
		this.setState({ showHome: false,
			showAbout: false,
			showJoin: false,
			showTutoring: false,
			showJobs: false,
			showTips: false,
			showProjects: true
		});
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
				                            <hr />
				                            <span>{post.summary}</span>
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
		return(<ul>
                <div style={postDisplayStyle}>
                	<h1>About</h1>
                	<hr />
                	<p>Welcome, the SJSU Computer Science club is available for students to unwind, grab a bite to eat and study.</p>
                    <br />
                    <br />
                    <hr />
                </div>
                <div style={postDisplayStyle}>
	                	<h1>Our Goals</h1>
	                	<hr />
	                	<p>We plan on hosting events for students to gain realy world experience, in a variety of ways.</p>
	                    <ul>
	                    	<li>Hacker Rank Computer Science related problems.</li>
	                    	<li>Team oriented student projects.</li>
	                    	<li>SJSU Algorithms practice group.</li>
	                    </ul>
	                    <hr />
	                    
	            </div>
                <div style={postDisplayStyle}>
	                	<h1>Join</h1>
	                	<hr />
	                	<p>Joining is easy, just speak to an officer and best of all its free!</p>
	                	<hr />
	                    
	            </div>
                <div style={postDisplayStyle}>
                	<h1>Rules</h1>
                	<hr />
                	<ul>
                		<li>No throwing objects.</li>
                		<li>No form of abuse.</li>
                		<li>If open seat capacity is less than 5 seats, no GAMING excpect on safa areas.</li>
                	</ul>
                	<hr />
                    
                </div>
                </ul>);
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
			<div style={postDisplayStyle}>

            	<h1>Tutoring</h1>
                <h3>Tutoring hours: </h3>
                
                <br />
                <hr />
                <span>Tutoring is FREE for students!</span>
                <br />
                <hr />
                <span>Now Hiring!!! Talk to Matthew Pleva and send your resume to matthew.pleva@sjsu.edu</span>
                <hr />
            </div>
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
				<div style={postDisplayStyle}>
                	<h1>Job Postings</h1>
                    <h3>All postings are paid in USA $.</h3>
                    
                    <br />
                    <hr />
                    <span>If you would you like to announce a job posting please contact a club officer</span>
                    <br />
                    
                    <hr />
                </div>
                        {this.props.posts.map(function(post) 
                        	{
                        		if(post.isJob == true )
                        		{
			                        return(
				                        <div style={postDisplayStyle}>

				                        	<li>{post.title}</li>
					                        <img src={post.image.url()} />
				                            
				                            <br />
				                            <hr />
				                            <span>{post.summary}</span>
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
var TipsDisplay = React.createClass({
	getInitialState: function() {
		return { show: false };
	},
	render:function()
	{
		return (
			<ul>
			<div style={postDisplayStyle}>

            	<h1>Useful Info</h1>
                <hr />
                <span>Here is some useful information we thought students might enjoy.</span>
                <br />
                <hr />
        
            </div>
                        {this.props.posts.map(function(post) 
                        	{
                        		if(post.isUsefulPost == true )
                        		{
			                        return(
				                        <div style={postDisplayStyle}>
				                        	
				                        	<li>{post.title}</li>
					                        <img src={post.image.url()} />
				                            <br />
				                            <hr />
				                            <span>{post.summary}</span>
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
var ProjectsDisplay = React.createClass({
	getInitialState: function() {
		return { show: false };
	},
	render:function()
	{
		return (
			<ul>
			<div style={postDisplayStyle}>

            	<h1>Ongoing Student Projects</h1>
                <hr />
                <span>These are student oriented projects meant to be open source, coding experience and networking.</span>
                <br />
                <hr />
        
            </div>

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
