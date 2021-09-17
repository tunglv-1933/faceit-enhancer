import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import ListSubheader from '../components/list-subheader'
import ListItemLink from '../components/list-item-link'
import ListItemText from '../components/list-item-text'
import vipLevels, { badgeAnimation } from '../../shared/vip-levels'

export const DONATE = 'Donate'

const VIPBadge = ({ level, bgColor, textColor, style }) => (
  <span
    style={{
      padding: '2px 4px',
      fontSize: 10,
      fontWeight: 'bold',
      borderRadius: 2,
      background: bgColor,
      color: textColor,
      ...(style || {})
    }}
  >
    <style>{badgeAnimation}</style>
    FACEIT Enhancer VIP{' '}
    {level > 0 ? new Array(level).fill(String.fromCharCode(9733)).join('') : ''}
  </span>
)

export default () => (
  <React.Fragment>
    <ListSubheader>Donate</ListSubheader>
    <ListItemText primary="FACEIT Enhancer is a free software and will always be. We develop it in our spare time, so donations are appreciated, but will never be asked for." />
    <ListItemText
      secondary={
        'Optional: To appreciate your support, a donation of 3\u00A3 or more can get you an "FACEIT Enhancer VIP" badge displayed in the match room and on your profile.'
      }
    />
    <ListItemText secondary="There are different badges based on the donation amount:" />
    {Object.keys(vipLevels)
      .map(Number)
      .map(vipLevel => (
        <ListItem style={{ display: 'block' }} key={vipLevel}>
          <Typography
            color="textSecondary"
            variant="caption"
            style={{ marginBottom: 2 }}
          >
            {vipLevel === 0
              ? 'Basic: 3\u00A3 or more'
              : `Level ${vipLevel}: ${vipLevel}0\u00A3 or more`}
          </Typography>
          <VIPBadge level={vipLevel} {...vipLevels[vipLevel]} />
        </ListItem>
      ))}
    <ListItemText secondary="Please include a link to your FACEIT profile in your donation if you want a badge." />
    <ListItemLink primary="PayPal.me" href="https://www.paypal.me/timcheung" />
    <ListItemLink
      primary="BuyMeACoffee.com"
      href="https://www.buymeacoffee.com/timche"
    />
    <ListItemText secondary="Thanks for your support." />
    <ListItemText secondary="Disclaimer: Donations are non-refundable. Badges are not guaranteed to exist forever." />
  </React.Fragment>
)
