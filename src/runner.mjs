#!/usr/bin/env node

import { checkCliArgs } from './core/cli.mjs'
import { validateConfig } from './config/config.mjs'
import { run } from './core/core.mjs'

checkCliArgs()
validateConfig()
run()
