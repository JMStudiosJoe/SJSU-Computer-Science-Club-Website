$("#manage").hover(function() { // Changes the icon of the FAB upon hover to refresh.
    $("#manage").html("refresh");
}, function() {
    $("#manage").html("add");
});

var app;
var auth;
var database;
var storage;
var postsData;
var tutorsData;

$(document).ready(function() { // Firebase template code to manage authentication.
    var config = {
        apiKey: "AIzaSyC8yFGv6OUWan61bsVanCajkkBCN_wZwx4",
        authDomain: "sjsu-cs-club-website.firebaseapp.com",
        databaseURL: "https://sjsu-cs-club-website.firebaseio.com/",
        storageBucket: "sjsu-cs-club-website.appspot.com",
    };
    app = firebase.initializeApp(config);
    auth = app.auth();
    database = app.database();
    storage = app.storage();
    auth.onAuthStateChanged(function(user) {
        if (user && user.uid == "LY3ExjBaslSGEv2NAvVb2185qbu2") {
            user.getToken().then(function(accessToken) {
                document.getElementById('quickstart-sign-in-status').innerHTML = 'Signed in as ' + user.email + ' | <a href="#" onclick=signout()>Log Out</a>';
                refresh();
            });
        } else {
            alert("You're not allowed here. GTFO, Bitch.");
            signout();
        }
    }, function(error) {
        signout();
    });
});

function signout() { // Signs out the user and moves back to the login page.
    auth.signOut();
    window.location = "index.html";
}

function refresh() { // Refreshes the adminpanel posts with firebase data.
    firebase.database().ref('posts').once('value', function(snapshot) {
        postsData = snapshot.val();
        for (key in postsData) {
            var text = "";
            for (post in postsData[key])
                text += '<ul id="posts,' + key + "," + post + '" class="collection"><li class="collection-item avatar"><img src="' + postsData[key][post].image + '" class="circle"><span class="title">' + postsData[key][post].title + '</span><p>' + postsData[key][post].summary + '<br>' + postsData[key][post].body + '<br>' + postsData[key][post].eventTime + '<br>' + postsData[key][post].address + '</p><a href="#!" class="secondary-content" onclick=edit("posts,' + key + "," + post + '")><i class="material-icons">mode_edit</i></a><a href="#!" class="secondary-content" onclick=moveToBottom("posts,' + key + "," + post + '")><i class="material-icons">keyboard_arrow_down</i></a><a href="#!" class="secondary-content" onclick=delt("posts,' + key + "," + post + '")><i class="material-icons">close</i></a></li></ul>';
            if (key == "tutoring")
                addTutors(text);
            else
                $("#" + key).html(text);
        }
    });
}

function addTutors(origtext) { // Adds the tutors to the adminpanel view
    origtext += '<div class="card-panel"><b>Begin Tutors Data</b></div>';
    firebase.database().ref('tutors').once('value', function(snapshot) {
        tutorsData = snapshot.val();
        for (key in tutorsData)
            origtext += '<ul id="tutors,' + key + '" class="collection"><li class="collection-item avatar"><img src="' + tutorsData[key].image + '" class="circle"><span class="title">' + tutorsData[key].title + '</span><p>' + tutorsData[key].bio + '<br>' + tutorsData[key].fname + '<br>' + tutorsData[key].lname + '<br>' + tutorsData[key].email + '</p><a href="#!" class="secondary-content" onclick=edit("tutors,' + key + '")><i class="material-icons">mode_edit</i></a><a href="#!" class="secondary-content" onclick=moveToBottom("tutors,' + key + '")><i class="material-icons">keyboard_arrow_down</i></a><a href="#!" class="secondary-content" onclick=delt("tutors,' + key + '")><i class="material-icons">close</i></a></li></ul>';
        $("#tutoring").html(origtext);
    });
}

function moveToBottom(id) { // Moves the post clicked on to the bottom by resetting the key to a new timestamp
    id = id.split(',');
    if (id[0] == "posts")
        database.ref(id[0] + "/" + id[1] + "/" + Date.now()).set(postsData[id[1]][id[2]]);
    else if (id[0] == "tutors") {
        database.ref(id[0] + "/" + Date.now()).set(tutorsData[id[1]]);
        id[2] = "";
    }
    database.ref(id[0] + "/" + id[1] + "/" + id[2]).remove();
    refresh();
}

