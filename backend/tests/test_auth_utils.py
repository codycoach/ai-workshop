from auth import get_password_hash, verify_password, create_access_token
from jose import jwt


def test_password_hash_and_verify():
    pwd = "secret123"
    hashed = get_password_hash(pwd)
    assert hashed != pwd
    assert verify_password(pwd, hashed) is True
    assert verify_password("wrong", hashed) is False


def test_create_access_token_decodable():
    token = create_access_token({"sub": "1"})
    decoded = jwt.get_unverified_claims(token)
    assert decoded.get("sub") == "1"

