const os = require('os')
const fs = require('fs')
const path = require("path")
const exists = (filepath) => {
  return new Promise(r=>fs.access(filepath, fs.constants.F_OK, e => r(!e)))
}
module.exports = {
  title: "facefusion",
  description: "Next generation face swapper and enhancer (with GPU support)",
  icon: "icon.png",
  menu: async (kernel) => {
    let installed = await exists(path.resolve(__dirname, "facefusion", "env"))
    let conda_installed = await exists(path.resolve(__dirname, "facefusion", "conda_env"))
    if (installed) {
      let session = (await kernel.loader.load(path.resolve(__dirname, "session.json"))).resolved
      return [{
        when: "start.json",
        on: "<i class='fa-solid fa-spin fa-circle-notch'></i> Running Normal Mode",
        type: "label",
        href: "start.json"
      }, {
        when: "start.json",
        off: "<i class='fa-solid fa-photo-film'></i> Launch Normal Mode",
        href: "start.json?fullscreen=true&run=true",
      }, {
        when: "start.json",
        on: (session && session.url ? "<i class='fa-solid fa-rocket'></i> Open Web UI" : null),
        href: (session && session.url ? session.url : null),
        target: "_blank"
      }, {
        when: "start.json",
        on: "<i class='fa-solid fa-desktop'></i> Server",
        href: "start.json?fullscreen=true"
      }, {
        when: "webcam.json",
        on: "<i class='fa-solid fa-spin fa-circle-notch'></i> Running Webcam Mode",
        type: "label",
        href: "webcam.json"
      }, {
        when: "webcam.json",
        off: "<i class='fa-solid fa-video'></i> Launch Webcam Mode",
        href: "webcam.json?fullscreen=true&run=true",
      }, {
        when: "webcam.json",
        on: (session && session.url ? "<i class='fa-solid fa-rocket'></i> Open Web UI" : null),
        href: (session && session.url ? session.url : null),
        target: "_blank"
      }, {
        when: "webcam.json",
        on: "<i class='fa-solid fa-desktop'></i> Server",
        href: "webcam.json?fullscreen=true"
      }]
    } else if (conda_installed) {
      let session = (await kernel.loader.load(path.resolve(__dirname, "session.json"))).resolved
      return [{
        when: "start_conda.json",
        on: "<i class='fa-solid fa-spin fa-circle-notch'></i> Running Normal Mode",
        type: "label",
        href: "start_conda.json"
      }, {
        when: "start_conda.json",
        off: "<i class='fa-solid fa-photo-film'></i> Launch Normal Mode",
        href: "start_conda.json?fullscreen=true&run=true",
      }, {
        when: "start_enhancer_conda.json",
        off: "<i class='fa-solid fa-photo-film'></i> Launch Enhancer Mode",
        href: "start_enhancer_conda.json?fullscreen=true&run=true",
      }, {
        when: "start_conda.json",
        on: (session && session.url ? "<i class='fa-solid fa-rocket'></i> Open Web UI" : null),
        href: (session && session.url ? session.url : null),
        target: "_blank"
      }, {
        when: "start_conda.json",
        on: "<i class='fa-solid fa-desktop'></i> Server",
        href: "start_conda.json?fullscreen=true"
      }, {
        when: "webcam_conda.json",
        on: "<i class='fa-solid fa-spin fa-circle-notch'></i> Running Webcam Mode",
        type: "label",
        href: "webcam_conda.json"
      }, {
        when: "webcam_conda.json",
        off: "<i class='fa-solid fa-video'></i> Launch Webcam Mode",
        href: "webcam.json?fullscreen=true&run=true",
      }, {
        when: "webcam_conda.json",
        on: (session && session.url ? "<i class='fa-solid fa-rocket'></i> Open Web UI" : null),
        href: (session && session.url ? session.url : null),
        target: "_blank"
      }, {
        when: "webcam_conda.json",
        on: "<i class='fa-solid fa-desktop'></i> Server",
        href: "webcam_conda.json?fullscreen=true"
      }]
    } else {
      let arch = os.arch()
      let platform = os.platform()
      if (platform === 'darwin') {
        if (arch === "x64") {
          return [{
            html: '<i class="fa-solid fa-plug"></i> Install for Intel Mac',
            type: "link",
            href: "install_apple_intel.json?run=true&fullscreen=true"
          }]
        } else if (arch === "arm64") {
          return [{
            html: '<i class="fa-solid fa-plug"></i> Install for M1/M2 Mac',
            type: "link",
            href: "install_apple_silicon.json?run=true&fullscreen=true"
          }]
        }
      } else {
        return [{
          html: '<i class="fa-solid fa-plug"></i> Install for CPU',
          type: "link",
          href: "install_cpu.json?run=true&fullscreen=true"
        }, {
          html: '<i class="fa-solid fa-plug"></i> Install for CUDA',
          type: "link",
          href: "install_cuda.json?run=true&fullscreen=true"
        }, {
          html: '<i class="fa-solid fa-plug"></i> Install for DirectML',
          type: "link",
          href: "install_directml.json?run=true&fullscreen=true"
        }, {
          html: '<i class="fa-solid fa-plug"></i> Install for Openvino',
          type: "link",
          href: "install_openvino.json?run=true&fullscreen=true"
        }]
      }
    }
  }
}
