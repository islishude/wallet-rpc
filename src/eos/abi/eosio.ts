/** spell-checker: disable */

type account_name = string;

type permission_name = string;

type action_name = string;

type transaction_id_type = string;

type weight_type = number;

type bytes = string;

// "1.0000 EOS"
type asset = string;

type public_key = string;

export interface ITypeAuthority {
    threshold: number;
    keys: ITypeKeyWeight[];
    account: ITypePermissionLevelWeight[];
    waits: ITypeWaitWeight[];
}

export interface ITypePermissionLevel {
    actor: account_name;
    permission_name: account_name;
}

export interface ITypeKeyWeight {
    key: public_key;
    weight: weight_type;
}

export interface ITypePermissionLevelWeight {
    permission: ITypePermissionLevel;
    weight: weight_type;
}

export interface ITypeWaitWeight {
    wait_sec: number;
    weight: weight_type;
}

export interface ITypeBidName {
    bidder: account_name;
    newname: account_name;
    bid: asset;
}

export interface ITypeBidRefund {
    bidder: account_name;
    newname: account_name;
}

////////////////////////////////
// Action sections
//
///////////////////////////////

// The `{{ newaccount }}` action creates a new account.
// As an authorized party I {{ signer }} wish to exercise 
// the authority of {{ creator }} to create a new account
// on this system named {{ name }} such that the new account's 
// owner public key shall be {{ owner }} and the active public key shall be {{ active }}
export interface INewAccount {
    account: "eosio";
    name: "newaccount";
    data: {
        creator: account_name;
        name: account_name;
        // owner authority
        owner: ITypeAuthority;
        // active authority
        active: ITypeAuthority
    }
}

export interface ISetCode {
    account: "eosio";
    name: "setcode";
    data: {
        account: account_name;
        // uint8
        vmtype: number;
        // uint8
        vmversion: number;
        // bytes
        code: string;
    }
}

export interface ISetABI {
    account: "eosio";
    name: "setabi";
    data: {
        account: account_name;
        abi: string;
    }
}
export interface IUpdateAuth {
    account: "eosio";
    name: "updateauth";
    data: {
        account: account_name;
        permission: permission_name;
        parent: permission_name;
        // authority type
        auth: ITypeAuthority;
    }
}

export interface IDeleteAuth {
    account: "eosio";
    name: "deleteauth";
    data: {
        account: account_name;
        permission: permission_name;
    }
}

export interface ILinkAuth {
    account: "eosio";
    name: "linkauth";
    data: {
        account: account_name;
        code: account_name;
        type: action_name;
        requirement: permission_name;
    }
}

export interface IUnlinkAuth {
    account: "eosio";
    name: "unlinkauth";
    data: {
        account: account_name;
        code: account_name;
        type: action_name;
    }
}

// The `{{ canceldelay }}` action cancels an existing delayed
// transaction.\n\nAs an authorized party I {{ signer }} wish
// to invoke the authority of {{ canceling_auth }} to cancel the transaction with ID {{ trx_id }}.
export interface ICancelDelay {
    account: "eosio";
    name: "canceldelay";
    data: {
        canceling_auth: ITypePermissionLevel;
        trx_id: transaction_id_type;
    }
}

export interface IOnError {
    sender_id: number;
    sent_trx: bytes;
}

// This action will attempt to reserve about {{bytes}} bytes
// of RAM on behalf of {{receiver}}.{{buyer}} authorizes this 
// contract to transfer sufficient EOS tokens to buy the RAM 
// based upon the current price as determined by the market 
// maker algorithm.\n\n{{buyer}} accepts that a 0.5% fee will
// be charged on the EOS spent and that the actual RAM received
// may be slightly less than requested due to the approximations
// necessary to enable this service.\n{{buyer}} accepts that a 0.5% fee
// will be charged if and when they sell the RAM received.\n{{buyer}} accepts
// that rounding errors resulting from limits of computational precision may
// result in less RAM being allocated.\n{{buyer}} acknowledges that the supply 
// of RAM may be increased at any time up to the limits of off-the-shelf computer
// equipment and that this may result in RAM selling for less than purchase price.
// {{buyer}} acknowledges that the price of RAM may increase or decrease over time
// according to supply and demand.\n{{buyer}} acknowledges that RAM is non-transferable.
// {{buyer}} acknowledges RAM currently in use by their account cannot be sold until it
// is freed and that freeing RAM may be subject to terms of other contracts.
export interface IBuyRAMByte {
    account: "eosio";
    name: "buyrambytes";
    data: {
        payer: account_name;
        receiver: account_name;
        // uint32
        bytes: number;
    }
}

