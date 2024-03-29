import logger from '@shared/Logger'
import commandLineArgs from 'command-line-args'
import dotenv from 'dotenv'
import find from 'find'
import Jasmine from 'jasmine'

// Setup command line options
const options = commandLineArgs([
  {
    name: 'testFile',
    alias: 'f',
    type: String,
  },
])

// Set the env file
const result2 = dotenv.config({
  path: `./src/pre-start/env/test.env`,
})
if (result2.error) {
  throw result2.error
}

// Init Jasmine
const jasmine = new Jasmine(null)

// Set location of test files
jasmine.loadConfig({
  random: true,
  spec_dir: 'spec',
  spec_files: ['./tests/**/*.spec.ts'],
  stopSpecOnExpectationFailure: false,
})

// On complete callback function
jasmine.onComplete((passed: boolean) => {
  if (passed) {
    logger.info('All tests have passed :)')
  } else {
    logger.err('At least one test has failed :(')
  }
})

// Run all or a single unit-test
if (options.testFile) {
  const testFile = options.testFile as string
  find.file(testFile + '.spec.ts', './spec', (files) => {
    if (files.length === 1) {
      jasmine.specFiles = [files[0]]
      jasmine.execute()
    } else {
      logger.err('Test file not found!')
    }
  })
} else {
  jasmine.execute()
}
