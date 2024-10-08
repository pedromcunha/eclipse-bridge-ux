export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_BRIDGE_CONTRACT || ''
export const MIN_DEPOSIT_AMOUNT = 0.002;

export const CONTRACT_ABI = [{
      inputs: [{
          internalType: 'bytes32',
          name: '',
          type: 'bytes32'
      }, {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
      }, ],
      name: 'deposit',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
}];
