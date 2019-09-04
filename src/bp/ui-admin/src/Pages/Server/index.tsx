import { Icon } from '@blueprintjs/core'
import React from 'react'
import { MdCopyright } from 'react-icons/md'

import TabLayout, { AdminTab } from '../Layouts/Tabs'

import Alerting from './Alerting'
import LicenseStatus from './LicenseStatus'
import Monitoring from './Monitoring'
import Versioning from './Versioning'

const Server = (props: any) => {
  const title = 'Server'
  const tabs: AdminTab[] = [
    {
      id: 'tab-monitoring',
      name: 'Monitoring',
      route: '/server/monitoring',
      icon: <Icon icon="timeline-line-chart" />,
      useFullWidth: true,
      proOnly: true,
      component: Monitoring
    },
    {
      id: 'tab-incidents',
      name: 'Incidents',
      route: '/server/alerting',
      icon: <Icon icon="notifications" />,
      useFullWidth: false,
      proOnly: true,
      component: Alerting
    },
    {
      id: 'tab-license',
      name: 'Server License',
      route: '/server/license',
      icon: <MdCopyright />,
      component: LicenseStatus
    },
    {
      id: 'tab-versioning',
      name: 'Version Control',
      route: '/server/version',
      icon: <Icon icon="changes" />,
      component: Versioning
    }
  ]

  return <TabLayout {...{ title, tabs, ...props, showHome: true }} />
}

export default Server
