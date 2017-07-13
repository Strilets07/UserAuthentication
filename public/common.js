$("#submit").click(function(e) {
  e.preventDefault();
  let username = document.querySelector('.username').value;
  let pass = document.querySelector('.pass').value;
  username.value='';
  pass.value = '';

  $.ajax({
      type: "POST",
      url: "/register",
      data: JSON.stringify({username: username, password: pass}),
      dataType: "json",
      contentType: "application/json",
      success: function(data){
        if(data.code !== false) {
          window.location.reload();
        } else {
          document.getElementById("wrong").innerHTML = data.msg;
        }
      },
   });
});

$("#logout").click(function(e){
  $.ajax({
      type: "POST",
      url: "/logout",
      success: function(data){
        window.location.reload();
      },
  });
});
