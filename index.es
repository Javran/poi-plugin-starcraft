const { config } = window

export const windowURL = "file://" + __dirname + "/index.html"

export const windowOptions = {
  x: config.get('poi.window.x', 0),
  y: config.get('poi.window.y', 0),
  width: 800,
  height: 600,
}

// export const realClose = true
export const useEnv = true
