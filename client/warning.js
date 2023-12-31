$("#modal").hide();
$("#prompt").hide();

$(".open-modal").on("click", function(event){
  event.preventDefault();
  event.stopPropagation();
  $("#modal").show("closed");
});

$("button").on("click", function(){
  $("#modal").fadeOut();
});

$(".modal-container").on("click", function(){
  $("#modal").fadeOut();
});

$(".open-prompt").on("click", function(event){
  event.preventDefault();
  event.stopPropagation();
  $("#prompt").show("closed");
});

$("#btn-cancel").on("click", function(){
  $("#prompt").fadeOut();
});
$("#btn-ok").on("click", function(){
  $("#prompt").fadeOut();
});
/*$(".prompt-container").on("click", function(){
  $("#prompt").fadeOut();
});*/