import select from 'select-dom'
import { getMatchState, getRoomId } from '../helpers/match-room'
import { getSelf, getMatch } from '../helpers/faceit-api'
import {
  setStyle,
  hasFeatureAttribute,
  setFeatureAttribute
} from '../helpers/dom-element'

const FEATURE_ATTRIBUTE = 'focus-mode'

export default async parent => {
  const matchState = getMatchState(parent)

  if (!['VOTING', 'CONFIGURING', 'READY', 'ONGOING'].includes(matchState)) {
    return
  }

  const roomId = getRoomId()
  const { teams } = await getMatch(roomId)

  const self = await getSelf()
  const isSelfInMatch = [
    ...teams.faction1.roster,
    ...teams.faction2.roster
  ].some(player => player.id === self.guid)

  if (!isSelfInMatch) {
    return
  }

  const balanceIndicatorElement = select('.match__team-balance', parent)

  if (
    balanceIndicatorElement &&
    !hasFeatureAttribute(FEATURE_ATTRIBUTE, balanceIndicatorElement)
  ) {
    setFeatureAttribute(FEATURE_ATTRIBUTE, balanceIndicatorElement)
    setStyle(balanceIndicatorElement, 'opacity: 0')
  }

  const toggleChatElement = select('div[ng-click="vm.toggleSidebar()"]', parent)

  if (
    toggleChatElement &&
    !hasFeatureAttribute(FEATURE_ATTRIBUTE, toggleChatElement)
  ) {
    setFeatureAttribute(FEATURE_ATTRIBUTE, toggleChatElement)
    toggleChatElement.click()
  }

  const teamElements = select.all('match-team-v2', parent)

  teamElements.forEach(teamElement => {
    if (!hasFeatureAttribute(FEATURE_ATTRIBUTE, teamElement)) {
      setFeatureAttribute(FEATURE_ATTRIBUTE, teamElement)
      setStyle(teamElement, 'opacity: 0')
    }
  })
}
