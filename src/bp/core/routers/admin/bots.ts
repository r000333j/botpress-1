import { Logger } from 'botpress/sdk'
import { BotService } from 'core/services/bot-service'
import { WorkspaceService } from 'core/services/workspace-service'
import { Router } from 'express'
import _ from 'lodash'

import { CustomRouter } from '..'
import { Bot } from '../../misc/interfaces'
import { asyncMiddleware, success as sendSuccess } from '../util'

export class BotsRouter implements CustomRouter {
  public readonly router: Router

  private asyncMiddleware!: Function

  constructor(private logger: Logger, private workspaceService: WorkspaceService, private botService: BotService) {
    this.asyncMiddleware = asyncMiddleware({ logger })
    this.router = Router({ mergeParams: true })
    this.setupRoutes()
  }

  setupRoutes() {
    const router = this.router

    router.get(
      '/',
      this.asyncMiddleware(async (req, res) => {
        this.workspaceService.assertUserExists(req.authUser.email)

        const botIds = await this.workspaceService.getBotRefs()
        const validBotIds = this.botService.validateBotIds(botIds)
        const bots = await Promise.map(validBotIds, async botId => await this.botService.getBotById(botId))

        // TODO: List bots by workspaces under /workspaces instead of calling this route
        const workspaceName = this.workspaceService.getDefaultWorkspace().name

        return sendSuccess(res, 'Retrieved bots for all teams', {
          bots: bots && bots.filter(Boolean),
          workspace: workspaceName
        })
      })
    )

    router.post(
      '/', // Add new bot
      this.asyncMiddleware(async (req, res) => {
        const bot = <Bot>_.pick(req.body, ['id', 'name'])

        this.workspaceService.assertUserExists(req.authUser.email)

        await this.botService.addBot(bot, req.body.template)
        await this.workspaceService.addBotRef(bot.id)

        return sendSuccess(res, 'Added new bot', {
          botId: bot.id
        })
      })
    )

    router.put(
      '/:botId', // Update bot
      this.asyncMiddleware(async (req, res) => {
        const { botId } = req.params
        const bot = <Bot>req.body
        this.workspaceService.assertUserExists(req.authUser.email)

        await this.botService.updateBot(botId, bot)

        return sendSuccess(res, 'Updated bot', {
          botId
        })
      })
    )

    router.delete(
      '/:botId', // Delete a bot
      this.asyncMiddleware(async (req, res) => {
        const { botId } = req.params
        this.workspaceService.assertUserExists(req.authUser.email)

        await this.botService.deleteBot(botId)
        await this.workspaceService.deleteBotRef(botId)

        return sendSuccess(res, 'Removed bot from team', { botId })
      })
    )
  }
}
