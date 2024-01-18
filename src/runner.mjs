#!/usr/bin/env node

import { checkCliArgs } from './cli.mjs'
import { run } from './core.mjs'
import { checkFileConfigExist } from './setup.mjs'

checkFileConfigExist()
checkCliArgs()
run()
