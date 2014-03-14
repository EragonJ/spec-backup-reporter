exports = module.exports = SpecBackupReporter;

function SpecBackupReporter(runner) {
  var self = this;
  var tests = [],
      passes = [],
      failures = [];

  // store test one by one
  runner.on('test end', function(test) {
    tests.push(test);
  });

  runner.on('pass', function(test) {
    passes.push(test);
  });

  runner.on('fail', function(test, err) {
    failures.push(test);
  });

  runner.on('end', function(){
    console.log('end: %d/%d', passes.length, passes.length + failures.length);

    var obj = {
      stats: self.stats,
      tests: tests.map(clean),
      failures: failures.map(clean),
      passes: passes.map(clean)
    };

    console.log(obj);
    process.exit(failures);
  });

  function clean(test) {
    return {
      title: test.title,
      fullTitle: test.fullTitle(),
      duration: test.duration
    };
  }
}
