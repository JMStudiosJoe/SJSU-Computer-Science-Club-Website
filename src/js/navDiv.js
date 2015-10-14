var React = require('react');
var filt = "";
var newTutors = [];

var NavigationDiv = React.createClass({
    mixins: [ParseReact.Mixin],
    observe: function() {
        return {
            posts: (new Parse.Query('Posts')).ascending("displayOrder"),
            tutors: (new Parse.Query('Tutors'))
        };
    },
    render:function()
    {
        var newPosts = [];
        return (
            <div>
                <p id={"hidden"}>{filt = this.props.filter}</p>
                <p id={"hidden"}>{newTutors = this.data.tutors}</p>
                {this.data.posts.map(function(post) {
                    if(filt == "isPinned" && post.isPinned == true)
                    {
                        newPosts.push(post)
                    }
                    else if(filt == "isTutor")
                    {
                        newPosts = newTutors;
                    }
                    else if(filt == "isJob" && post.isJob == true)
                    {
                        newPosts.push(post);
                    }
                    else if(filt == "isProject" && post.isProject == true)
                    {
                        newPosts.push(post);
                    }
                    else if(filt == "isUsefulPost" && post.isUsefulPost == true)
                    {
                        newPosts.push(post);
                    }
                })}
                {<HomeDisplay posts = {newPosts}/>}
            </div>
        );
    }
});

var HomeDisplay = React.createClass({
    render:function()
    {
        return (
            <div>
                {this.props.posts.map(function(post) {
                    return (
                        <div>
                            <br />
                            <div className={"z-depth-4 card margintop"}>
                                <div className={"card-image waves-effect waves-block waves-light"}>
                                    <img src={post.image.url()} />
                                </div>
                                <div className={"card-content"}>
                                    <span className={"card-title grey-text text-darken-4"}>
                                        <h4>{post.title}</h4>
                                        <h6 className={"right"}>{post.date}</h6>
                                    </span>
                                    <h5>{post.summary}</h5>
                                </div>
                                <div className={"card-action"}>
                                    <p className={"flow-text"}>{post.body}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
});

React.render(<NavigationDiv filter = "isPinned" />, document.getElementById('Home'));
React.render(<NavigationDiv filter = "isTutor" />, document.getElementById('Tutors'));
React.render(<NavigationDiv filter = "isJob" />, document.getElementById('Jobs'));
React.render(<NavigationDiv filter = "isProject" />, document.getElementById('Projects'));
React.render(<NavigationDiv filter = "isUsefulPost" />, document.getElementById('Miscs'));