import { u256 } from '@btc-vision/as-bignum/assembly';
import {
    Address,
    AddressMap,
    Blockchain,
    BytesWriter,
    Calldata,
    OP20,
    OP20InitParameters,
    SafeMath,
} from '@btc-vision/btc-runtime/runtime';

@final
export class Toil extends OP_NET {
    public constructor() {
        super();
    }

    public override onDeployment(_calldata: Calldata): void {
    }

    public override onUpdate(_calldata: Calldata): void {
        super.onUpdate(_calldata);
    }
}
