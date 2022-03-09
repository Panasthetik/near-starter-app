mod models;
mod utils;

use std::convert::TryInto;

use crate::{
    utils::{
        AccountId,
    },
    models::{
        Event
    }
};

use near_sdk::{borsh::{self, BorshDeserialize, BorshSerialize}};
#[allow(unused_imports)]
use near_sdk::{env, PromiseIndex, near_bindgen};
near_sdk::setup_alloc!();


#[near_bindgen]
#[derive(Clone, Default, BorshDeserialize, BorshSerialize)]

pub struct Contract {
    owner: AccountId,
    events: Vec<Event>,
}

#[near_bindgen]
impl Contract{
    #[init]
    pub fn new(
        owner: AccountId,
    ) -> Self{
        let events: Vec<Event> = Vec::new();

        Contract{
            owner,
            events
        }
    }

    pub fn add_event(&mut self, title: String, estimated_budget: u128, description: String) {
        
        let id = self.events.len() as i32;
        
        self.events.push(Event::new(
            id,
            title,
            estimated_budget,
            description
        ));

        env::log("Added a new event!".as_bytes());
    }

    pub fn list_events(&self) -> Vec<Event> {
        let events = &self.events;

       return events.to_vec();
    }

    pub fn event_count(&mut self) -> usize {
        return self.events.len();
    }

    pub fn add_vote(&mut self, id:usize){
        let event: &mut Event = self.events.get_mut(id).unwrap();
        let voter = env::predecessor_account_id();

        event.total_votes = event.total_votes + 1;
        env::log("Vote submitted successfully for this event!".as_bytes());
        event.votes.push(voter.to_string());
        
    }

    pub fn get_total_votes(&mut self, id:usize) -> u64 {
        let event: &mut Event = self.events.get_mut(id).unwrap();
        return event.total_votes.try_into().unwrap();

    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use near_sdk::test_utils::VMContextBuilder;
    use near_sdk::{testing_env, AccountId};

    fn get_context(predecessor: AccountId) -> VMContextBuilder {
        let mut builder = VMContextBuilder::new();
        builder.predecessor_account_id(predecessor);
        builder
    }

    #[test]
    fn add_project() {

        let alice = AccountId::new_unchecked("alice.testnet".to_string());
        // Set up the testing context and unit test environment
        let context = get_context(alice.clone());

        testing_env!(context.build());

        let mut contract = Contract::new(alice.to_string());

        contract.add_event("New Contemporary Art Show".to_string(), 200, "Amazing selection of 
            international artists from all over the world".to_string());

        let result = contract.event_count();

        assert_eq!(result, 1);
    }

    #[test]
    fn add_voter() {

        let alice = AccountId::new_unchecked("alice.testnet".to_string());
        // Set up the testing context and unit test environment
        let context = get_context(alice.clone());

        testing_env!(context.build());

        let mut contract = Contract::new(alice.to_string());

        contract.add_event("New Contemporary Art Show".to_string(), 200, "Amazing selection of 
        international artists from all over the world".to_string());

        contract.add_vote(0);

        let result = contract.get_total_votes(0);

        assert_eq!(result, 1);

    }
}