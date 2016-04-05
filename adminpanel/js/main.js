Parse.initialize("05WHW6H1QMXh3LvET609KcoPGkDJC0jX5dQXx3fg", "DHOSlsNvtKy98lgrl3ixYFnkvfVWiNcVVTyjft00");

var postsData;
var tutorsData;

$(document).ready(function() {
    refresh();
});

function add(id) {
    $('#modal1').openModal();
    $('#modal1 #mtitle').html("Add "+id);
    $('#modal1 #isPinned').attr("checked", false);
    $('#modal1 #isJob').attr("checked", false);
    $('#modal1 #isProject').attr("checked", false);
    $('#modal1 #isUsefulPost').attr("checked", false);
    $('#modal1 #isClubPost').attr("checked", false);
    var str;
    if(id == "Home")
        str = "isPinned";
    else if(id == "Jobs")
        str = "isJob";
    else if(id == "Projects")
        str = "isProject";
    else if(id == "Misc")
        str = "isUsefulPost";
    $('#modal1 #'+str).attr("checked", true);
    var Posts = Parse.Object.extend("Posts");
    var post = new Posts();
    post.save(null, {
        success: function(post) {
            //alert('New object created with objectId: ' + post.id);
            $("#modal1 #addupdate").attr('onclick', 'parsePostPush("modal1", "'+post.id+'")');
            $("#modal1 #cancel").attr('onclick', 'delt('+post.id+', false, true)');
        },
        error: function(post, error) {alert('Failed to create new object, with error code: ' + error.message);}
    });
}

function edit(objId) {
    $('#modal1 #foreground').toggleClass("hide");
    $('#modal1').openModal();
    $('#modal1 #mtitle').html("Edit "+objId);
    var Posts = Parse.Object.extend("Posts");
    var query = new Parse.Query(Posts);
    query.get(objId, {
        success: function(obj) {
            $("#modal1 #title").val(obj.get("title"));
            if(obj.get("isPinned"))
                $("#modal1 #isPinned").attr("checked", true);
            if(obj.get("isJob"))
                $("#modal1 #isJob").attr("checked", true);
            if(obj.get("isProject"))
                $("#modal1 #isProject").attr("checked", true);
            if(obj.get("isUsefulPost"))
                $("#modal1 #isUsefulPost").attr("checkedked", true);
            if(obj.get("isClubPost"))
                $("#modal1 #isClubPost").attr("checked", true);
            $("#modal1 #summary").val(obj.get("summary"));
            $("#modal1 #body").val(obj.get("body"));
            $('#modal1 #foreground').toggleClass("hide");

            if(obj.get("isSchool"))
                $("#modal1 #isSchool").attr("checked", true);
            if(obj.get("isJob"))
                $("#modal1 #isJob").attr("checked", true);
            if(obj.get("isProject"))
                $("#modal1 #isProject").attr("checked", true);
            if(obj.get("isHackathon"))
                $("#modal1 #isHackathon").attr("checked", true);
            if(obj.get("hasMoney"))
                $("#modal1 #hasMoney").attr("checked", true);
            if(obj.get("isOther"))
                $("#modal1 #isOther").attr("checked", true);
        },
        error: function(obj, error) {
            alert("Could not retrieve this obj - "+obj+" "+error);
            $('#modal1 #foreground').toggleClass("hide");
        }
    });
}

function delt(objId, tutors, noAlert) {
    var type = "Posts";
    if(tutors)
        type = "Tutors";
    var Objects = Parse.Object.extend(type);
    var query = new Parse.Query(Objects);
    query.get(objId, {
        success: function(objToDel) {
            if (noAlert || confirm('Are you absolutely fucking sure you want to delete object '+objId+'?')) {
                objToDel.destroy({
                    success: function(myObject) {
                        if(!noAlert)
                            alert("*tear* It has been done...");
                    },
                    error: function(myObject, error) {
                        if(!noAlert)
                            alert("LOL you can't delete it!");
                    }
                });
            } else
                if (!noAlert)
                    alert("Phew! Safe.");
        },
        error: function(object, error) {
            if(!noAlert)
                alert("LOL you can't delete it!");
        }
    });
}

function parsePostPush(id, obId) {
    var Posts = Parse.Object.extend("Posts");
    var query = new Parse.Query(Posts);
    query.get(obId, {
        success: function(post) {
            if(tutor)
                post =
            post.save(null, {
                success: function(post) {
                    alert('Object created with objectId: ' + post.id);
                },
                error: function(post, error) {
                    alert('Failed to create or update the object, with error code: ' + error.message);
                }
            });
        },
        error: function(object, error) {
            alert("It's not saving! Oh no!")
        }
    });
}

function refresh() {
    var query = new Parse.Query(Parse.Object.extend("Posts"));
    query.find({
    success: function(results) {
        $(".tagb").html("");
        console.log("Successfully retrieved " + results.length + " posts.");
        postsData = results;
        var divName;
        var object;
        for (var i = 0; i < results.length; i++) {
            divName = "Home";
            object = results[i];
            if(object.get('isJob') != undefined && object.get('isJob'))
                divName = "Jobs";
            else if(object.get('isProject') != undefined && object.get('isProject'))
                divName = "Projects";
            else if(object.get('isUsefulPost') != undefined && object.get('isUsefulPost'))
                divName = "Misc";
            if($("#"+divName).html() == "")
                $("#"+divName).html('<br><ul class="collection z-depth-2"></ul>');
            divName = "#"+divName+" ul";
            $(divName).append('<li class="collection-item"><div><span class="title">'+object.get('title')+'</span><br><span class="summary">'+object.get('summary')+'</span><br><span class="body">'+object.get('body')+'</span><br><a href="#!" onclick=delete("'+object.id+'")><i class="material-icons">close</i></a><a href="#!" onclick=moveToTop("'+object.id+'")><i class="material-icons">keyboard_arrow_up</i></a><a href="#!" onclick=edit("'+object.id+'")><i class="material-icons">mode_edit</i></a></div></li>');
        }
    }, error: function(error) {
        console.log("Error: " + error.code + " " + error.message);
    }});
    query = new Parse.Query(Parse.Object.extend("Tutors"));
    query.find({
    success: function(results) {
        console.log("Successfully retrieved " + results.length + " tutors.");
        tutorsData = results;
        var object;
        for (var i = 0; i < results.length; i++) {
            if($("#Tutoring").html() == "")
                $("#Tutoring").html('<br><ul class="collection z-depth-2"></ul>');
            object = results[i];
            $("#Tutoring ul").append('<li class="collection-item"><div><span class="title">'+object.get('firstName')+' '+object.get('lastName')+'</span><br><span class="summary">'+object.get('title')+'</span><br><span class="body">'+object.get('biography')+'</span><br><a href="#!" onclick=delete("'+object.id+'"))><i class="material-icons">close</i></a><a href="#!" onclick=moveToTop("'+object.id+'")><i class="material-icons">keyboard_arrow_up</i></a><a href="#!" onclick=edit("'+object.id+'")><i class="material-icons">mode_edit</i></a></div></li>');
        }
    }, error: function(error) {
        console.log("Error: " + error.code + " " + error.message);
    }});
}