// my-awesome-reporter.js
// @ts-check

const { error } = require("console");
const fs=require("fs")
const path=require("path");
const { threadId } = require("worker_threads");
let passedcount=0;
let failedcount=0;
let resultsobj={};
class MyReporter {  
    onBegin(config, suite) {
      this.config = config;
    this.suite = suite;
      console.log(`Starting the run with ${suite.allTests().length} tests`);
    }
  
    onTestBegin(test) {
      console.log(`Starting test ${test.title}`);
    }
  
    onTestEnd(test, result) {
      console.log(`Finished test ${test.title}: ${result.status}`);
      if(result.status=="passed"){
        passedcount=passedcount+1
      }
      else if(result.status=="failed"){
        failedcount=failedcount+1
      }
      resultsobj["Passedcount"]=passedcount
      resultsobj["Failedcount"]=failedcount
      const jsonstring=JSON.stringify(resultsobj)
      fs.writeFileSync("./result.json",jsonstring)
    }
  
onEnd(result) {
      console.log(`Finished the run: ${result.status}`);
    }
  }
  module.exports = MyReporter;