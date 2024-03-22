$('a[href="#"]').on('click', function(e) {
  e.preventDefault();
})

const headTxt = new SplitType('.section-story__description', { types: 'words'});