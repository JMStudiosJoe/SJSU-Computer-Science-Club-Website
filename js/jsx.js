var Posts = React.createClass({ // The react component that manages the entire post.
    render: function () {
        var converter = new showdown.Converter(); // The init of the markdown converter
        var getTimeString = function (time) { // Get the time string from the timestamp in the local format.
            if (time == "" || time == 0)
                return "Invalid Data";
            else if (time < 1000000000)
                time *= 1000;
            return (new Date(time)).toLocaleString();
        }
        var getAddressQuery = function (address, url) { // Returns either a google map search query link or just the address
            if (address == "")
                if(url)
                    return "#";
                else
                    return "Invalid Data";
            else if (url)
                return "https://www.google.com/maps/search/" + address;
            else
                return address;
        }
        var rawMarkup = function (markdown) { // Returns the html rending of the markdown from the body using showdown
            if (markdown == "")
                return "Invalid Data";
            return {__html: converter.makeHtml(markdown)};
        }
        var posts = this.props.all.map(function (post) { // The actual post template that will be used to populate each post; the map function is used to loop through all the posts that are in each section.
            return <div><br/><br/>
                <div className={"card z-depth-4"}>
                    <div className={"card-image waves-effect waves-block waves-light"}>
                        <img src={post.image} />
                    </div>
                    <div className={"card-content"}>
                        <h4 className={"grey-text text-darken-4"}>{post.title}</h4>
                        <h5 className={"card-title grey-text text-darken-4"}>{post.summary}</h5>
                        <p className={"grey-text text-darken-4 flow-text"}>{getTimeString(post.eventTime)}</p>
                    </div>
                    <div className={"card-action"}>
                        <h5 className={"grey-text text-darken-4"}>
                                <a target={"_blank"} href={getAddressQuery(post.address, true)}>{getAddressQuery(post.address, false)}</a>
                        </h5>
                        <p className={"grey-text text-darken-4 flow-text"} dangerouslySetInnerHTML={ rawMarkup(post.body.toString()) } />
                    </div>
                </div>
            </div>;
        });
        return <div>{posts}</div>; // The actual line that returns the posts to be rendered; uses the posts variable mapped function of this.props.all.
    }
});

var keys; // All the keys of the posts currently being used.
var items; // All the objects referenced by the keys.
firebase.database().ref('posts').on('value', function (snapshot) {
    for (var key in snapshot.val()) {
        keys = Object.keys(snapshot.val()[key]); // Gets all the keys of the posts in snapshot.val()[key], key can be home, about, etc.
        items = []; // Makes an empty array and fills it with all the posts
        for (var j = 0; j < keys.length; j++) {
            items[j] = snapshot.val()[key][keys[j]]; // The array is created to make react use the map function, which only works with arrays.
            console.log(items[j].body.toString());
        }

        if (key == "tutoring")
            key = "r" + key;
        ReactDOM.render(< Posts all = {items} />, document.getElementById(key)); //Actually render the posts.
    }
    loadTutors(); // Loads the tutors
});

/* The post template to load tutors using react
<br><br>
<div className={"card z-depth-4"}>
    <div className={"card-image"}>
        <img src={tutor.image}>
    </div>
    <div className={"card-content"}>
        <h4 className={"grey-text text-darken-4"}>{tutor.fname + " " + tutor.lname}</h4>
        <span className={"card-title grey-text text-darken-4"}><h5>{tutor.title}</h5></span>
    </div>
    <div className={"card-action"}>
        <h5 className={"grey-text text-darken-4"}>
            <a target={"_blank"} href={"mailto:" + tutor.email}>{tutor.email}</a>
        </h5>
        <p className={"grey-text text-darken-4 flow-text"}>{tutor.bio}</p>
    </div>
</div>
*/