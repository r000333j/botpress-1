import { Icon } from '@blueprintjs/core'
import React from 'react'

import TabLayout, { AdminTab } from '../Layouts/Tabs'

import Debug from './Debug'
import Languages from './Languages'

const Tools = (props: any) => {
  const title = 'Tools'
  const tabs: AdminTab[] = [
    {
      id: 'tab-languages',
      name: 'Languages',
      route: '/tools/languages',
      icon: <Icon icon="globe-network" />,
      component: Languages
    },
    {
      id: 'tab-debug',
      name: 'Debug',
      route: '/tools/debug',
      icon: <Icon icon="console" />,
      component: Debug
    }
  ]

  return <TabLayout {...{ title, tabs, ...props, showHome: true }} />
}

export default Tools
