//alert('hello')

//const { json } = require("express");










var quill = new Quill('#editor', {
  theme: 'snow' // 'snow' is one of the available themes
});

var htmlContent = quill.root.innerHTML;
console.log(htmlContent);


quill.on('text-change', function(delta, oldDelta, source) {
    console.log('Content changed:', quill.root.innerHTML);
  });

  