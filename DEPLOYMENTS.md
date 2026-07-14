# ChainSpend Deployments

This document tracks all smart contract deployments for the ChainSpend project.

---

## Network

**Monad Testnet**

---

## Version 1

**Contract Address**
```
0x313FFf8332B6028D8793979DF16eC08793053dda
```

**Status**
- Archived

**Description**
Initial prototype with a global expense list shared by all users.

**Deployment Date**
- (Add the date here if you want)

---

## Version 2 (Current)

**Contract Address**
```
0x24A3d7F42D76020d6C6dd1c87dcaCDA55E4b6b2a
```

**Status**
- ✅ Current Production Contract

**Features**
- Per-user expense storage
- ExpenseAdded event
- Wallet-specific expense history
- Expense count retrieval

**Deployment Date**
- (Add the date here if you want)

---

## Notes

The frontend should always use the Version 2 contract unless a newer deployment supersedes it.
