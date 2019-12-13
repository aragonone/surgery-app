// Tool to generate a script to perform surgery

const { hash: namehash } = require('eth-ens-namehash')
const {
  encodeCallsScript,
  encodeAppUpgrade,
  encodeSurgeryOperation
} = require('./encoding')
const { encodeAddressForStorage } = require('./util')

const PACIENT_KERNEL = '0x08ac31Dd93c16F1f6c4A0FAE540bA1aD52f581d0'
const PACIENT_ADDR = '0xf739c4d15854cab9874e24a4d1ec084dcaf1f13f'
const EDIT_SLOT = 0
const EDIT_VALUE = encodeAddressForStorage('0x50c4b18022d6e3d9f6835012cfca780bf97714ee')

const PACIENT_APP_ID = namehash('finance.aragonpm.eth')
const SURGERY_APP_ID = namehash('surgery.open.aragonpm.eth')

// Output script actions:
//  - kernel.setApp(baseNamehash, pacientAppId, surgeryAppBase)
//  - Surgery(pacientAddr).operate(editSlot, editValue)
//  - kernel.setApp(baseNamehash, pacientAppId, pacientAppBase)

const generateSurgeryScript = (
  pacientKernel = PACIENT_KERNEL,
  pacientAddr = PACIENT_ADDR,
  pacientAppId = PACIENT_APP_ID,
  editSlot = EDIT_SLOT,
  editValue = EDIT_VALUE
) => {
  // TODO: could be fecthed from apm
  const pacientAppBase = '0x836835289a2e81b66ae5d95b7c8dbc0480dcf9da'
  const surgeryAppBase = '0x3a8bFd0978a35E41Ee5364EB4298aa0E5268F0cd'
  const actions = [
    {
      to: pacientKernel,
      data: encodeAppUpgrade(pacientAppId, surgeryAppBase)
    },
    {
      to: pacientAddr,
      data: encodeSurgeryOperation(editSlot, editValue)
    },
    {
      to: pacientKernel,
      data: encodeAppUpgrade(pacientAppId, pacientAppBase)
    }
  ]

  return encodeCallsScript(actions)
}

console.log(generateSurgeryScript())