var React = require('react');
var Parse = require('parse');
var ParseReact = require('parse-react');

var HomeDisplay = React.createClass({
    mixins: [ParseReact.Mixin],
    observe: function() {
        console.log("SUP");
        return {
            posts: (new Parse.Query('Posts')).ascending('displayOrder')
        };
    },
    getInitialState: function()
    {

    },
    render:function()
    {
        return (
                    <div>HELLO</div>
                    // {this.data.posts.map(function(post) {

                    //     return (
                    //         <p>{post.title}</p>
                    //         // <br><br>
                    //         // <div class="z-depth-4 card">
                    //         //     <div class="card-image waves-effect waves-block waves-light">
                    //         //         <img src={post.image.url()}>
                    //         //     </div>
                    //         //     <div class="card-content">
                    //         //         <span class="card-title grey-text text-darken-4"><h4>{post.title}</h4>
                    //         //         //if()
                    //         //             //<h6 class="right">Sept 17, 2015</h6>
                    //         //         </span>
                    //         //     //<h5>{post.summary}</h5>
                    //         //     </div>
                    //         //     <div class="card-action">
                    //         //         <p class="flow-text">HackingEDU coming to SJSU to discuss the upcoming Hackathon and Jobs within the company.</p>
                    //         //     </div>
                    //         // </div>
                    //         );
                    // })}
                );

    }
});

React.render(< HomeDisplay />, $("#Home"));
module.exports = HomeDisplay;
                    /*
                    <div class="z-depth-4 card">
                         <div class="card-image waves-effect waves-block waves-light">
                            <img src={post.image.url()}>
                        </div>
                        <div class="card-content">
                            <span class="card-title grey-text text-darken-4"><h4>{post.title}</h4>
                                if()
                                <h6 class="right">Sept 17, 2015</h6>
                            </span>
                            <h5>{post.summary}</h5>
                        </div>
                        <div class="card-action">
                            <p class="flow-text">HackingEDU coming to SJSU to discuss the upcoming Hackathon and Jobs within the company.</p>
                        </div>
                    </div>*/
//                 })}
//     }
// });

//module.exports = HomeDisplay;

// <div class="z-depth-4 card">
//     <div class="card-image waves-effect waves-block waves-light">
//         <img src="img/home/event1.png">
//     </div>
//     <div class="card-content">
//         <span class="card-title grey-text text-darken-4"><h4>HackingEDU &amp; SJSU Info Session</h4><h6 class="right">Sept 17, 2015</h6></span>
//         <h5>Duncan Hall 318 at 5PM</h5>
//     </div>
//     <div class="card-action">
//         <p class="flow-text">HackingEDU coming to SJSU to discuss the upcoming Hackathon and Jobs within the company.</p>
//     </div>
// </div>
// <br><br>