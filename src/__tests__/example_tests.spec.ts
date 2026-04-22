import { Blockchain, TransferHelper } from '@btc-vision/btc-runtime/runtime';
import { u256 } from '@btc-vision/as-bignum/assembly';

describe('Example test', () => {
    beforeEach(() => {
        Blockchain.clearStorage();
        Blockchain.clearMockedResults();
        TransferHelper.clearMockedResults();
    });

    it('test seomthing', () => {
        
    });
});
