const abi = require('web3-eth-abi')
const { SET_APP_ABI, OPERATE_ABI } = require('./abi')

const CALLSCRIPT_ID = '0x00000001'
const APP_BASES_NAMESPACE = '0xf1f3eb40f5bc1ad1344716ced8b8a0431d840b5783aea1fd01786bc26f35ac0f'

/**
 * Encode a call script
 *
 * ```
 * CallsScriptAction {
 *   to: string;
 *   data: string;
 * }
 * ```
 *
 * Example:
 *
 * input:
 * [
 *  { to: 0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa, data: 0x11111111 },
 *  { to: 0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb, data: 0x2222222222 }
 * ]
 *
 * output:
 * 0x00000001
 *   aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0000000411111111
 *   bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb000000052222222222
 *
 *
 * @param {Array<CallsScriptAction>} actions
 * @returns {string}
 */
function encodeCallsScript (actions) {
  return actions.reduce((script, { to, data }) => {
    console.log(to, data)

    const address = abi.encodeParameter('address', to)
    const dataLength = abi.encodeParameter('uint256', (data.length - 2) / 2).toString('hex')

    return script + address.slice(26) + dataLength.slice(58) + data.slice(2)
  }, CALLSCRIPT_ID)
}

function encodeAppUpgrade (appId, newImplementation) {
  return abi.encodeFunctionCall(SET_APP_ABI, [APP_BASES_NAMESPACE, appId, newImplementation])
}

function encodeSurgeryOperation (slot, value) {
  return abi.encodeFunctionCall(OPERATE_ABI, [slot, value])
}

module.exports = {
  encodeCallsScript,
  encodeAppUpgrade,
  encodeSurgeryOperation
}
