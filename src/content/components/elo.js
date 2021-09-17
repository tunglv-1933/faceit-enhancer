/** @jsx h */
import { h } from 'dom-chef'
import createIconElement from './icon'

export default ({ elo, className, alignRight = false, style = {} }) => {
  const eloElement = (
    <span
      className={className}
      style={{
        display: 'flex',
        'align-items': 'center',
        ...style
      }}
    >
      {createIconElement({
        icon: 'ELO-icon',
        style: {
          [`margin-${alignRight ? 'right' : 'left'}`]: 2,
          [`margin-${alignRight ? 'left' : 'right'}`]: 2,
          'margin-top': 1
        }
      })}
    </span>
  )

  eloElement[alignRight ? 'append' : 'prepend'](elo)

  return eloElement
}
