// Tool to generate a script to perform surgery

const { hash: namehash } = require('eth-ens-namehash')
const {
  encodeCallsScript,
  encodeAppUpgrade,
  encodeSurgeryOperation
} = require('./encoding')
const { encodeAddressForStorage } = require('./util')

const PACIENT_KERNEL = '0xa50AF873EAbD7a9F6240CBFAF24B3Bf9ef71d7b2'
const PACIENT_ADDR = '0x474af2160eebcb1ec15dcda8de9f36af77f2add0'
const EDIT_SLOT = 0
const EDIT_VALUE = encodeAddressForStorage('0xa2e9a824339d56ba7310f739dd2646bab1461b3a')

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
  const pacientAppBase = '0x94D3013A8700E8B168f66529aD143590CC6b259d'
  const surgeryAppBase = '0xA4EC80B7F8DE7fE28c25F2A2218a54e896eA62f9'
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