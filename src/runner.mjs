#!/usr/bin/env node

import { checkCliArgs } from './cli.mjs'
import { run } from './core.mjs'

checkCliArgs()
run()
