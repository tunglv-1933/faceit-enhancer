import OptionsSync from 'webext-options-sync'

import { DEFAULTS } from '../shared/settings'

const storage = new OptionsSync({
  defaults: DEFAULTS,
  migrations: [
    (savedOptions) => {
      if (
        savedOptions.matchRoomAutoVetoMapItems &&
        savedOptions.matchRoomAutoVetoMapItems.includes('de_cbble')
      ) {
        savedOptions.matchRoomAutoVetoMapItems =
          savedOptions.matchRoomAutoVetoMapItems.filter(
            (map) => map !== 'de_cbble'
          )
        savedOptions.matchRoomAutoVetoMapItems.push('de_vertigo')
      }

      if (savedOptions.bans) {
        delete savedOptions.bans
      }

      if (savedOptions.vips) {
        delete savedOptions.vips
      }
    },
    OptionsSync.migrations.removeUnused
  ]
})

export default storage
