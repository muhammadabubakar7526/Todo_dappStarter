import React from 'react'
import { useContractRead } from 'wagmi'
import WHITELISTABI from '../constant/abi/whitelistDapp.json'
import { whitelistAddress } from 'constant/abi/contractAddress'

const useWhitelistData = (functionName: string, args?: any) => {
  const { data, isFetching, isLoading, isIdle, error } = useContractRead({
    abi: WHITELISTABI,
    address: whitelistAddress,
    functionName,
    args: args ? [args] : null,
  })

  console.log({ data, isFetching, isLoading, isIdle, error })

  return { data }
}

export default useWhitelistData
