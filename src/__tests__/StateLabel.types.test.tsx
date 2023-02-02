import React from 'react'
import StateLabel from '../StateLabel/StateLabel'

export function shouldAcceptCallWithNoProps() {
  return <StateLabel />
}

export function shouldNotAcceptSystemProps() {
  // @ts-expect-error system props should not be accepted
  return <StateLabel backgroundColor="bisque" />
}
