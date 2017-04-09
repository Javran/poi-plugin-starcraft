const PLUGIN_KEY = "plugin.poi-plugin-starcraft"

const keyPlans = PLUGIN_KEY + ".plans"

const { config } = window

const modifyPlans = modify => {
  const oldPlans = config.get( keyPlans, {} )
  config.set( keyPlans, modify(oldPlans) )
}

const starText = star =>
  star === 0 ? "Owned"
  : star === 10 ? "★+max"
  : `★+${star}`

export {
  PLUGIN_KEY,
  keyPlans,

  modifyPlans,

  starText,
}
