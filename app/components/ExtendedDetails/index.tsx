import React, { useContext } from 'react';
import  { EthereumDataContext } from "@/app/context";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import "./styles.css"
import { MIN_DEPOSIT_AMOUNT } from "../constants";
import { useWallets } from "@/app/hooks/useWallets";
import MotionNumber from 'motion-number'


const ExtendedDetails: React.FC<{amountEther: undefined | string | number, eclipseAddr: string}> = ({ amountEther, eclipseAddr }) => {
  const [gasPrice, ethPrice] = useContext(EthereumDataContext) ?? [null, null];
  const amountEth = (typeof amountEther === "string" ? parseFloat(amountEther) : amountEther)
  const { evmWallet, solWallet } = useWallets(); 


  if ((!eclipseAddr && !solWallet) || !evmWallet) return null;

  return (
    <div className="extended-details" style={{marginTop: "18px"}}>
      <div className="flex flex-row justify-between items-center single-line">
        <div><span className="white-text">Receive on Eclipse</span></div>
        <div className="flex gap-2 items-center">
        {(gasPrice && ethPrice)
            ? (amountEth && amountEth >= MIN_DEPOSIT_AMOUNT) 
              ? <>
                  <span className="gray-text flex items-center">
                    <span>$</span>
                    <MotionNumber
                      value={parseFloat((amountEth * ethPrice).toFixed(2))}
                      format={{ notation: 'standard' }} 
                      transition={{
                        y: { type: 'spring', duration: 0.65, bounce: 0.25 }
                      }}
                      locales="en-US" 
                    />
                  </span>
                  <span className="green-text flex items-center">
                    <MotionNumber
                      value={parseFloat(String(amountEther ?? "0")).toFixed(3)}
                      format={{ notation: 'compact' }} 
                      transition={{
                        y: { type: 'spring', duration: 0.65, bounce: 0.25 }
                      }}
                      locales="en-US" 
                    /> &nbsp;ETH
                  </span>
                </>
              : <span className="gray-text">-</span>

            : <Skeleton width={80} />
        }
        </div>
      </div>

      <div className="flex flex-row justify-between items-center single-line">
        <div><span className="white-text">Transfer Time</span></div>
        <div className="flex gap-2 items-center">
        {(amountEth && amountEth >= MIN_DEPOSIT_AMOUNT)
            ? <span className="green-text">~ 5 mins</span>
            : <span className="gray-text">-</span>
        }
        </div>
      </div>

      <div className="flex flex-row justify-between items-center single-line">
        <div><span className="white-text">Network Fee</span></div>
        <div className="flex gap-2 items-center">
        {(gasPrice && ethPrice)
            ? (amountEth && amountEth >= MIN_DEPOSIT_AMOUNT) 
              ? <>
                  <span className="gray-text">${(113200 * gasPrice * ethPrice / 10**9).toFixed(2)}</span>
                  <span className="green-text">{(113200 * (gasPrice) / 10**9).toFixed(4)} ETH</span>
                </>
              : <span className="gray-text">-</span>
            : <Skeleton width={80} />
        }
        </div>
      </div>
    </div>
  );
};

export default ExtendedDetails;