// This action will attempt to reserve about {{quant}} worth of RAM on behalf of {{receiver}}.
// {{buyer}} authorizes this contract to transfer {{quant}} to buy RAM based upon the current 
// price as determined by the market maker algorithm.\n\n{{buyer}} accepts that a 0.5% fee will
// be charged on the amount spent and that the actual RAM received may be slightly less than 
// expected due to the approximations necessary to enable this service.\n{{buyer}} accepts that
// a 0.5% fee will be charged if and when they sell the RAM received.\n{{buyer}} accepts that
// rounding errors resulting from limits of computational precision may result in less RAM being allocated.
// {{buyer}} acknowledges that the supply of RAM may be increased at any time up to the limits of off-the-shelf
// computer equipment and that this may result in RAM selling for less than purchase price.\n{{buyer}} acknowledges
// that the price of RAM may increase or decrease over time according to supply and demand.\n{{buyer}} acknowledges
// that RAM is non-transferrable. \n{{buyer}} acknowledges RAM currently in use by their account cannot be sold until
// it is freed and that freeing RAM may be subject to terms of other contracts.
export interface IBuyRAM {
    account: "eosio";
    name: "buyram";
    data: {
        payer: account_name;
        receiver: account_name;
        quant: asset;
    }
}

// nThe `{{ sellram }}` action sells unused RAM for tokens.
// As an authorized party I {{ signer }} wish to sell {{ bytes }} of unused RAM from account {{ account }}.
export interface ISellRam {
    account: "eosio";
    name: "sellram";
    data: {
        account: account_name;
        // uint64
        bytes: number;
    }
}

// The intent of the `{{ delegatebw }}` action is to stake tokens for 
// bandwidth and/or CPU and optionally transfer ownership.\n\nAs an authorized
// party I {{ signer }} wish to stake {{ stake_cpu_quantity }} for CPU and {{ stake_net_quantity }}
// for bandwidth from the liquid tokens of {{ from }} for the use of delegatee {{ to }}.{{if transfer }}
// It is {{ transfer }} that I wish these tokens to become immediately owned by the delegatee.
// {{/if}}\n\nAs signer I stipulate that, if I am not the beneficial owner of these tokens, 
// I have proof that Iu2019ve been authorized to take this action by their beneficial owner(s).
export interface IDelegateBrandwidth {
    account: "eosio";
    name: "delegatebw";
    data: {
        from: account_name;
        receiver: account_name;
        stake_net_quantity: asset;
        stake_cpu_quantity: asset;
        // Sender can be `undelegatebw` 
        // with rpc call is 0(false) or 1(true)
        // so it's really `number` type
        // but implicit boolean type
        transfer: boolean;
    }
}

// The intent of the `{{ undelegatebw }}` action is to unstake tokens from CPU and/or bandwidth. 
// As an authorized party I {{ signer }} wish to unstake {{ unstake_cpu_quantity }} from CPU 
// and {{ unstake_net_quantity }} from bandwidth from the tokens owned by {{ from }} previously
// delegated for the use of delegatee {{ to }}. \n\nIf I as signer am not the beneficial owner of 
// these tokens I stipulate I have proof that Iu2019ve been authorized to take this action by their beneficial owner(s).
export interface IUndelegateBrandwidth {
    account: "eosio";
    name: "undelegatebw";
    data: {
        from: account_name;
        receiver: account_name;
        unstake_net_quantity: asset;
        unstake_cpu_quantity: asset;
    }
}

// The intent of the `{{ refund }}` action is to return previously unstaked tokens to an account after the unstaking period has elapsed. 
// As an authorized party I {{ signer }} wish to have the unstaked tokens of {{ owner }} returned.
export interface IRefund {
    account: "eosio";
    name: "refund";
    data: {
        owner: account_name;
    }
}

