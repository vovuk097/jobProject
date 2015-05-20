$(function() {
    var faye = new Faye.Client('http://localhost:9292/faye');
    //faye.subscribe("/tasks/new", function(data) {
    //    alert(data);
    //});
    faye.subscribe("/tasks/deleted", function(data) {
        eval(data);
    });


    faye.subscribe("/task/new", function(data) {
        var allTasks =$.ajax({
            dataType: "json",
            url: "/tasks.json",
            data: data
        }).done(function() {
            $.getJSON()
        });
        $.each(val, function (i, field) {
            $("#share").append("<tr id=\"delete-'"+i+"'\">\n  " +
                "<td><a href=\"/tasks/'"+i+"'\">"+field+"<\/a><\/td>\n  " +
                "<td><a href=\"/tasks/'"+i+"'\">"+field+"<\/a><\/td>\n  " +
                "<td>field<\/td>\n  <td>field<\/td>\n  " +
                "<td>field<\/td>\n  <td>field<\/td>\n  " +
                "<td><\/td>\n     " +
                " <td>\n        <a class=\"btn btn-info btn-xs\" " +
                "href=\"/tasks/253/edit\">Edit<\/a>\n        " +
                "<a data-confirm=\"Are you sure?\" class=\"btn btn-xs btn-danger\" data-remote=\"true\" rel=\"nofollow\" " +
                "data-method=\"delete\" href=\"/tasks/253\">Delete<\/a>\n      <\/td>\n<\/tr>");

        });
        //$("#share").append(allTasks);
        //alert(allTasks);
    });





    //$.each(response, function (i, field) {
    //    console.log(i);
    //    console.log(field.id);
    //    $("#share").prepend("<tr id=\"delete-'"+field.id+"'\">\n  " +
    //        "<td><a href=\"/tasks/'"+i+"'\">"+field.id+"<\/a><\/td>\n  " +
    //        "<td><a href=\"/tasks/'"+i+"'\">"+field.key+"<\/a><\/td>\n  " +
    //        "<td>"+field.priority+"<\/td>\n  <td>"+field.reporter+"<\/td>\n  " +
    //        "<td>"+field.assignee+"<\/td>\n  <td>"+field.description+"<\/td>\n  " +
    //        "<td>"+field.created_at+"<\/td>\n     " +
    //        " <td>\n        <a class=\"btn btn-info btn-xs\" " +
    //        "href=\"/tasks/"+field.id+"/edit\">Edit<\/a>\n        " +
    //        "<a data-confirm=\"Are you sure?\" class=\"btn btn-xs btn-danger\" data-remote=\"true\" rel=\"nofollow\" " +
    //        "data-method=\"delete\" href=\"/tasks/"+field.id+"\">Delete<\/a>\n      <\/td>\n<\/tr>");
    //
    //});
































    faye.subscribe("/tasks/new", function(data) {
        var allTasks =$.ajax({
            dataType: "json",
            url: "/tasks.json",
            data: data
        }).done(function(response) {
            console.log(response[0]);
                //$.each(response[0], function (i, field) {
                    $("#share").prepend("<tr id=\"delete-'"+response[0].id+"'\">\n  " +
                        "<td><a href=\"/tasks/'"+response[0].id+"'\">"+response[0].id+"<\/a><\/td>\n  " +
                        "<td><a href=\"/tasks/'"+response[0].id+"'\">"+response[0].key+"<\/a><\/td>\n  " +
                        "<td>"+response[0].priority+"<\/td>\n  <td>"+response[0].reporter+"<\/td>\n  " +
                        "<td>"+response[0].assignee+"<\/td>\n  <td>"+response[0].description+"<\/td>\n  " +
                        "<td>"+response[0].created_at+"<\/td>\n     " +
                        " <td>\n        <a class=\"btn btn-info btn-xs\" " +
                        "href=\"/tasks/"+response[0].id+"/edit\">Edit<\/a>\n        " +
                        "<a data-confirm=\"Are you sure?\" class=\"btn btn-xs btn-danger\" data-remote=\"true\" rel=\"nofollow\" " +
                        "data-method=\"delete\" href=\"/tasks/"+response[0].id+"\">Delete<\/a>\n      <\/td>\n<\/tr>");

                //});
            console.log(response)
        });

        //$("#share").append(allTasks);
        //alert(allTasks);
    });
});