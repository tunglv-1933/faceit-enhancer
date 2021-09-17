/** @jsx h */
import select from 'select-dom'
import { h } from 'dom-chef'
import { CACHE_TIME, getSelf } from '../helpers/faceit-api'
import {
  hasFeatureAttribute,
  setFeatureAttribute
} from '../helpers/dom-element'
import { LEVELS } from '../helpers/elo'
import createSkillLevelElement from '../components/skill-level'
import { isLoggedIn } from '../helpers/user'
import createIconElement from '../components/icon'

const FEATURE_ATTRIBUTE = 'level-progress'
const REFRESH_TIME = CACHE_TIME + 15000

export default async () => {
  if (!isLoggedIn()) {
    return
  }

  const headerRightElement = select('.main-header__right > .flex-center-spaced')

  if (!headerRightElement) {
    return
  }

  if (hasFeatureAttribute(FEATURE_ATTRIBUTE, headerRightElement)) {
    return
  }
  setFeatureAttribute(FEATURE_ATTRIBUTE, headerRightElement)

  let levelElement

  const addLevelElement = async () => {
    const self = await getSelf()

    if (!self) {
      return
    }

    const { flag: game, games } = self
    const { skillLevel, faceitElo = 1000 } = games[game]
    const [levelMinElo, levelMaxElo] = LEVELS[skillLevel]

    const progressWidth = levelMaxElo
      ? `${((faceitElo - levelMinElo) / (levelMaxElo - levelMinElo)) * 100}%`
      : '100%'

    const levelBelow = LEVELS[skillLevel - 1]
    const levelAbove = LEVELS[skillLevel + 1]

    const levelBelowEloDiff = levelBelow ? `-${faceitElo - levelBelow[1]}` : 0
    const levelAboveEloDiff = levelMaxElo
      ? `+${levelAbove[0] - faceitElo}`
      : '∞'

    levelElement = (
      <div
        style={{
          display: 'flex',
          'align-items': 'center',
          'margin-left': 4
        }}
      >
        {createSkillLevelElement({ level: skillLevel })}
        <div style={{ 'margin-left': 4 }}>
          <div
            className="text-light"
            style={{
              display: 'flex',
              'justify-content': 'space-between'
            }}
          >
            <div
              style={{
                display: 'flex',
                'align-items': 'center',
                'font-size': 12
              }}
            >
              {createIconElement({
                icon: 'ELO-icon',
                style: {
                  'margin-right': 3,
                  'margin-top': 3
                }
              })}
              {faceitElo}
            </div>
            <div
              className="text-sm text-muted bold"
              style={{ 'align-self': 'flex-end' }}
            >
              {game.toUpperCase()}
            </div>
          </div>
          <div>
            <div
              style={{
                margin: '1px 0',
                height: 2,
                width: 110,
                background: '#4b4e4e'
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: progressWidth,
                  background: '#f50'
                }}
              />
            </div>
            <div
              className="text-sm text-muted bold"
              style={{
                display: 'flex',
                'justify-content': 'space-between'
              }}
            >
              {levelMinElo}
              <span>
                {levelBelowEloDiff}/{levelAboveEloDiff}
              </span>
              <span>{levelMaxElo ? levelMaxElo : '∞'}</span>
            </div>
          </div>
        </div>
      </div>
    )

    headerRightElement.insertBefore(
      levelElement,
      headerRightElement.children[headerRightElement.children.length - 1]
    )
  }

  addLevelElement()

  setInterval(() => {
    levelElement.remove()
    addLevelElement()
  }, REFRESH_TIME)
}