// The intent of the `{{ regproducer }}` action is to register an account as a BP candidate.
// I, {{producer}}, hereby nominate myself for consideration as an elected block producer.
// If {{producer}} is selected to produce blocks by the eosio contract, 
// I will sign blocks with {{producer_key}} and I hereby attest that I will keep this key secret and secure.
// If {{producer}} is unable to perform obligations under this contract I will resign my position by resubmitting 
// this contract with the null producer key.\n\nI acknowledge that a block is 'objectively valid' if it conforms
// to the deterministic blockchain rules in force at the time of its creation, and is 'objectively invalid'
// if it fails to conform to those rules.\n\n{{producer}} hereby agrees to only use {{producer_key}} to sign
// messages under the following scenarios:\nproposing an objectively valid block at the time appointed by the
// block scheduling algorithm\npre-confirming a block produced by another producer in the schedule when I find
// said block objectively valid\nconfirming a block for which {{producer}} has received 2/3+ pre-confirmation
// messages from other producers\n\nI hereby accept liability for any and all provable damages that result from my:
// signing two different block proposals with the same timestamp with {{producer_key}}
// signing two different block proposals with the same block number with {{producer_key}}
// signing any block proposal which builds off of an objectively invalid block
// signing a pre-confirmation for an objectively invalid block
// signing a confirmation for a block for which I do not possess pre-confirmation messages from 2/3+ other producers
// I hereby agree that double-signing for a timestamp or block number in concert with 2 or more other producers shall
// automatically be deemed malicious and subject to a fine equal to the past year of compensation received and imediate
// disqualification from being a producer, and other damages. An exception may be made if {{producer}} can demonstrate
// that the double-signing occured due to a bug in the reference software; the burden of proof is on {{producer}}.
// I hereby agree not to interfere with the producer election process. I agree to process all producer election transactions that occur in blocks I create,
// to sign all objectively valid blocks I create that contain election transactions, and to sign all pre-confirmations and confirmations necessary
// to facilitate transfer of control to the next set of producers as determined by the system contract.\n\nI hereby acknowledge that 2/3+ other elected producers may vote to disqualify {{producer}}
// in the event {{producer}} is unable to produce blocks or is unable to be reached, according to criteria agreed to among producers.
// If {{producer}} qualifies for and chooses to collect compensation due to votes received, 
// {{producer}} will provide a public endpoint allowing at least 100 peers to maintain synchronization with the blockchain and/or submit transactions to be included. 
// {{producer}} shall maintain at least 1 validating node with full state and signature checking and shall report any objectively invalid blocks produced by the active block producers. 
// Reporting shall be via a method to be agreed to among producers, said method and reports to be made public.\n\nThe community agrees to allow {{producer}} to authenticate peers as necessary
// to prevent abuse and denial of service attacks; however, {{producer}} agrees not to discriminate against non-abusive peers.\n\nI agree to process transactions on a FIFO best-effort basis and to honestly bill transactions for measured execution time.
// I {{producer}} agree not to manipulate the contents of blocks in order to derive profit from:\nthe order in which transactions are included\nthe hash of the block that is produced
// I, {{producer}}, hereby agree to disclose and attest under penalty of perjury all ultimate beneficial owners of my company who own more than 10% and all direct shareholders.\n\nI, {{producer}}, 
// hereby agree to cooperate with other block producers to carry out our respective and mutual obligations under this agreement, 
// including but not limited to maintaining network stability and a valid blockchain.\n\nI, {{producer}}, agree to maintain a website hosted at {{url}} which contains up-to-date information on all disclosures required by this contract.
// I, {{producer}}, agree to set {{location}} such that {{producer}} is scheduled with minimal latency between my previous and next peer.\n\nI, {{producer}}, agree to maintain time synchronization within 10 ms of global atomic clock time,
// using a method agreed to among producers.\n\nI, {{producer}}, agree not to produce blocks before my scheduled time unless I have received all blocks produced by the prior producer.
// I, {{producer}}, agree not to publish blocks with timestamps more than 500ms in the future unless the prior block is more than 75% full by either CPU or network bandwidth metrics.
// I, {{producer}}, agree not to set the RAM supply to more RAM than my nodes contain and to resign if I am unable to provide the RAM approved by 2/3+ producers, as shown in the system parameters.
export interface IRegProducer {
    account: "eosio";
    name: "regproducer";
    data: {
        producer: account_name;
        procducer_key: public_key;
        url: string;
        location: number;
    }
}

export interface ISetRam {
    account: "eosio";
    name: "setram";
    data: {
        max_ram_size: number;
    }
}

/**
 * Sets the number of new bytes of ram to create per block
 * and resyncs bancor base connector balance
 */
export interface ISetRAMRate {
    account: "eosio";
    name: "setramrate";
    data: {
        bytes_per_block: number;
    }
}
// The `{{ bidname }}` action places a bid on a premium account name, 
// in the knowledge that the high bid will purchase the name.
// As an authorized party I {{ signer }} wish to bid on behalf of {{ bidder }}
// the amount of {{ bid }} toward purchase of the account name {{ newname }}
export interface IBidName {
    account: "eosio";
    name: "bidname";
    data: {
        bidder: account_name;
        newname: account_name;
        bid: asset;
    }
}

export interface IBidRefund {
    account: "eosio";
    name: "bidrefund";
    data: {
        bidder: account_name;
        newname: account_name;
    }
}

