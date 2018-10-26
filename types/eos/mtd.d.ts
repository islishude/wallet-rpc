/** spell-checker: disable */
export declare const EOSMethods: {
    DBSize: {
        get: string;
    };
    chain: {
        abi: string;
        account: string;
        atob: string;
        balance: string;
        block: string;
        blockHeaderState: string;
        btoa: string;
        code: string;
        info: string;
        rawCodeAndABI: string;
        sendTx: string;
        sendTxList: string;
        stats: string;
        tableRows: string;
    };
    history: {
        actions: string;
        ctrlAccounts: string;
        keyAccounts: string;
        tx: string;
    };
    net: {
        connect: string;
        connections: string;
        disconnect: string;
        status: string;
    };
};
export declare const EOSModules: {
    DBSize: string;
    chain: string;
    history: string;
    net: string;
};
export declare type account_name = string;
export declare type asset = "1.001 EOS";
export interface IEosAuthority {
    threshold: number;
    keys: Array<{
        key: string;
        weight: number;
    }>;
    account: Array<{
        permission: {
            actor: account_name;
            permission_name: string;
        };
        weight: number;
    }>;
    waits: Array<{
        wait_sec: number;
        weight: number;
    }>;
}
export interface IEosTrx {
    status: "executed" | "soft_fail" | "hard_fail" | "delayed" | "expired";
    cpu_usage_us: number;
    net_usage_words: number;
    trx: string | {
        id: string;
        signatures: string[];
        compression: "none" | "zlib";
        packed_context_free_data: string;
        context_free_data: string[];
        packed_trx: string;
        transaction: {
            expiration: string;
            ref_block_num: number;
            ref_block_prefix: number;
            max_net_usage_ms: number;
            max_cpu_usage_ms: number;
            delay_sec: number;
            context_free_actions: any[];
            authorization: Array<{
                actor: string;
                permission: string;
            }>;
            actions: Array<{
                account: account_name;
                name: string;
                authorization: IEosAuthority[];
                data: any;
                hex_data: string;
            }>;
            transaction_extensions: any[];
        };
    };
}
export interface IEosChainInfo {
    server_version: string;
    chain_id: string;
    head_block_num: number;
    last_irreversible_block_num: number;
    last_irreversible_block_id: string;
    head_block_id: string;
    head_block_time: string;
    head_block_producer: string;
    virtual_block_cpu_limit: number;
    virtual_block_net_limit: number;
    block_cpu_limit: number;
    block_net_limit: number;
    server_version_string: string;
}
export interface IEosBlockInfo {
    timestamp: string;
    producer: string;
    confirmed: number;
    previous: string;
    transaction_mroot: string;
    action_mroot: string;
    schedule_version: number;
    new_producers: any;
    header_extensions: any[];
    producer_signature: string;
    transactions: IEosTrx[];
    block_extensions: any[];
    id: string;
    block_num: number;
    ref_block_prefix: number;
}
export interface IEosAccount {
    account_name: string;
    head_block_number: number;
    head_block_time: string;
    privileged: boolean;
    last_code_update: string;
    created_at: string;
    ram_quota: number;
    ram_usage: number;
    net_weight: number;
    cpu_weight: number;
    net_limit: {
        used: number;
        available: number;
        max: number;
    };
    cpu_limit: {
        used: number;
        available: number;
        max: number;
    };
    permissions: Array<{
        perm_name: string;
        parent: account_name;
        required_auth: {
            threshold: number;
            key: Array<{
                key: string;
                weight: number;
            }>;
        };
        accounts: Array<{
            permission: {
                actor: account_name;
                permission_name: string;
            };
            weight: number;
        }>;
        waits: Array<{
            wait_sec: number;
            weight: number;
        }>;
    }>;
    total_resources: {
        owner: account_name;
        net_weight: asset;
        cpu_weight: asset;
        ram_bytes: number;
    };
    self_delegated_bandwidth: {
        from: account_name;
        to: account_name;
        net_weight: asset;
        cpu_weight: asset;
    };
    refund_request: null | {
        owner: account_name;
        request_time: string;
        net_amount: asset;
        cpu_amount: asset;
    };
    voter_info: {
        owner: account_name;
        proxy: account_name;
        producers: account_name[];
        staked: number;
        last_vote_weight: string;
        proxied_vote_weight: string;
        is_proxy: boolean;
    };
}
export interface IEosAbi {
    version: string;
    types: Array<{
        new_type_name: string;
        type: string;
    }>;
    structs: Array<{
        name: string;
        base: string;
        fields: Array<{
            name: string;
            type: string;
        }>;
    }>;
    actions: Array<{
        name: string;
        type: string;
        ricardian_contract: string;
    }>;
    tables: Array<{
        name: string;
        type: string;
        index_type: string;
        key_names: string[];
        key_types: string[];
    }>;
    ricardian_clauses: Array<{
        id: string;
        body: string;
    }>;
    error_messages: Array<{
        error_code: string;
        error_msg: string;
    }>;
    abi_extensions: Array<{
        tag: number;
        value: string;
    }>;
    variants?: Array<{
        name: string;
        types: string[];
    }>;
}
