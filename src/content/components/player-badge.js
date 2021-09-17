/** @jsx h */
import { h } from 'dom-chef'
import vipLevels, { badgeAnimation } from '../../shared/vip-levels'

export default ({ level = 0, role, bgColor, textColor, onClick }) => {
  let description

  switch (role) {
    case 'Creator': {
      description = 'Has created FACEIT Enhancer'
      break
    }
    case 'Developer': {
      description = 'Is part of FACEIT Enhancer developer team'
      break
    }
    case 'Code Contributor': {
      description = 'Has contributed to FACEIT Enhancer code'
      break
    }
    default: {
      description = `Has donated to FACEIT Enhancer${
        level > 0 ? ` ${level}0\u20AC ` : ' '
      }to support the development`
    }
  }

  return (
    <span
      style={{
        background: bgColor || vipLevels[level].bgColor,
        color: textColor || vipLevels[level].textColor,
        cursor: 'help',
        padding: '.2em .5em .3em',
        display: 'inline',
        fontSize: '75%',
        fontWeight: 700,
        lineHeight: 1,
        textAlign: 'center',
        whiteSpace: 'nowrap',
        verticalAlign: 'baseline',
        borderRadius: '.25em',
        ...(vipLevels[level].style || {})
      }}
      title={description}
      onClick={onClick}
    >
      <style>{badgeAnimation}</style>
      FACEIT Enhancer{' '}
      {role || `VIP ${level > 0 ? new Array(level).fill('★').join('') : ''}`}
    </span>
  )
}
