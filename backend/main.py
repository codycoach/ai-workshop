from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine
from models import User
from routes import router

app = FastAPI()

# Create tables
Base.metadata.create_all(bind=engine)

# CORS for local React app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.get("/")
async def root():
    return {"status": "ok"}
# {
#   "email": "user@example.com",
#   "first_name": "string",
#   "last_name": "string",
#   "phone": "string",
#   "membership_level": "string",
#   "member_code": "string",
#   "membership_joined_on": "string",
#   "points_balance": 0,
#   "password": "string"
# }