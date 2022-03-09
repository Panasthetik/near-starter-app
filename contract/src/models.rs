  
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
#[allow(unused_imports)]
use near_sdk::{env, near_bindgen};
use near_sdk::serde::{Deserialize, Serialize};


use crate::utils::{
    AccountId,
    Timestamp
};

#[derive(Clone, Serialize, Deserialize, BorshDeserialize, BorshSerialize)]
#[serde(crate = "near_sdk::serde")]

pub struct Event {
    id: i32,
  pub creator: AccountId,
    created_at: Timestamp,
    title: String,
    estimated_budget: u128,
   pub total_votes: i64,
    description: String,
   pub votes: Vec<String>
}


impl Event {
    pub fn new(id:i32, title: String, estimated_budget:u128, description: String) -> Self {
        
        Event {
            id,
            creator: env::signer_account_id().to_string(),
            created_at: env::block_timestamp(),
            title,
            estimated_budget,
            total_votes : 0,
            description,
            votes: vec![],
        }
    }
}

