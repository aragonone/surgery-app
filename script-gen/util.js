function encodeAddressForStorage (addr) {
  return `0x${'00'.repeat(32 - 20)}${addr.slice(2)}`
}

module.exports = {
  encodeAddressForStorage
}