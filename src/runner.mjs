#!/usr/bin/env node

import { checkCliArgs } from './core/cli.mjs'
import { run } from './core/core.mjs'

checkCliArgs()
run()