function delt(id) { // Simply deletes the post once confirmed.
    id = id.split(',');
    if (id[0] == "tutors")
        id[2] = "";
    if (confirm('Are you absolutely fucking sure you want to delete object ' + id[1] + ' ' + id[2] + '?')) {
        database.ref(id[0] + "/" + id[1] + "/" + id[2]).remove();
        refresh();
        alert("It has been done.");
    } else
        alert("Phew! Safe.");
}

function add(id) { // The function called when a post is to be added.
    $('#modal1 #foreground').toggleClass("hide");
    id = id.split(',');
    if (id[0] == "posts")
        $('#modal1 #mtitle').html("Adding to " + id[1] + " in " + id[0]);
    else
        $('#modal2 #mtitle').html("Adding to " + id[0]);
    readyModal(id, false);
}

function edit(id) { // The function called when a post is to be edited.
    $('#modal1 #foreground').toggleClass("hide");
    id = id.split(',');
    if (id[0] == "posts")
        $('#modal1 #mtitle').html("Editing post " + id[2] + " in " + id[1]);
    else
        $('#modal2 #mtitle').html("Editing tutor " + id[1]);
    readyModal(id, true);
}

function readyModal(id, edit) { // Resets the correct modal data according to either edit or add and then open the Modal.
    var mod = "modal2";
    var fillData = {
        "fname": "Sample " + id[0] + " fname",
        "bio": "Sample " + id[0] + " bio",
        "lname": "Sample " + id[0] + " lname",
        "image": "empty.png",
        "email": "Sample " + id[0] + " email",
        "title": "Sample " + id[0] + " title"
    }
    if (edit)
        fillData = tutorsData[id[1]];
    if (id[0] == "posts") {
        mod = "modal1";
        fillData = {
            "address": "Sample " + id[1] + " address",
            "body": "Sample " + id[1] + " body",
            "eventTime": Date.now(),
            "image": "empty.png",
            "summary": "Sample " + id[1] + " summary",
            "title": "Sample " + id[1] + " title"
        }
        if (edit)
            fillData = postsData[id[1]][id[2]];
    }
    $('#' + mod).openModal();
    for (key in fillData)
        $('#' + mod + " #" + key).val(fillData[key]);
    $("#" + mod + " #addupdate").attr('onclick', 'pushToFirebase("' + mod + '", "' + id + '", ' + edit + ')'); // Gives the correct data to pushToFirebase when clicked.
    $('#modal1 #foreground').toggleClass("hide");
}

function pushToFirebase(mod, id, edit) { // The one method that reads the data from the correct modal to then push the new data to firebase.
    var data = {};
    var eTime = parseInt($("#" + mod + " #eventTime").val());
    if (isNaN(eTime))
        eTime = "";
    if (mod == "modal1") {
        data["address"] = $("#" + mod + " #address").val();
        data["body"] = $("#" + mod + " #body").val();
        data["eventTime"] = eTime;
        data["image"] = $("#" + mod + " #image").val();
        data["summary"] = $("#" + mod + " #summary").val();
        data["title"] = $("#" + mod + " #title").val();
    } else {
        data["fname"] = $("#" + mod + " #fname").val();
        data["bio"] = $("#" + mod + " #bio").val();
        data["lname"] = $("#" + mod + " #lname").val();
        data["image"] = $("#" + mod + " #image").val();
        data["email"] = $("#" + mod + " #email").val();
        data["title"] = $("#" + mod + " #title").val();
    }
    id = id.split(',');
    if (id[1] == "tutor")
        id[1] = Date.now();
    if (id[0] == "tutors")
        id[2] = "";
    if (id[0] == "posts" && id[2] == null)
        id[2] = Date.now();
    console.log(id[0] + "/" + id[1] + "/" + id[2]);
    console.log(data);
    database.ref(id[0] + "/" + id[1] + "/" + id[2]).set(data);
    refresh();
}