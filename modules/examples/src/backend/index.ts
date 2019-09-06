import * as sdk from 'botpress/sdk'

const onServerStarted = async (bp: typeof sdk) => {}
const onServerReady = async (bp: typeof sdk) => {}

const botTemplates: sdk.BotTemplate[] = [
  { id: 'weather-bot', name: 'Weather Bot', desc: `Gets the weather for a city` }
]

const entryPoint: sdk.ModuleEntryPoint = {
  onServerStarted,
  onServerReady,
  botTemplates,
  definition: {
    name: 'examples',
    menuIcon: 'none',
    menuText: 'Examples',
    fullName: 'Examples',
    homepage: 'https://botpress.io'
  }
}

export default entryPoint
