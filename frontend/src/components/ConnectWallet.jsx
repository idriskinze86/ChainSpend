import { useEffect, useRef } from "react";

function ConnectWallet({
  account,
  setAccount,
  showWalletMenu,
  setShowWalletMenu,
  disconnectWallet,
  copied,
  setCopied,
}) {
  const menuRef = useRef(null);

  async function connectWallet() {
    if (!window.ethereum) {
      alert("Please install Rabby Wallet or another EVM wallet.");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    function handleClickOutside(event) {
      console.log("Clicked:", event.target);

      if (!showWalletMenu) return;

      if (menuRef.current && !menuRef.current.contains(event.target)) {
        console.log("Closing menu");
        setShowWalletMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showWalletMenu, setShowWalletMenu]);

  return (
    <div ref={menuRef} className="wallet-container">
      <button
        onClick={() => {
          if (account) {
            setShowWalletMenu((prev) => !prev);
          } else {
            connectWallet();
          }
        }}
      >
        {account ? "🟢 Wallet Connected ▼" : "Connect Wallet"}
      </button>

      {account ? (
        <>
          <p>
            <strong>Wallet:</strong> {account.slice(0, 6)}...
            {account.slice(-4)}
          </p>

          {copied && (
            <div className="copy-toast">✅ Wallet address copied!</div>
          )}

          {showWalletMenu && (
            <div className="wallet-menu">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(account);

                  setCopied(true);

                  setTimeout(() => {
                    setCopied(false);
                  }, 2000);

                  setShowWalletMenu(false);
                }}
              >
                📋 Copy Address
              </button>

              <button className="disconnect-btn" onClick={disconnectWallet}>
                🚪 Disconnect App
              </button>

              <div className="wallet-menu-note">
                💡 To fully disconnect, remove this site from your wallet's
                Connected Sites.
              </div>
            </div>
          )}
        </>
      ) : (
        <p>
          <strong>🔴 Wallet:</strong> Not Connected
        </p>
      )}
    </div>
  );
}

export default ConnectWallet;
