/**
 * File: logger.js
 * Desc: this file handles server logging
 */

exports.log = function(description, filename, functionName, error) {
  console.log("---------------------------------------");
  console.log(Date());
  console.log("---------------------------------------");
  if (error) {
    console.error("AN ERROR HAS OCCURRED:");
    console.error("\t" + description);
    console.error("\t" + functionName + " @" + filename) ;
    console.error("\t" + JSON.stringify(error));
  } else {
    console.log(description);
  }
};
