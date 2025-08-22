from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

import main
from database import Base, get_db

# Setup a shared in-memory DB per test module
engine = create_engine(
    "sqlite://",
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)


def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


main.app.dependency_overrides[get_db] = override_get_db
client = TestClient(main.app)


def test_register_login_and_profile_flow():
    # Register
    reg = client.post(
        "/auth/register",
        json={
            "email": "somchai@example.com",
            "password": "secret123",
            "first_name": "สมชาย",
            "last_name": "ใจดี",
            "phone": "081-234-5678",
        },
    )
    assert reg.status_code == 200, reg.text

    # Login
    token_res = client.post(
        "/auth/login",
        data={"username": "somchai@example.com", "password": "secret123"},
        headers={"Content-Type": "application/x-www-form-urlencoded"},
    )
    assert token_res.status_code == 200, token_res.text
    token = token_res.json()["access_token"]
    auth = {"Authorization": f"Bearer {token}"}

    # Get profile
    me = client.get("/me", headers=auth)
    assert me.status_code == 200
    body = me.json()
    assert body["email"] == "somchai@example.com"

    # Update profile
    upd = client.put(
        "/me",
        headers=auth,
        json={"first_name": "สมชาย", "last_name": "ใจดี", "membership_level": "Gold", "points_balance": 15420},
    )
    assert upd.status_code == 200, upd.text
    assert upd.json()["points_balance"] == 15420