// nThe `{{ unregprod }}` action unregisters a previously registered block producer candidate.
// As an authorized party I {{ signer }} wish to unregister the block producer candidate {{ producer }}, 
// rendering that candidate no longer able to receive votes
export interface IUnregprod {
    account: "eosio";
    name: "unregprod";
    data: {
        producer: account_name;
    }
}

export interface IRegProxy {
    account: "eosio";
    name: "regproxy";
    data: {
        proxy: account_name;
        isproxy: boolean;
    }
}
// The intent of the `{{ voteproducer }}` action is to cast a valid vote for up to 30 BP candidates. 
// As an authorized party I {{ signer }} wish to vote on behalf of {{ voter }} in favor of the block
// producer candidates {{ producers }} with a voting weight equal to all tokens currently owned by{{ voter }} and staked for CPU or bandwidth.
// If I am not the beneficial owner of these shares I stipulate I have proof that Iu2019ve been authorized to vote these shares by their beneficial owner(s). 
// I stipulate I have not and will not accept anything of value in exchange for these votes, on penalty of confiscation of these tokens, and other penalties. 
// I acknowledge that using any system of automatic voting, re-voting, or vote refreshing, or allowing such a system to be used on my behalf or on behalf of another, 
// is forbidden and doing so violates this contract.
export interface IVoteProducer {
    account: "eosio";
    name: "voteproducer";
    data: {
        voter: account_name;
        proxy: account_name;
        producer: account_name[];
    }
}

// The `{{ claimrewards }}` action allows a block producer (active or standby) to claim the system 
// rewards due them for producing blocks and receiving votes.\n\nAs an authorized party I {{ signer }}
// wish to have the rewards earned by {{ owner }} deposited into the {{ owner }} account.
export interface IClaimRewards {
    account: "eosio";
    name: "claimrewards";
    data: {
        owner: account_name;
    }
}

export interface ISetPriv {
    account: "eosio";
    name: "setpriv";
    data: {
        account: account_name;
        is_priv: number;
    }
}

export interface IRmVProducer {
    account: "eosio";
    name: "rmvproducer";
    data: {
        producer: account_name;
    }
}

export interface ISetAccountLimits {
    account: "eosio";
    name: "setalimits";
    data: {
        account: account_name;
        ram_bytes: number;
        net_weight: number;
        cpu_weight: number;
    }
}

export interface ISetGlobalLimits {
    account: "eosio";
    name: "setglimits";
    data: {
        cpu_usec_per_period: number;
    }
}

// The `{{ setprods }}` action creates a new schedule of active producers, who will produce blocks in the order given.
// THIS IS A SYSTEM COMMAND NOT AVAILABLE FOR DIRECT ACCESS BY USERS.
// As an authorized party I {{ signer }} wish to set the rotation of producers to be {{ schedule }}.
export interface ISetProducers {
    account: "eosio";
    name: "setprods";
    data: {
        schedule: Array<{ producer_name: account_name; block_signing_key: public_key }>
    }
}

export interface IRequireAuth {
    account: "eosio";
    name: "reqauth";
    data: {
        params: {
            max_block_net_usage: number;
            target_block_net_usage_pct: number;
            max_transaction_net_usage: number;
            base_per_transaction_net_usage: number;
            net_usage_leeway: number;
            context_free_discount_net_usage_num: number;
            context_free_discount_net_usage_den: number;
            max_block_cpu_usage: number;
            target_block_cpu_usage_pct: number;
            max_transaction_cpu_usage: number;
            min_transaction_cpu_usage: number;
            max_transaction_lifetime: number;
            deferred_trx_expiration_window: number;
            max_transaction_delay: number;
            max_inline_action_size: number;
            max_inline_action_depth: number;
            max_authority_depth: number;
        }
    }
}

export interface ISetParams {
    account: "eosio";
    name: "setparams";
    data: {
        params: {
            max_block_net_usage: number;
            target_block_net_usage_pct: number;
            max_transaction_net_usage: number;
            base_per_transaction_net_usage: number;
            net_usage_leeway: number;
            context_free_discount_net_usage_num: number;
            context_free_discount_net_usage_den: number;
            max_block_cpu_usage: number;
            target_block_cpu_usage_pct: number;
            max_transaction_cpu_usage: number;
            min_transaction_cpu_usage: number;
            max_transaction_lifetime: number;
            deferred_trx_expiration_window: number;
            max_transaction_delay: number;
            max_inline_action_size: number;
            max_inline_action_depth: number;
            max_authority_depth: number;
        }
    }
}
