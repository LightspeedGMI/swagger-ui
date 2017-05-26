import StandaloneLayout from "./layout"
import "../style/main.scss"

import TopbarmultiPlugin from "plugins/topbarmulti"
import TopbarPlugin from "plugins/topbar"
import ConfigsPlugin from "plugins/configs"

// the Standalone preset

let preset = [
  TopbarmultiPlugin,
  //TopbarPlugin,
  ConfigsPlugin,
  () => {
    return {
      components: { StandaloneLayout }
    }
  }
]

module.exports = preset
