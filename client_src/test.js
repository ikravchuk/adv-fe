$( document ).ready( function () {
    var posts = Data.getPosts();

    var jsonTemplateRaw = $('#posts-json-template').html();
    var tableTemplateRaw = $('#posts-table-template').html();
    var jsonTemplate = Handlebars.compile(jsonTemplateRaw);
    var tableTemplate = Handlebars.compile(tableTemplateRaw);

    Handlebars.registerHelper('json', function () {
      var jsonBeautiful = "<ul>[<li class='json'><ul>";
      for (var i = 0; i < posts.length; i++) {
            jsonBeautiful += "<li class='json'><ul class='json--post'>" +
            JSON.stringify(posts[i]).replace(/,"/g, ',</li><li class="json">"')
            .replace(/}/g, '</li></ul>},<ul class="json--post"><li class="json">')
            .replace(/{/g, '</li></ul>{<ul class="json--post"><li class="json">')

             + "</ul></li>";

      }
      jsonBeautiful += "</ul></li>]</ul>";
      return new Handlebars.SafeString(jsonBeautiful);
    });

    Handlebars.registerHelper('table', function () {
    var table = "";
      for (var i = 0; i < posts.length; i++) {
          if (i%2 === 0){
            table += "<div class='table--row'>" + posts[i]['description'] + "</div>";
            continue;
          }
          table += "<div class='table--row table--row-dark'>" + posts[i]['description'] + "</div>";
      }
      return table;
    });

    render();

    function render() {
        renderJson();
        renderTable();
    }



    function renderJson() {
      var html = jsonTemplate(posts);
        $( '.posts-json' ).html(html);
    }

    function renderTable() {
      var html = tableTemplate(posts);
        $( '.posts-table' ).html(html);

    }

//     function syntaxHighlight(json) {
//     json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
//     return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
//         var cls = 'number';
//         if (/^"/.test(match)) {
//             if (/:$/.test(match)) {
//                 cls = 'key';
//             } else {
//                 cls = 'string';
//             }
//         } else if (/true|false/.test(match)) {
//             cls = 'boolean';
//         } else if (/null/.test(match)) {
//             cls = 'null';
//         }
//         return '<div class="' + cls + '">' + match + '</div>';
//     });
// }
});
