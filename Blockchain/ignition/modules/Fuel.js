const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("PurchaseRecordModule", (m) => {
  const PurchaseRecord = m.contract("PurchaseRecord");

  return { PurchaseRecord };
});
