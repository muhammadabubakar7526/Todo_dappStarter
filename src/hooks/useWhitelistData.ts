import React, { useCallback } from 'react'
import {
 useContractRead,
 useContractWrite,
 useNetwork,
 usePrepareContractWrite,
} from 'wagmi'
import WHITELISTABI from '../constant/abi/whitelistDapp.json'
import { whitelistAddress } from 'constant/abi/contractAddress'

const useWhitelistData = (functionName?: string, args?: any) => {
 const { chain, chains } = useNetwork()
 //  console.log({ chain, chains })
 const { data, isFetching, isLoading, isIdle, error } = useContractRead({
  abi: WHITELISTABI,
  address: whitelistAddress,
  functionName,
  args: args ? [args] : null,
 })

 const { config } = usePrepareContractWrite({
  address: whitelistAddress,
  abi: WHITELISTABI,
  functionName: 'addAddressToWhitelist',
  chainId: chain?.id,
 })

 const { data: whiteListData, write: getAddToWhiteList } =
  useContractWrite(config)

 //  console.log({ whiteListData, getAddToWhiteList })

 return { data, getAddToWhiteList }
}

export default useWhitelistData
