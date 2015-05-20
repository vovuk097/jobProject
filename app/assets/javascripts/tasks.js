$(function() {
    var faye = new Faye.Client('http://localhost:9292/faye');
    //faye.subscribe("/tasks/new", function(data) {
    //    alert(data);
    //});
    //faye.subscribe("/tasks/deleted", function(data) {
    //    eval(data);
    //});


    faye.subscribe("/task/new", function(data) {
        var allTasks =$.ajax({
            dataType: "json",
            url: "/tasks.json",
            data: data
        }).done(function(response) {
        $.each(response, function (i, field) {
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
    });
    });

    faye.subscribe("/tasks/deleted", function(data) {

        $.ajax({
            dataType: "json",
            url: "tasks.json",
            data: data
        }).done(function(response) {
            $.each(response, function (i, field) {
                $("table.table tbody tr").remove();
            });
            $.each(response, function (i, field) {
                var task={
                    id: field.id,
                    key: field.key,
                    priority: field.priority,
                    reporter: field.reporter,
                    assignee: field.assignee,
                    description: field.description,
                    created_at: field.created_at
                };
                var template = "<tr id=\"delete-'{{id}}'\">\n  " +
                    "<td><a href=\"/tasks/'{{id}}'\">{{id}}<\/a><\/td>\n  " +
                    "<td><a href=\"/tasks/'{{id}}'\">{{key}}<\/a><\/td>\n  " +
                    "<td>{{priority}}<\/td>\n  <td>{{reporter}}<\/td>\n  " +
                    "<td>{{assignee}}<\/td>\n  <td>{{description}}<\/td>\n  " +
                    "<td>{{created_at}}<\/td>\n     " +
                    " <td>\n        <a class=\"btn btn-info btn-xs\" " +
                    "href=\"/tasks/{{id}}/edit\">Edit<\/a>\n        " +
                    "<a data-confirm=\"Are you sure?\" class=\"btn btn-xs btn-danger\" data-remote=\"true\" rel=\"nofollow\" " +
                    "data-method=\"delete\" href=\"/tasks/{{id}}\">Delete<\/a>\n      <\/td>\n<\/tr>";

                var html = Mustache.to_html(template, task);
                $('#share').append(html);


            //$("#share").append("<tr id=\"delete-'"+field.id+"'\">\n  " +
            //    "<td><a href=\"/tasks/'"+field.id+"'\">"+field.id+"<\/a><\/td>\n  " +
            //    "<td><a href=\"/tasks/'"+field.id+"'\">"+field.key+"<\/a><\/td>\n  " +
            //    "<td>"+field.priority+"<\/td>\n  <td>"+field.reporter+"<\/td>\n  " +
            //    "<td>"+field.assignee+"<\/td>\n  <td>"+field.description+"<\/td>\n  " +
            //    "<td>"+field.created_at+"<\/td>\n     " +
            //    " <td>\n        <a class=\"btn btn-info btn-xs\" " +
            //    "href=\"/tasks/"+field.id+"/edit\">Edit<\/a>\n        " +
            //    "<a data-confirm=\"Are you sure?\" class=\"btn btn-xs btn-danger\" data-remote=\"true\" rel=\"nofollow\" " +
            //    "data-method=\"delete\" href=\"/tasks/"+field.id+"\">Delete<\/a>\n      <\/td>\n<\/tr>");
            });
        });
    });









    faye.subscribe("/tasks/new", function(data) {
        $.ajax({
            dataType: "json",
            url: "/tasks.json",
            data: data
        }).done(function(response) {
            var task={
                id: response[0].id,
                key: response[0].key,
                priority: response[0].priority,
                reporter: response[0].reporter,
                assignee: response[0].assignee,
                description: response[0].description,
                created_at: response[0].created_at
            };
            var template = "<tr id=\"delete-'{{id}}'\">\n  " +
                "<td><a href=\"/tasks/'{{id}}'\">{{id}}<\/a><\/td>\n  " +
                "<td><a href=\"/tasks/'{{id}}'\">{{key}}<\/a><\/td>\n  " +
                "<td>{{priority}}<\/td>\n  <td>{{reporter}}<\/td>\n  " +
                "<td>{{assignee}}<\/td>\n  <td>{{description}}<\/td>\n  " +
                "<td>{{created_at}}<\/td>\n     " +
                " <td>\n        <a class=\"btn btn-info btn-xs\" " +
                "href=\"/tasks/{{id}}/edit\">Edit<\/a>\n        " +
                "<a data-confirm=\"Are you sure?\" class=\"btn btn-xs btn-danger\" data-remote=\"true\" rel=\"nofollow\" " +
                "data-method=\"delete\" href=\"/tasks/{{id}}\">Delete<\/a>\n      <\/td>\n<\/tr>";

            var html = Mustache.to_html(template, task);
            $('#share').prepend(html);
        });
    });

});

//$("#share").prepend("<tr id=\"delete-'"+response[0].id+"'\">\n  " +
//    "<td><a href=\"/tasks/'"+response[0].id+"'\">"+response[0].id+"<\/a><\/td>\n  " +
//    "<td><a href=\"/tasks/'"+response[0].id+"'\">"+response[0].key+"<\/a><\/td>\n  " +
//    "<td>"+response[0].priority+"<\/td>\n  <td>"+response[0].reporter+"<\/td>\n  " +
//    "<td>"+response[0].assignee+"<\/td>\n  <td>"+response[0].description+"<\/td>\n  " +
//    "<td>"+response[0].created_at+"<\/td>\n     " +
//    " <td>\n        <a class=\"btn btn-info btn-xs\" " +
//    "href=\"/tasks/"+response[0].id+"/edit\">Edit<\/a>\n        " +
//    "<a data-confirm=\"Are you sure?\" class=\"btn btn-xs btn-danger\" data-remote=\"true\" rel=\"nofollow\" " +
//    "data-method=\"delete\" href=\"/tasks/"+response[0].id+"\">Delete<\/a>\n      <\/td>\n<\/tr>");