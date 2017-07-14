$('.upload-btn').on('click', function (){
    $('#upload-input').click();
    $('.progress-bar').text('0%');
    $('.progress-bar').width('0%');
});

$('#upload-input').on('change', function(){

  var files = $(this).get(0).files;
  if (files.length > 0){
    var formData = new FormData();
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      formData.append('uploads[]', file, file.name);
    }

    $.ajax({
      url: '/',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function(data){
          console.log('upload successful!\n' + data);
        //  window.location = "/";
      },
      xhr: function() {
        // create an XMLHttpRequest
        var xhr = new XMLHttpRequest();

        xhr.upload.addEventListener('progress', function(evt) {
          console.log(evt);
          if (evt.lengthComputable) {
            var percentComplete = evt.loaded / evt.total;
            percentComplete = parseInt(percentComplete * 100);
            $('.progress-bar').text(percentComplete + '%');
            $('.progress-bar').width(percentComplete + '%');
            if (percentComplete === 100) {
              $('.progress-bar').html('Done');
               $('.gen-preview').html('File đã được tải');
              percentComplete == 0;

            }

          }

        }, false);

        return xhr;
      }

    });

  }
   $('.gen-preview').html('Đang tai len...');
  // var file = $('#upload-input')[0].files[0];
  // var reader = new FileReader();
  // reader.onload = function(event) {
  //   var data = reader.result;
  //   $('.gen-preview').html('<p><b>File đã được tải</b></p>');
  //
  // }
  // reader.readAsDataURL(file);
  //
  //

});
