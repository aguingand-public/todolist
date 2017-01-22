angular.module('todoApp', [])
  .controller('TodoListController', function() {
    // -- DECL Données --
    //public
    var data = {
        todos : [ //list d'éléments TODO
            {text:'Learn angular', done:true},
            {text:'Learn Materialize', done:true}],
        todoText:''
    }
    
    // -- DECL Fonctions --
    //public
    function addTodo() { // ajouter un élément à la liste TODO
      if(data.todoText.length==0) {
          Materialize.toast('Aucun texte!',4000);
          return;
      }
      data.todos.push({text:data.todoText, done:false});
      data.todoText = '';
      localStorage.setItem('listeItem',JSON.stringify(data.todos));
    }
    function recoverDatas() {
        console.log(localStorage.getItem('listeItem'));
        if(localStorage.getItem('listeItem')!=null) {
            data.todos=JSON.parse(localStorage.getItem('listeItem'));
        } else {
            localStorage.setItem('listeItem',JSON.stringify(data.todos));
        }
    }
    
    function clear() {
        if(confirm("Êtes-vous sûr de vouloir supprimer la liste?")) {
            data.todos=[];
            localStorage.clear();
        }
    }
    
    function update(index) {
        data.todos[index].done=!data.todos[index].done;
        localStorage.setItem('listeItem',JSON.stringify(data.todos));
    }
    
    function remaining() { // les éléments qui reste à faire (entier)
      var count = 0;
      angular.forEach(data.todos, function(todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    };
    
    recoverDatas();
    
    // -- association des élements public au contrôleur --
    angular.extend(this,
    {
        data:data,
        addTodo:addTodo,
        clear:clear,
        remaining:remaining,
        update:update
    });
  });
 