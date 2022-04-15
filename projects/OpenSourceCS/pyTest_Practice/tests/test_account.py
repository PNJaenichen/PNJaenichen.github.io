import pytest

from bank.bank import Bank
from bank.bank import AccountException

def test_open_account(account):
  assert account.name == "Richard"

def test_make_deposit(account):
  account.make_deposit(100)
  assert account.balance == 100
  
def test_make_withdrawal(account):
  account.balance = 100
  account.make_withdrawal(20)
  assert account.balance == 80

def test_make_bad_withdrawal(account):
  account.balance = 10
  with pytest.raises(AccountException):
    account.make_withdrawal(20)
  assert account.balance == 10
  
def test_overdraft_limit(account):
  account.overdraft_limit = 10
  assert account.available_funds == 10

@pytest.mark.parametrize(
  "limit, withdrawal, balance, funds",
  [(10, 10, -10, 0), (10, 5, -5, 5), (20, 5, -5, 15)]
)

def test_withdrawal(account, limit, withdrawal, balance, funds):
  account.overdraft_limit = limit
  account.make_withdrawal(withdrawal)
  assert account.balance == balance
  assert account.available_funds == funds

def test_set_balance(account):
  with pytest.raises(AccountException):
    account.balance = -10
    
def test_deposit_below_limit(account):
  account._balance = -10
  account.make_deposit(5)
  assert account.balance == -5


