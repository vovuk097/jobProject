$(function() {
    var faye = new Faye.Client('http://localhost:9292/faye');
    //faye.subscribe("/tasks/new", function(data) {
    //    alert(data);
    //});
    //faye.subscribe("/tasks/deleted", function(data) {
    //    eval(data);
    //});

    faye.subscribe("/tasks/deleted", function(data) {

        $.ajax({
            dataType: "json",
            url: "tasks.json",
            data: data
        }).done(function(response) {
            $("table.table tbody tr").remove();
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
            });
        });
    });

    faye.subscribe("/tasks/new", function(data) {
        $.ajax({
            dataType: "json",
            url: "/tasks.json",
            data: data
        }).done(function(response) {
            $("table.table tbody tr").remove();
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
            });
        });
    });

});


//var task={
//    id: response[0].id,
//    key: response[0].key,
//    priority: response[0].priority,
//    reporter: response[0].reporter,
//    assignee: response[0].assignee,
//    description: response[0].description,
//    created_at: response[0].created_at
//};
//var template = "<tr id=\"delete-'{{id}}'\">\n " +
//    "<td><a href=\"/tasks/'{{id}}'\">{{id}}<\/a><\/td>\n  " +
//    "<td><a href=\"/tasks/'{{id}}'\">{{key}}<\/a><\/td>\n  " +
//    "<td>{{priority}}<\/td>\n  <td>{{reporter}}<\/td>\n  " +
//    "<td>{{assignee}}<\/td>\n  <td>{{description}}<\/td>\n  " +
//    "<td>{{created_at}}<\/td>\n     " +
//    " <td>\n        <a class=\"btn btn-info btn-xs\" " +
//    "href=\"/tasks/{{id}}/edit\">Edit<\/a>\n        " +
//    "<a data-confirm=\"Are you sure?\" class=\"btn btn-xs btn-danger\" data-remote=\"true\" rel=\"nofollow\" " +
//    "data-method=\"delete\" href=\"/tasks/{{id}}\">Delete<\/a>\n      <\/td>\n<\/tr>";

//var html = Mustache.to_html(template, task);
//$('#share').prepend(html);