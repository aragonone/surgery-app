const KERNEL_ABI = require('@aragon/os/abi/Kernel.json').abi
const SURGERY_ABI = require('../build/contracts/Surgery.json').abi

const SET_APP_ABI =
  KERNEL_ABI.find(interface =>
    interface.type === 'function' && interface.name === 'setApp'
  )

const OPERATE_ABI =
  SURGERY_ABI.find(interface =>
    interface.type === 'function' && interface.name === 'operate'
  )

module.exports = {
  SET_APP_ABI,
  OPERATE_ABI
}
