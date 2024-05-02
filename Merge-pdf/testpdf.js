const mergerPromise = import('pdf-merger-js');



const mergepdf = async (p1,p2) => {
  const PDFMerger = (await mergerPromise).default;
  var merger = new PDFMerger();
  await merger.add(p1); 
  await merger.add(p2); 
  

  

  await merger.save('public/merged.pdf'); //save under given name and reset the internal document
  

}
module.exports = {mergepdf}