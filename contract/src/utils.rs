  
use near_sdk::{
    env,
    PromiseResult,
};

pub type AccountId = String;

pub type Timestamp = u64;


pub fn assert_self() {
    let caller = env::predecessor_account_id();
    let current = env::current_account_id();

    assert_eq!(caller, current, "Only this contract may call itself");
}

pub fn assert_single_promise_success(){
    assert_eq!(
        env::promise_results_count(),
        1,
        "Expected exactly one promise result",
    );

    match env::promise_result(0) {
        PromiseResult::Successful(_) => return,
        _ => panic!("Expected PromiseStatus to be successful"),
    };
}